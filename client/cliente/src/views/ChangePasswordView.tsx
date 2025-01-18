import {useForm} from 'react-hook-form'
import ErrorMessage from '../components/ErrorMessage';
import { ChangePassword } from '../types';
import { useMutation } from '@tanstack/react-query';
import { updatePassword } from '../services/DevTreeService';
import { toast } from 'sonner';

export default function ChangePasswordView()
{
    const initialValues:ChangePassword={
        password:'',
        password_new:'',
        password_confirmation:''
    }
    const {register,reset,handleSubmit,watch,formState:{errors}} = useForm({defaultValues:initialValues})

    //mutate
    const updatePasswordMutation = useMutation({
        mutationFn:updatePassword,
        onError:(data)=>{
            toast.error(data.message)
        },
        onSuccess:(data)=>{
            toast.success(data)
            reset()
        }
    })

    //watch while the user is writing her password
    const newPassword = watch('password_new')

    const handleUpdatePassword = (formData:ChangePassword) => {
        updatePasswordMutation.mutate(formData)
    }
    
    return (
        <>
            <form className='bg-white p-10 rounded-lg space-y-5'
                 action=""
                 onSubmit={handleSubmit(handleUpdatePassword)}>

                <legend className='text-2xl text-slate-800 text-center'>
                    Change your password
                </legend>
                <div className='grid grid-cols-1 gap-2'>
                    <label htmlFor="password" >
                        Current password:
                    </label>
                    <input type="password"
                             className="border-none bg-slate-100 rounded-lg p-2 placeholder-slate-400"
                            id='password'
                            placeholder='Currente password'
                            {...register('password',{
                                required:'The password is required'
                            })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                <div className='grid grid-cols-1 gap-2'>
                    <label htmlFor="password_new" >
                        New password:
                    </label>
                    <input type="password"
                             className="border-none bg-slate-100 rounded-lg p-2"
                            id='password_new'
                            placeholder='New password'
                            {...register('password_new',{
                                required:'The password is required',
                                minLength:{
                                    value:6,
                                    message:'The password most be at least 8 characters long'
                                }
                            })}
                    />
                    {errors.password_new && <ErrorMessage>{errors.password_new.message}</ErrorMessage>}

                </div>

                <div className='grid grid-cols-1 gap-2'>
                    <label htmlFor="password_confirmation" >
                        Repit new password:
                    </label>
                    <input type="password"
                             className="border-none bg-slate-100 rounded-lg p-2"
                            id='password_confirmation'
                            placeholder='Confirmation password'
                            {...register('password_confirmation',{
                                required:'The password is required',
                                validate:(value) => value === newPassword || "The password is not same"
                            })}
                    />
                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}

                </div>

                <input
                        type="submit"
                        className="bg-green-400 p-2 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer"
                        value="Save changes"
                    />
            </form>
        
        </>
    )
}