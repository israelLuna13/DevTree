import {Router} from 'express'
import { body } from 'express-validator'
import { createAccount } from './handlers'

const router = Router()

//auth , register
router.post('/auth/register',
    body('handle').notEmpty().withMessage("The user is required"),
    body('name').notEmpty().withMessage("The user is required") ,
    body('email').notEmpty().isEmail().withMessage("The user is required").withMessage('The email is not correct'),
    body('password').notEmpty().isLength({min:6,max:10}).withMessage("The user is required").withMessage('The password must be 6 characters min and 8 charactrs max'),
    createAccount )


export default router