import { Link } from "react-router-dom"
export default function HomeNavegation() {
  return (
    <>
      <Link 
          to={'/login'}
          className="text-white p-2 uppercase font-black text-xs cursor-poointer"
          >
            Login
      </Link>

      <Link 
          to={'/register'}
          className="bg-lime-500 rounded-lg text-slate-800 p-2 uppercase font-black text-xs cursor-poointer"
          >
            Create an account
      </Link>
    
    </>

  )
}
