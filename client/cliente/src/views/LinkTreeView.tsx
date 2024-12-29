import { useEffect, useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { useMutation , useQueryClient} from "@tanstack/react-query";
import { updateProfile } from "../services/DevTreeService";
import { IUser, socialNetwork } from "../types";

export default function LinkTreeView() {

  const [devtreeLinks, setDevTreeLinks] = useState(social);

  const queryClient = useQueryClient()

  //get data in cache of the user
  // the ! indicate that user won't be null
  const user:IUser = queryClient.getQueryData(['user'])!  

  //mutation
  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Updated successfully");
    },
  });

  //show url the user 
  useEffect(()=>{    
    //find in array social network the same social network that it be in user and update the url and enable
    const updateData= devtreeLinks.map(item => {
    
      const userLink = JSON.parse(user.links).find((link: socialNetwork) => link.name === item.name)
      if(userLink)
      {
        //keep the before data and update url and enabled with the new data
        return {... item, url:userLink.url, enabled:userLink.enabled}
      }
      return item
    })
    setDevTreeLinks(updateData)
  },[])

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e constains the name social network  when the user is writing
    //find the social network and update the url
    const updateLinks = devtreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link);
    
    setDevTreeLinks(updateLinks);

    //update data in cache with links
    //before send backend we update the data in cache
    //because when we send the data to the backend the previous data will be sent and there will be no changes    
    queryClient.setQueryData(["user"], (prevData: IUser) => {
      return {
        ...prevData,
        links: JSON.stringify(updateLinks),
      };
    });
  };

  const handleEnableLink = (socialNetwork: string) => {
    
    const updatedLinks = devtreeLinks.map((link) => {
      if (link.name === socialNetwork)
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("Url invalid");
        }
      return link;
    });
    setDevTreeLinks(updatedLinks);
   
    //update data in cache with links
    //before send backend we update the data in cache
    //because when we send the data to the backend the previous data will be sent and there will be no changes
    queryClient.setQueryData(['user'], (prevData:IUser)=>{
        return{
          ...prevData,
          links:JSON.stringify(updatedLinks)          
        }
    })
  }
    return (
      <>
        <div className="space-y-5">
          {devtreeLinks.map((item) => (
            <DevTreeInput
              handleUrlChange={handleUrlChange}
              handleEnableLink={handleEnableLink}
              key={item.name}
              item={item}
            />
          ))}

          <button
            onClick={ ()=> mutate(user)}
            className="bg-cyan-400 p-2 
                   text-lg w-full uppercase
                   text-slate-600 rounded-lg font-bold"
          >
            Save change
          </button>
        </div>
      </>
    );
  };

  