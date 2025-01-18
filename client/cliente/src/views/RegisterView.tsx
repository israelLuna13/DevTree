import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { RegisterForm } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../services/DevTreeService";

export default function RegisterView() {
  const location = useLocation();
  const navigate = useNavigate();

  //  THE TYPE REGISTERFORM,  WE CAN  PUT HERE OR IN USERFORM , LIKE THAT <REGISTERFORM>USERFORM
  const initialValue: RegisterForm = {
    name: "",
    email: "",
    handle: location?.state?.handle || "",
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

  const registerMutate = useMutation({
    mutationFn: createAccount,

    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/login");
      reset();
    },
  });

  const password = watch("password"); // watch the write the password

  // llevar a una mutacion
  const handleRegister = async (formData: RegisterForm) => {
    registerMutate.mutate(formData);
  };
  return (
    <>
      <h1 className="text-4xl text-black font-bold mb-5 text-center">
        Join DevTree
      </h1>
      <p className="text-center text-lg text-slate-400">Create account</p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white px-5 py-10 rounded-lg space-y-5"
      >
        <div className="grid grid-cols-1 space-y-2">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
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
            placeholder="example@gmail.com"
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
            placeholder="user name"
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
            placeholder="*************"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: "The password is required",
              minLength: {
                value: 8,
                message: "The password most be at least 8 charecters long",
              },
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
            Repit Password
          </label>
          <input
            id="password_confirm"
            type="password"
            placeholder="*************"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password_confirmation", {
              required: "The password confirmartion is required",
              validate: (value) =>
                value === password || "The password is not same",
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="bg-green-500 p-3 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer"
          value="Create account"
        />
      </form>

      <nav className="mt-10">
        <Link className="text-center text-slate-500 text-lg block" to="/login">
          Do you have an account? Login
        </Link>
      </nav>
    </>
  );
}
