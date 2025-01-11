import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Logo from "../components/logo/Logo";

export default function AuthDemoLayout() {
  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="flex gap-4">
            
            {/* form */}
          <div className="w-1/2  text-black p-4 rounded-lg">
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-full max-w-5xl">
              <div className="mb-5 max-w-lg mx-auto px-5">
              <Logo /> {/* Aquí está tu logo */}
            </div>
                <Outlet />
              </div>
            </div>
          </div>

{/* image */}
          <div className="w-1/2 text-black p-4 rounded-lg">
            <div
              className=" min-h-screen bg-no-repeat 
                            bg-right-top lg:bg-home"
            ></div>
          </div>
        </div>
      </div>
      {/* register toaster on our project */}
      <Toaster richColors position="top-right" />
    </>
  );
}
