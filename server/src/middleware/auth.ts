import { Request,Response ,NextFunction} from "express"
import jwt from 'jsonwebtoken'
import User,{IUser} from "../models/User"

//we put new attribute in request, user content data of user on session
declare global
{
    namespace Express {
        interface Request{
            user?:IUser//data optional
        }
    }

}

export const  authenticate = async(req:Request,res:Response,next:NextFunction)=>{
    const bearerToken = req.headers.authorization
    if(!bearerToken)
    {
        const error = new Error('Unauthorized')
        res.status(401).json({error:error.message})
       return   
    }
    //we ignorate the firt argument
    // first argument : Bearer
    // seccond argument : token 
    //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjA4N2NiZDUzZTFkZGQ2OGZiMjdkMiIsImlhdCI6MTczNDgzMzcwMSwiZXhwIjoxNzUwMzg1NzAxfQ.8VMV1Sp-fJiVB7hoYG5wcwltRcmcWkjN3JXbbHzcRWo
    const [, token] = bearerToken.split(' ')
    
    if(!token)
        {
            const error = new Error('Unauthorized')
            res.status(401).json({error:error.message})
           return   
        }
    try {
        const result = jwt.verify(token,process.env.JWT_SECRET );
        if(typeof result === 'object' && result.id)
        {
            //take data user without password
           const user = await User.findById(result.id).select('-password')
           if(!user)
           {
            const error = new Error('User does not exist')
            res.status(401).json({error:error.message})
           }
           //res.json(user)
           //we going access user data on the route where contains this middleware
           req.user = user
           next()
        }
       
        
    } catch (error) {
        console.log(error); 
        res.status(500).json({error:'Invalidate token'})
    }
}