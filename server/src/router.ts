import {Router} from 'express'
import { body, param } from 'express-validator'
import { createAccount, login,getUser,updateProfile, uploadImage, getUserByHandle, searchByHandle, changePassword, confirmAccount, requestConfirmationCode, forgotPassword, validateToken, updatePasswordWithToken } from './handlers'
import { handleInputErrors } from './middleware/validation'
import { authenticate } from './middleware/auth'

const router = Router()

router.post('/register',
    body('handle').notEmpty().withMessage("The user is required"),
    body('name').notEmpty().withMessage("The user is required") ,
    body('email').notEmpty().isEmail().withMessage("The user is required").withMessage('The email is not correct'),
    body('password').notEmpty().isLength({min:6,max:10}).withMessage("The user is required").withMessage('The password must be 6 characters min and 8 charactrs max'),
    handleInputErrors, createAccount )


router.post('/login',
    body('email').notEmpty().isEmail().withMessage("The user is required").withMessage('The email is not correct'),
    body('password').notEmpty().withMessage('The password is required'),
    handleInputErrors,login)


router.post('/confirm-account',
        body('token').notEmpty().withMessage('The Token can not to be empty'),
        handleInputErrors,
        confirmAccount
    )
//request new token
router.post('/request-code',
    body('email').isEmail().withMessage('Email not valide'),
    handleInputErrors,
    requestConfirmationCode)

 //generate new token
router.post('/forgot-password',
    body('email').isEmail().withMessage('Email not valide'),
    handleInputErrors,
    forgotPassword
)

router.post('/validate-token',
    body('token').notEmpty().withMessage('The Token cant to be empty'),
    handleInputErrors,
    validateToken
)
router.post('/update-password/:token',
    param('token').isNumeric().withMessage('Token not is validate'),
    body('password').isLength({min:6}).withMessage('The password is very short, minimum 8 characters.'),
    body('password_confirmation').custom((value,{req})=>{
        //we validated if password is same
        if(value !== req.body.password){
            throw new Error('The Password are not same')
        }
        //next middleware
        return true
    }),
     handleInputErrors,
     updatePasswordWithToken
)

/**--------------------------AUTH-------------------------------- */

router.get('/auth/user',authenticate,getUser)

router.patch('/auth/user', 
    body('handle').notEmpty().withMessage("The user is required")
    ,handleInputErrors,authenticate,updateProfile)

router.post('/auth/user/image',authenticate,uploadImage)


router.patch('/auth/change-passsword',
        body('password').notEmpty().withMessage('The password is required'),
        body('password_new').notEmpty().isLength({min:6,max:10}).withMessage("The user is required").withMessage('The password must be 6 characters min and 8 charactrs max'),
        handleInputErrors,
        authenticate,
        changePassword
)

//------------------------------------------------------------------------
router.get('/:handle',getUserByHandle)

router.post('/search', 
        body('handle').notEmpty().withMessage("The handle is required"),
        handleInputErrors,
        searchByHandle)
export default router