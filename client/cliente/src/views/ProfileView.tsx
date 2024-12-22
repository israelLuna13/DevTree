import {useForm} from 'react-hook-form'
import ErrorMessage from '../components/ErrorMessage';
import { useQueryClient,useMutation } from '@tanstack/react-query';
import { IUser, ProfileForm } from '../types';
import { updateProfile } from '../services/DevTreeService';
import { toast } from 'sonner';
export default function ProfileView() {

const queryClient = useQueryClient()

//we put ! for indicate to typescript that data won't be undefined
//with queryData we get the data in cache the ones before query
const data: IUser = queryClient.getQueryData(['user'])!

const {register,handleSubmit,formState:{errors}} =
            useForm<ProfileForm>({defaultValues:{handle:data?.handle,description:data?.description}})

//update profile
const updateProfileMutation = useMutation({
  mutationFn:updateProfile,
  onError:(data)=>{
    toast.error(data.message)
  },
  onSuccess:(data)=>{
    toast.success(data)
    //refersh information
    //clear cache and make the query again
    queryClient.invalidateQueries({queryKey:['user']})
  }
})
const handleUserProfileForm=(formData:ProfileForm) => {
  //execute mutation
  updateProfileMutation.mutate(formData)
}

  return (
    <form className="bg-white p-10 rounded-lg space-y-5" onSubmit={handleSubmit(handleUserProfileForm)}>
      <legend className="text-2xl text-slate-800 text-center">
        Editar Información
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Handle:</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="handle o Nombre de Usuario"
          {...register('handle',{
            required:'The user name is required'
          })}
        />
        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage> }

      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Descripción:</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Tu Descripción"
          {...register('description',{
              required:'The descriptionn is required'
          })}
        />
        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Imagen:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={() => {}}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Guardar Cambios"
      />
    </form>
  );
}
