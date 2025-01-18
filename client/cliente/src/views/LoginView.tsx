import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/DevTreeService";
import { LoginForm } from "../types";

export default function LoginView() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const loginMutate = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      localStorage.setItem("AUTH_TOKEN", data);
      navigate("/admin");
      reset();
    },
  });

  const handleLogin = async (formData: LoginForm) => {
    loginMutate.mutate(formData);
  };

  return (
    <>
    
            <h1 className="text-4xl text-black font-bold mb-5 text-center">
                Welcome back!
            </h1>
            <p className="text-center text-lg text-slate-400">Login</p>

            {/* Formulario */}
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="bg-white px-5 py-10 rounded-lg  space-y-5"
              noValidate
            >
              <div className="grid grid-cols-1 space-y-2">
                <label htmlFor="email" className="text-xl text-slate-500">
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
                {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
              </div>
              <div className="grid grid-cols-1 space-y-2">
                <label htmlFor="password" className="text-xl text-slate-500">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="*************"
                  className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                  {...register("password", {
                    required: "The password is required",
                  })}
                />
                {errors.password && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
              </div>
              <input
                type="submit"
                className="bg-green-500 p-3 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer"
                value="Login"
              />
            </form>

            {/* Enlaces */}
            <nav className="mt-5">
              <Link
                className="text-center text-slate-500 text-lg block"
                to="/register"
              >
                Don't you have an account? Create an account
              </Link>
              <Link
                className="text-center text-slate-500 text-lg block"
                to="/forgot-password"
              >
                Forgot your password?
              </Link>
            </nav>
    </>
  );
}
