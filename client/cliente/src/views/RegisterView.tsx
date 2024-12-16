import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RegisterForm} from "../types";
import ErrorMessage from "../components/ErrorMessage";
import axios, { isAxiosError } from "axios";


export default function RegisterView() {
  //  THE TYPE REGISTERFORM WE CAN PUT HERE OR IN USERFORM , LIKE THAT <REGISTERFORM>USERFORM
  const initialValue :RegisterForm= {
    name: "",
    email: "",
    handle: "",
    password: "",
    password_confirmation: "",
  };
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValue });

  const password = watch('password')// watch the write the password
  

  const handleRegister = async(formData:RegisterForm) => {
      try {
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`,formData)

        console.log(data);
        reset();
        
      } catch (error) {
             //we validate type error for filtrate the errors
            if(isAxiosError(error)&& error.response)
            {
              console.log(error.response?.data.error);
            }
      }
    
  };
  return (
    <>
      <h1 className="text-4xl text-white font-bold">Create account</h1>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("name", {
              required: "The name is required",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("email", {
              required: "The email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
            },
              
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="handle" className="text-2xl text-slate-500">
            Handle
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Nombre de usuario: sin espacios"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("handle", {
              required: "The handle is required",
            })}
          />
          {errors.handle && (
            <ErrorMessage>{errors.handle.message}</ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: "The password is required",
              minLength:{
                value:8,
                message:'The password most be at least 8 charecters long'
              }
            })}
          />
        </div>
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}

        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="password_confirmation"
            className="text-2xl text-slate-500"
          >
            Repetir Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Repetir Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password_confirmation", {
              required: "The password confirmartion is required",
              validate:(value)=>value === password || "The password is not same"
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Crear Cuenta"
        />
      </form>

      <nav className="mt-10">
        <Link className="text-center text-white text-lg block" to="/auth/login">
          Do you have account?
        </Link>
      </nav>
    </>
  );
}
