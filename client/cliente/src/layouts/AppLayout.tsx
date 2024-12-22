import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/DevTreeService";
import DevTree from "../components/DevTree";


export default function AppLayout() {
    const {data,isLoading,isError} = useQuery({
        queryFn:getUser,
        queryKey:['user'],
        retry:2, // times try make query
        refetchOnWindowFocus:false // refersh when open de window
    })

    if(isLoading) return 'Load ....'

    if(isError) return <Navigate to={'/auth/login'} />
    
    //check if data is undefined
    if(data) return <DevTree data={data}/>
    
}
