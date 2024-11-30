import {Router} from 'express'

const router = Router()

//auth , register

router.get('/auth/register',(req,res)=>{
    console.log(req.body);
    

})

export default router