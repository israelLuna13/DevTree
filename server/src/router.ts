import {Router} from 'express'
import { body } from 'express-validator'
import { createAccount, login,getUser,updateProfile, uploadImage, getUserByHandle, searchByHandle } from './handlers'
import { handleInputErrors } from './middleware/validation'
import { authenticate } from './middleware/auth'

const router = Router()
/**-----------------------AUTH----------------------------------- */
router.post('/auth/register',
    body('handle').notEmpty().withMessage("The user is required"),
    body('name').notEmpty().withMessage("The user is required") ,
    body('email').notEmpty().isEmail().withMessage("The user is required").withMessage('The email is not correct'),
    body('password').notEmpty().isLength({min:6,max:10}).withMessage("The user is required").withMessage('The password must be 6 characters min and 8 charactrs max'),
    handleInputErrors, createAccount )

router.post('/auth/login',
    body('email').notEmpty().isEmail().withMessage("The user is required").withMessage('The email is not correct'),
    body('password').notEmpty().withMessage('The password is required'),
    handleInputErrors,login)
/**---------------------------------------------------------- */

router.get('/auth/user',authenticate,getUser)

router.patch('/auth/user', 
    body('handle').notEmpty().withMessage("The user is required")
    ,handleInputErrors,authenticate,updateProfile)

router.post('/user/image',authenticate,uploadImage)

router.get('/:handle',getUserByHandle)

router.post('/search', 
        body('handle').notEmpty().withMessage("The handle is required"),
        handleInputErrors,
        searchByHandle)
export default router