import { useLocation } from "react-router-dom";
import AdminNavigation from "./nav/AdminNavigation";
import HomeNavegation from "./nav/HomeNavegation";
import Logo from "./logo/Logo";
import GoPanelAdmistration from "./nav/GoPanelAdmistration";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/DevTreeService";

export default function Header() {

//check if there is user on session
  const {isError} = useQuery({
    queryFn:getUser,
    queryKey:['user'],
    retry:0, // times try execute the query
    refetchOnWindowFocus:false // refersh when open de window
})

  const location = useLocation()//current route
    
  return (
    <header className="bg-slate-800 py-5">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
          <div className="w-full p-5 lg:p-0 md:w-1/3">
            <Logo/>
          </div>

          <nav className="md:w-1/3 md:flex md:justify-end">
            {!isError && location.pathname ==='/' ? 
                  // whitout session
                  <GoPanelAdmistration/> 
                                          : 
                  // on session 
                  location.pathname === '/' ? <HomeNavegation/> : <AdminNavigation/>
            }
          </nav>
        </div>
      </header>
  )
}
