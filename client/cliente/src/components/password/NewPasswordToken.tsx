import { useMutation } from "@tanstack/react-query";
import { FormToken } from "../../types";
import { validToken } from "../../services/DevTreeService";
import { toast } from "sonner";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Link } from "react-router-dom";

type NewPasswordTokenProps = {
  token: FormToken["token"];
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NewPasswordToken({
  token,
  setIsValidToken,
  setToken,
}: NewPasswordTokenProps) {
  const { mutate } = useMutation({
    mutationFn: validToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      setIsValidToken(true);
    },
  });
  //when we write in a text field
  const handleChange = (token: FormToken["token"]) => {
    setToken(token);
  };

  // when we finish to write the token
  const handleComplete = (token: FormToken["token"]) => {
    mutate({ token });
  };

  return (
    <>
      <form className="space-y-8 p-10 rounded-lg bg-white mt-10">
        <label className="font-normal text-2xl text-center block">
          Code of 6 digits
        </label>
        <div className="flex justify-center gap-5">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/forgot-password"
          className="text-center text-gray-300 font-normal"
        >
          Request new token
        </Link>
      </nav>
    </>
  );
}
