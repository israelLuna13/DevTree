import { Link } from "react-router-dom"
export default function LoginView() {
  return (
   <>
    
        <div>
          <h1 className='text-lg'></h1>
        </div>
        <nav>
            <Link to="/auth/register">No tienesuna cuenta?</Link>
        </nav>
    
    </>
  )
}
