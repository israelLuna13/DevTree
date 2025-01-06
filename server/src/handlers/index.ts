import User from "../models/User"
import { Request,Response } from "express"
import { checkPassword, hashPassword } from "../utils/auth"
// import slug from "slug";
import slugify from "slugify"
import formidable from 'formidable'
import { v4 as uuid } from "uuid"
import cloudinary from "../config/cloudinary"
import { generateJWT } from "../utils/jwt"
import Token from "../models/Token"
import { generateToken } from "../utils/token"
import { AuthEMail } from "../email/AuthEmail"

export const createAccount =async (req:Request,res:Response)=>{

    try {
      const { email, password } = req.body;
      const userExist = await User.findOne({ email });
      if (userExist != null) {
        const error = new Error("User with email is registered");
        res.status(409).json({ error: error.message });
        return;
      }
      //cast the user name to lowecase and join all words
      const handle = slugify(req.body.handle, {
        replacement: "",
        lower: true,
      });

      const handleExist = await User.findOne({ handle });
      if (handleExist != null) {
        const error = new Error("User name doesnt enable");
        res.status(409).json({ error: error.message });
        return;
      }

      const user = new User(req.body);
      user.password = await hashPassword(password);
      user.handle = handle;

      //token
      const token = new Token();
      token.token = generateToken();
      token.user = user.id;

      //send email
      AuthEMail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      });

      await Promise.allSettled([user.save(), token.save()]);
      // user.save();
      res.send("Account creeated, Check you email for cofirm your account");
    } catch (e) {
      console.log(e);
      const error = new Error("There is issuse");
      res.status(500).json({ error: error.message });
      return;
    }
}
export const confirmAccount =async (req:Request,res:Response)=>{
  try {
    const {token} = req.body
    const tokenExist = await Token.findOne({token})
    if(!tokenExist)
    {
      const error = new Error('Token is invalidate')
      res.status(404).json({error:error.message})
      return
    }

    const user = await User.findOne(tokenExist.user)

    if(!user)
    {
      const error = new Error('User is not registered')
      res.status(404).json({error:error.message})
      return
    }

    user.confirmed = true
    await Promise.allSettled([user.save(), tokenExist.deleteOne()])
    res.send('Account confirmed successfull')

  } catch (e) {
    console.log(e);
    const error = new Error("There is issuse");
    res.status(500).json({ error: error.message });
    return;
  }
}

export const login = async(req:Request,res:Response)=>{

  try {
      //search user
      const {email,password}=req.body
      //check user exist
      const userExist = await User.findOne({email})
      if(!userExist)
      {
          const error = new Error('User doesnt exist ')
           res.status(404).json({error:error.message})
           return
      }

      //check if the user is confirmed
      if (!userExist.confirmed) {
        const token = new Token();
        token.user = userExist.id;
        token.token = generateToken();
        await token.save();
        //Sent email
        AuthEMail.sendConfirmationEmail({
          email: userExist.email,
          name: userExist.name,
          token: token.token,
        });

        const error = new Error(
          "The account is not confirmed, We have sent email the confirm"
        );
         res.status(401).json({ error: error.message });
         return
      }
      const isPasswordCorrect=await checkPassword(password,userExist.password)
      if(!isPasswordCorrect){
          const error = new Error('Password incorrect')
          res.status(401).json({error:error.message})
          return
      }
      const token = generateJWT({id:userExist.id})
      res.send(token)
    
  } catch (e) {
    console.log(e);
        const error = new Error('There is issuse')
             res.status(500).json({error:error.message})
             return
  }
}

//generate other token to confirm account
export const requestConfirmationCode= async (req:Request,res:Response)=>{
  try {
   const {email}=req.body

   //User exist
   const user = await User.findOne({email})
   if(!user){
       const error = new Error('The user is not register')
        res.status(404).json({error:error.message})
        return
   }

   if(user.confirmed){
      const error = new Error('The user is already confirmed')
       res.status(403).json({error:error.message})
       return
   }

   //create token
   const token = new Token()
   token.token = generateToken()
   token.user  = user.id 

   //Sent email
   AuthEMail.sendConfirmationEmail({
       email:user.email,
       name:user.name,
       token:token.token
   })
   await Promise.allSettled([user.save(),token.save()])
   res.send('Check your email , We have sent the new token')
  } catch (e) {
    console.log(e);
    const error = new Error("There is issuse");
    res.status(500).json({ error: error.message });
    return;
  }

}

export const forgotPassword= async (req:Request,res:Response)=>{

 try {
  const {email} = req.body
  const user = await User.findOne({email})

  if(!user)
  {
    const error = new Error('The user is not registered')
    res.status(404).json({error:error.message})
    return
  }

  const token = new Token()
  token.token = generateToken()
  token.user = user.id

  await token.save()

  //Send email
  AuthEMail.sentPasswordResetToken({
    email:user.email,
    name:user.name,
    token:token.token
})
res.send('Check your email and follow the instructions')
  
 } catch (e) {
  console.log(e);
  const error = new Error("There is issuse");
  res.status(500).json({ error: error.message });
  return;
 }
 
}

