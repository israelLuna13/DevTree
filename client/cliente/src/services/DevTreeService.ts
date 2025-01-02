import { isAxiosError } from "axios";
import { api } from "../config/axios";
import { IUser, UserHanlde } from "../types";

// we put the token in the headers on the file config/axios


export async function getUser(){
    try {
        const {data} = await api.get<IUser>('/auth/user')
        // const {data} = await api.get('/auth/user',{
        //     headers:{
        //         Authorization:`Bearer ${token}`
        //     }
        // })        
        return data        
    } catch (error) {
           //we validate type error for filtrate the errors
           if(isAxiosError(error)&& error.response)
            {
              throw new Error(error.response?.data.error)
            }
    }
}
export async function updateProfile(formData:IUser){

  try {
      const {data} = await api.patch<string>('/auth/user',formData)
      // const {data} = await api.get('/auth/user',{
      //     headers:{
      //         Authorization:`Bearer ${token}`
      //     }
      // })      
      return data        
  } catch (error) {
         //we validate type error for filtrate the errors
         if(isAxiosError(error)&& error.response)
          {
            throw new Error(error.response?.data.error)
          }
  }
}

export async function uploadImage(file:File){
  const formData = new FormData()
  formData.append('file',file)
    try {
      const {data:{image}} :{data:{image:string}}= await api.post('/user/image',formData)
      return image
            
  } catch (error) {
         //we validate type error for filtrate the errors
         if(isAxiosError(error)&& error.response)
          {
            throw new Error(error.response?.data.error)
          }
  }
}


export async function getUserByHandle(handle:string){

  try {
      const {data} = await api.get<UserHanlde>(`/${handle}`)
      // const {data} = await api.get('/auth/user',{
      //     headers:{
      //         Authorization:`Bearer ${token}`
      //     }
      // })      
      return data        
  } catch (error) {
         //we validate type error for filtrate the errors
         if(isAxiosError(error)&& error.response)
          {
            throw new Error(error.response?.data.error)
          }
  }
}
