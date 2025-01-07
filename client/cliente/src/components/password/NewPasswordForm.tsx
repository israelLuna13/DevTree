import { useForm } from "react-hook-form";
import { FormNewPasswoer, FormToken } from "../../types";
import { updatePasswordWithToken } from "../../services/DevTreeService";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";

type NewPasswordFormProps = {
  token: FormToken["token"];
};
export default function NewPasswordForm({ token }: NewPasswordFormProps) {
  const navigate = useNavigate();

  const initialValues: FormNewPasswoer = {
    password: "",
    password_confirmation: "",
  };
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navigate("/login");
    },
  });
  const password = watch("password");

  const handleNewPassword = (formData: FormNewPasswoer) => {
    // for sent two data we have that make an object for can sent them
    const data = {
      formData,
      token,
    };
    mutate(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        noValidate
        className="space-y-8 p-10 bg-white mt-10"
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "The password is required",
              minLength: {
                value: 6,
                message: "The password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div>
          <label className="font-normal text-2xl">Password confirmation</label>

          <input
            type="password"
            id="password_confirmation"
            placeholder="Password confirmation"
            className="w-full p-3  border-gray-300 border"
            {...register("password_confirmation", {
              required: "The password is required",
              validate: (value) =>
                value === password || "The passwords are not the same",
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Change password"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  );
}
