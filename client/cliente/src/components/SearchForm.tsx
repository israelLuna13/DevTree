import slugify from "react-slugify";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { searchByHandle } from "../services/DevTreeService";
import { Link } from "react-router-dom";

export default function SearchForm() {

    const {register,handleSubmit,watch,formState:{errors}} = useForm({defaultValues:{
        handle:''
    }})

    //exexute the funntion for search user by handle
    const mutation = useMutation({
      mutationFn:searchByHandle
    })

    //watch what user is writing
    const handle = watch('handle')    

    const handleSearchUserName = () => {
      //change  text to text without spaces blanck and it add -
        const slug = slugify(handle,{
            delimiter:'-'
        })
        //execute de mutation
        mutation.mutate(slug)
    }    
  return (
    <>
      <form onSubmit={handleSubmit(handleSearchUserName)} className="space-y-5">
        <div className="relative flex items-center  bg-white  px-2">
          <label htmlFor="handle">devtree.com/</label>
          <input
            type="text"
            id="handle"
            className="border-none bg-transparent p-2 focus:ring-0 flex-1"
            placeholder="elonmusk, zuck, jeffbezos"
            {...register("handle", {
              required: "Un Nombre de Usuario es obligatorio",
            })}
          />
        </div>
        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

        <div className="mt-10">
          {mutation.isPending && <p className="text-center">Loading...</p>}
          {mutation.error && <p className="text-center text-red-600 font-black">{mutation.error.message}</p>}
          {mutation.data && <p className="text-center text-green-600 font-black">{mutation.data} go to <Link to={'/register'} state={{handle:slugify(handle)}}>Register</Link></p>}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Obtener mi DevTree"
        />
      </form>
    </>
  );
}
