import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { confirmAccount } from '../services/DevTreeService';
import { toast } from 'sonner';
import { FormToken } from '../types';

export default function ConfirmAccount() {
    const [token,setToken] = useState<FormToken['token']>('')

    const {mutate} = useMutation({
        mutationFn:confirmAccount,
        onError:(error)=>{
            toast.error(error.message)
        },
        onSuccess:(data)=>{
        
            toast.success(data)
        }
    })
    const handleChange = (tokenForm:FormToken['token']) => {
        setToken(tokenForm);
        console.log(token);
        

      };
      //when we finish writing the token
      const handleComplete = (token: FormToken['token']) => {
    
        
       mutate({token})
      };
  return (
    <>
          <h1 className="text-5xl font-black text-white">Confirm Account</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código que recibiste {''}
        <span className=" text-fuchsia-500 font-bold"> to e-mail</span>
      </p>
 
      <form className="space-y-8 p-10 bg-white mt-10">
        <label className="font-normal text-2xl text-center block">Code of 6 digits</label>
        <div className="flex justify-center gap-5">
            {/*  inputs for write the token */}
          <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
            <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-300 placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-300 placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-300 placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-300 placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-300 placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-300 placeholder-white" />
          </PinInput>

        </div>
      </form>
 
      <nav className="mt-10 flex flex-col space-y-4">
        <Link to="/auth/request-code" className="text-center text-gray-300 font-normal">
          Request new code
        </Link>
      </nav>
    
    </>
  )
}
