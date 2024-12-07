import bcrypt from 'bcrypt'

export const hashPassword = async(password:string)=>{
    //generate string random
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}