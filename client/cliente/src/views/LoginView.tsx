import { Link } from "react-router-dom"
export default function LoginView() {
  return (
   <>
    
    <h1 className="text-4xl text-white font-bold">Login</h1> 
        <nav className="mt-10">
            <Link className="text-center text-white text-lg block"  
            to="/auth/register">Don't you have an account?</Link>
        </nav>
    
    </>
  )
}
