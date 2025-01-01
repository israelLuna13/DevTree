import { useEffect, useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../services/DevTreeService";
import { IUser, socialNetwork } from "../types";

export default function LinkTreeView() {
  const [devtreeLinks, setDevTreeLinks] = useState(social);

  const queryClient = useQueryClient();

  //get data in cache of the user
  // the ! indicate that user won't be null
  const user: IUser = queryClient.getQueryData(["user"])!;

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
  useEffect(() => {
    //find in array social network the same social network that it be in user and update the url and enable
    const updateData = devtreeLinks.map((item) => {
      const userLink = JSON.parse(user.links).find(
        (link: socialNetwork) => link.name === item.name
      );
      if (userLink) {
        //keep the before data and update url and enabled with the new data
        return { ...item, url: userLink.url, enabled: userLink.enabled };
      }
      return item;
    });
    setDevTreeLinks(updateData);
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e constains the name social network  when the user is writing
    //find the social network and update the url
    const updateLinks = devtreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    );

    setDevTreeLinks(updateLinks);

    //update data in cache with links
    //before send backend we update the data in cache
    //because when we send the data to the backend the previous data will be sent and there will be no changes

    //DISABLE BECAUSE WE DON'T WANT SAVE IN DATABASE ANTTHINK THAT USER WRITE
    // queryClient.setQueryData(["user"], (prevData: IUser) => {
    //   return {
    //     ...prevData,
    //     links: JSON.stringify(updateLinks),
    //   };
    // });
  };

  //get all links of user
  const links: socialNetwork[] = JSON.parse(user.links);

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = devtreeLinks.map((link) => {
      //check if url is valid
      if (link.name === socialNetwork)
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("Url invalid");
        }
      return link;
    });
    setDevTreeLinks(updatedLinks);

    //on updateItems only wll be the social network enable for update the cache
    let updateItems: socialNetwork[] = [];

    //social network disable or enable
    const selectSocialNetwork = updatedLinks.find(
      (link) => link.name === socialNetwork
    );

    if (selectSocialNetwork?.enabled) {
      //get all  social network it have id , count them it and add 1 , this is for add the next id to ohter social network it going add
      const id = links.filter((link) => link.id).length + 1;

      //it check if the social network already exist in the array
      if (links.some((link) => link.name === socialNetwork)) {
        updateItems = links.map((link) => {
          if (link.name === socialNetwork) {
            //enable and add id
            return {
              ...link,
              enabled: true,
              id: id,
            };
          } else {
            return link;
          }
        });
      } else {
        //If is not be in the array, add new object link
        const newItem = {
          ...selectSocialNetwork,
          id: id,
        };
        updateItems = [...links, newItem];
      }
    } else {//if social network is not enable
      //if social network is be disable
      //
      const indexToUpdate = links.findIndex(
        (link) => link.name === socialNetwork
      );
      updateItems = links.map((link) => {

        if (link.name === socialNetwork) {
          //the social network change her id for 0 and change enable
          return {
            ...link,
            id: 0,
            enabled: false,
          };
          //when you update social network with 0 check all the id to update your id
        } else if (link.id > links[indexToUpdate].id) {
          return {
            ...link,
            id: link.id - 1,
          };
        } else {
          return link;
        }
      });
    }
    //update data in cache with links
    //before send backend we update the data in cache
    //because when we send the data to the backend the previous data will be sent and there will be no changes
    queryClient.setQueryData(["user"], (prevData: IUser) => {
      return {
        ...prevData,
        links: JSON.stringify(updateItems),
      };
    });
  };

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
          onClick={() => mutate(queryClient.getQueryData(["user"])!)}
          className="bg-cyan-400 p-2 
                   text-lg w-full uppercase
                   text-slate-600 rounded-lg font-bold"
        >
          Save change
        </button>
      </div>
    </>
  );
}
