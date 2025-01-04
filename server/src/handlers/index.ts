import User from "../models/User"
import { Request,Response } from "express"
import { checkPassword, hashPassword } from "../utils/auth"
// import slug from "slug";
import slugify from "slugify"
import formidable from 'formidable'
import { v4 as uuid } from "uuid"
import cloudinary from "../config/cloudinary"
import { generateJWT } from "../utils/jwt"

export const createAccount =async (req:Request,res:Response)=>{

    const {email,password} = req.body
    const userExist = await User.findOne({email})
    if(userExist != null)
    {
        const error = new Error('User with email is registered')
         res.status(409).json({error:error.message})
         return
    }
    //cast the user name to lowecase and join all words
    const handle = slugify(req.body.handle,
        {
        replacement:'',
        lower:true})

    const handleExist = await User.findOne({handle})
        if(handleExist != null)
        {
            const error = new Error('User name doesnt enable')
             res.status(409).json({error:error.message})
             return
        }

    const user = new User(req.body);
    user.password =await hashPassword(password);
    user.handle=handle
    user.save();
    res.send('Registro creado correctamente')
}

export const login = async(req:Request,res:Response)=>{

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
    const isPasswordCorrect=await checkPassword(password,userExist.password)
    if(!isPasswordCorrect){
        const error = new Error('Password incorrect')
        res.status(401).json({error:error.message})
        return
    }

    const token = generateJWT({id:userExist.id})
    res.send(token)
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
