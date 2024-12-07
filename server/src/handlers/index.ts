import User from "../models/User"
import { Request,Response } from "express"
import { hashPassword } from "../utils/auth"
// import slug from "slug";
import slugify from "slugify"
import { validationResult } from "express-validator"

export const createAccount =async (req:Request,res:Response)=>{

    //manage result
    let errors = validationResult(req)
    if(!errors.isEmpty())
    {
        //error        
        res.status(400).json({errors:errors.array()})
        return
    }

    const {email,password} = req.body

    const userExist = await User.findOne({email})
    if(userExist != null)
    {
        const error = new Error('User with email is registered')
         res.status(409).json({error:error.message})
         return
    }
    const handle = slugify(req.body.handle,{
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