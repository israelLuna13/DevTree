import { Request,Response ,NextFunction} from "express"
import { validationResult } from "express-validator"

//validate data from form
export const handleInputErrors=(req:Request,res:Response,next:NextFunction)=>{
     //manage result
     let errors = validationResult(req)
     if(!errors.isEmpty())
     {
         //error        
         res.status(400).json({errors:errors.array()})
         return
     }
     //next function
     next()
    
}