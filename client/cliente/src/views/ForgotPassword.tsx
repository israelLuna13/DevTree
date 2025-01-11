import { useForm } from "react-hook-form"
import { FormForgotPassword } from "../types"
import ErrorMessage from "../components/ErrorMessage"
import { Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { forgotPassword } from "../services/DevTreeService"

export default function ForgotPasswordView()
{
    const initialValues:FormForgotPassword={
        email:""
    }
    const {register,handleSubmit,reset,formState:{errors}} = useForm({defaultValues:
        initialValues
    })

    const {mutate} = useMutation({
        mutationFn:forgotPassword,
        onError:(data)=>{
            toast.error(data.message)
        },
        onSuccess:(data)=>{
            toast.success(data)
            reset()
        }
    })
    const handleForgotPassword = (formData:FormForgotPassword) =>{
        mutate(formData)
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Reset your password</h1>
            <p className="text-2xl font-light text-white mt-5">
                <span className="text-blue-200 font-bold">Forgot your password? Enter your email</span>
            </p>
            
            <form 
                    className="space-y-8 p-10 bg-white mt-10"
                    onSubmit={handleSubmit(handleForgotPassword)}
                    noValidate>
                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl"
                           htmlFor="email">
                            Email:
                           </label>
                    <input type="email" 
                            className="w-full p-3 border-gray-400 border"
                            placeholder="Example: user@gmail.com" 
                            {...register("email",{
                                required:"The email is required",
                                pattern:{
                                    value:/\S+@\S+\.\S+/,
                                    message:"Email isn't valide"
                                }

                            })}
                            />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>

                <input type="submit"
                        value='Sent code'
                        className="bg-blue-600 hover:bg-blue-700 w-full p-3 text-white font-black text-xl cursor-pointer" />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                    <Link
                to='/login'
                className="text-center text-white font-bold"
                >
                You have an account? Login
                </Link>

                <Link
                to='/register'
                className="text-center text-white font-bold"
                >
                 ¿Don't have an account? Create an account
                </Link>

            </nav>

        
        
        </>
    )
}