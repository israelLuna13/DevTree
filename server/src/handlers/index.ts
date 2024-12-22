import User from "../models/User"
import { Request,Response } from "express"
import { checkPassword, hashPassword } from "../utils/auth"
// import slug from "slug";
import slugify from "slugify"
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
       const {description} = req.body
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
        await req.user.save()
        res.send('Profile updated')

        
    } catch (e) {
        console.log(e);
        const error = new Error('There is issuse')
             res.status(409).json({error:error.message})
             return
    }
}
