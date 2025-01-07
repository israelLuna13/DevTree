import { useState } from "react"
import { FormToken } from "../types"
import NewPasswordToken from "../components/password/NewPasswordToken"
import NewPasswordForm from "../components/password/NewPasswordForm"


export default function NewPasswordView() {
  //in the components check if the token is validate
    const [token,setToken] = useState<FormToken['token']>('')
    const [isValidToken,setIsValidToken] = useState(false)
  return (
   <>
         <h1 className="text-5xl font-black text-white">Reset Password</h1>
        <p className="text-2xl font-light text-white mt-5">
          Enter the code you received  {''}
        <span className=" text-fuchsia-500 font-bold"> by email</span>
      </p>
      {!isValidToken ? 
      <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}/>: 
      <NewPasswordForm token={token}/>}

   
   </>
  )
}