export const validateToken= async (req:Request,res:Response)=>{
  try {
      const {token} = req.body
      const tokenExist = await Token.findOne({token})

      if(!tokenExist){
          const error = new Error('Token not valide')
           res.status(404).json({error:error.message})
           return
      }

      res.send('Token validate, Enter new password')

  } catch (e) {
    console.log(e);
    const error = new Error("There is issuse");
    res.status(500).json({ error: error.message });
    return;
  }

}
export const updatePasswordWithToken= async (req:Request,res:Response)=>{
  try {
    const {token} = req.params
    const {password} = req.body
    const tokenExist = await Token.findOne({token})

    if(!tokenExist){
        const error = new Error('Token not valide')
         res.status(404).json({error:error.message})
         return
    }

    const user = await User.findById(tokenExist.user)
    if(!user)
    {
      const error = new Error('The user is not registered')
      res.status(404).json({error:error.message})
      return
    }
    user.password = await hashPassword(password)

    await Promise.allSettled([user.save(), tokenExist.deleteOne()])

    res.send('The password was changed successfull')
    
  } catch (e) {
    console.log(e);
    const error = new Error("There is issuse");
    res.status(500).json({ error: error.message });
    return;
  }
}

export const CheckPassword= async (req:Request,res:Response)=>{
  const {password} = req.body
  const user = await User.findById(req.user.id)
  const isPasswordCorrect = await checkPassword(password,user.password)
  if(!isPasswordCorrect){
      const error = new Error('Password is incorrect')
    return  res.status(401).json({error:error.message})
  }
  res.send('Correct password')
}  

export const getUser= async(req:Request,res:Response)=>{
    res.json(req.user);
}

export const updateProfile= async(req:Request,res:Response)=>{
    try {
       const {description,links} = req.body
        //cast the user name to lowecase and join all words
        const handle = slugify(req.body.handle,
            {
            replacement:'',
            lower:true})

        const handleExist = await User.findOne({handle})
        //if the user wanna change her user name for other that be in the registered
        //if the email of user in session is diferent email user in the database
        if(handleExist && handleExist.email !== req.user.email)
            {
                const error = new Error('User name doesnt enable')
                res.status(409).json({error:error.message})
                return
            }

        //update user
        req.user.description = description
        req.user.handle = handle
        req.user.links = links
        await req.user.save()
        res.send('Profile updated')
        
    } catch (e) {
        console.log(e);
        const error = new Error('There is issuse')
             res.status(500).json({error:error.message})
             return
    }
}

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const form = formidable({ multiples: false });

    form.parse(req, (error, fields, files) => {
      cloudinary.uploader.upload(
        files.file[0].filepath,
        { public_id: uuid() },
        async function (error, result) {
          if (error) {
            const error = new Error("There is issuse upload image");
            res.status(500).json({ error: error.message });
            return;
          }
          if (result) {
            req.user.image = result.secure_url;
            await req.user.save();
            res.json({ image: result.secure_url });
          }
        }
      );
    });
  } catch (e) {
    const error = new Error("There is issuse");
    res.status(500).json({ error: error.message });
    return;
  }
};
export const getUserByHandle= async(req:Request,res:Response) =>{
    try {
        const {handle} = req.params
        const user = await User.findOne({handle}).select('-_id -__v -email -password')
        if(!user)
        {
            const error = new Error('The user does not exist')
            res.status(404).json({error:error.message})
            return
        }
        res.json(user);
        
    } catch (e) {
        console.log(e);
        const error = new Error('There is issuse')
             res.status(500).json({error:error.message})
             return
    }
}

export const searchByHandle= async(req:Request,res:Response) =>{
  try {
    const {handle} = req.body
    

    const userExist = await User.findOne({handle})
    if(userExist)
    {
      const error = new Error(`${handle} is registered`)
      res.status(409).json({error:error.message})
      return
    }

    res.send(`${handle} is available`)
    
    
  } catch (e) {
    console.log(e);
    const error = new Error('There is issuse')
         res.status(500).json({error:error.message})
         return
  }
}
//change password when the session is active
export const changePassword= async(req:Request,res:Response) =>{
  try {
    const {password,password_new} = req.body
    //take email of user on session
    const {email} = req.user

    //search user 
    const userExist = await User.findOne({email})
    if(!userExist)
    {
      const error = new Error('The user does not exist')
      res.status(404).json({error:error.message})
      return
    }
    
    //check if the password is correct 
    const passwordCorrect =await checkPassword(password,userExist.password) 
    if(!passwordCorrect)
    {
      const error = new Error('Password incorrect')
      res.status(401).json({error:error.message})
      return
    }
    //update password
    userExist.password = await hashPassword(password_new)
    userExist.save()
    res.send('Password updated successfully')
    
  } catch (e) {
    console.log(e);
    const error = new Error('There is issuse')
         res.status(500).json({error:error.message})
         return
  }
}
