import {useForm} from 'react-hook-form'

export default function ChangePasswordView()
{
    const {register,handleSubmit,formState:{erros}} = useForm({defaultValues:{}})
    return (
        <>
            <form className='bg-white p-10 rounded-lg space-y-5'
                 action=""
                 onSubmit={()=>{}}>

                <legend className='text-2xl text-slate-800 text-center'>
                    Change your password
                </legend>
                <div className='grid grid-cols-1 gap-2'>
                    <label htmlFor="password" >
                        Current password:
                    </label>
                    <input type="password"
                             className="border-none bg-slate-100 rounded-lg p-2"
                            id='password'
                            placeholder='Currente password'
                    />
                    
                </div>
                <div className='grid grid-cols-1 gap-2'>
                    <label htmlFor="password_new" >
                        New password:
                    </label>
                    <input type="password"
                             className="border-none bg-slate-100 rounded-lg p-2"
                            id='password_new'
                            placeholder='New password'
                    />
                </div>

                <div className='grid grid-cols-1 gap-2'>
                    <label htmlFor="password_confirmation" >
                        New password:
                    </label>
                    <input type="password"
                             className="border-none bg-slate-100 rounded-lg p-2"
                            id='password_confirmation'
                            placeholder='Confirmation password'
                    />
                </div>

            </form>
        
        </>
    )
}