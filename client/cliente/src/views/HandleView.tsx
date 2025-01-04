import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getUserByHandle } from "../services/DevTreeService";
import HandleData from "../components/HandleData";
import Spinner from "../components/spinner/Spineer";
export default function HandleView()
{
    const params = useParams()

    //get params of url, Here we indicate that it will not be null
    const handle = params.handle!

    //get handle of a user
    const {data,error,isLoading} = useQuery({
        queryFn:() => getUserByHandle(handle),
        queryKey:['handle',handle],
        retry:1
    })
    if(isLoading) return <Spinner isLoading={isLoading} />

    if(error) return <Navigate to={'/404'}/>
   
    if(data) return <HandleData data ={data}/>
}