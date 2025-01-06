import { transporter } from "../config/email"
interface IEMail{
    email:string,
    name:string
    token:string
}

export class AuthEMail{
    static sendConfirmationEmail = async (user:IEMail)=>{
           //send email
      const info=  await transporter.sendMail({
        from:'DevTree <admin@edevtree.com>',
        to:user.email,
        subject:'DevTree - Confirm you account',
        html:`<p>Hi: ${user.name}, you have created you account on DevTree, you just need to confirm your account  </p>
                <p>Visit the following link</p>
                <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirm you account</a>
                <p>Put the code: <b>${user.token}</b></p>
                <p>This token will expired in 10 minutes</p>
                `
    })   
    }
    static sentPasswordResetToken = async (user:IEMail)=>{
        //send email
      const info=  await transporter.sendMail({
            from:'DevTree <admin@devtree.com>',
            to:user.email,
            subject:'DevTree - Reset your password',
            html:`<p>Hi: ${user.name}, Have you reset your password </p>
                    <p>Visit the next link</p>
                    <a href="${process.env.FRONTEND_URL}/auth/new-password">Reset password</a>
                    <p>Put the code: <b>${user.token}</b></p>
                    <p>This token will expired in 10 minutes</p>
                    `
        })        

    }

}