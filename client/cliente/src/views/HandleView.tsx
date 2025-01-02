import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getUserByHandle } from "../services/DevTreeService";
import HandleData from "../components/HandleData";
export default function HandleView()
{
    const params = useParams()
    //get params of url
    const handle = params.handle!

    const {data,error,isLoading} = useQuery({
        queryFn:() => getUserByHandle(handle),
        queryKey:['handle',handle],
        retry:1
    })
    if(isLoading) return <p className="font-bold text-white uppercase text-lg">Loading...</p>

    if(error) return <Navigate to={'/404'}/>
   
    if(data) return <HandleData data ={data}/>
}