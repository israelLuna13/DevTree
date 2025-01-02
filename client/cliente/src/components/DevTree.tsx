import { Link, Outlet } from "react-router-dom";
import NavigationTabs from "./NavigationTabs";
import { Toaster } from "sonner";
import {DndContext,DragEndEvent,closestCenter} from '@dnd-kit/core'
import {SortableContext,verticalListSortingStrategy,arrayMove} from '@dnd-kit/sortable'

import { IUser, socialNetwork } from "../types";
import { useEffect, useState } from "react";
import DevTreeLink from "./DevTreeLink";
import { useQueryClient } from "@tanstack/react-query";

interface DevTreeProps{
    data: IUser
}
export default function DevTree({data}:DevTreeProps) {
    //put in state the links enabled
    //convert the links on arrys because bring like string
    //filter the links enabled
    const [enabledLinks, setEnabledLinks] = useState<socialNetwork[]>(JSON.parse(data.links).filter((item:socialNetwork) => item.enabled))

    //update state when data change for show the list links updated
    useEffect(() =>{
        setEnabledLinks(JSON.parse(data.links).filter((item:socialNetwork) => item.enabled))
    },[data])    

    const queryCliente = useQueryClient()
    
    const handleDragEnd = (e:DragEndEvent) =>{
        //active is the element that is draged
        //over is the element that it was in that position
        const {active,over} = e

        if(over && over.id){
          //search the new link and previus link
            const prevIndex =enabledLinks.findIndex(link => link.id === active.id)
            const newIndex = enabledLinks.findIndex(link => link.id === over.id)
            //order the links
            const order = arrayMove(enabledLinks,prevIndex,newIndex)
            //new order 
            setEnabledLinks(order)

            //get the links disable for not lost the links
            const disableLinks:socialNetwork[] = JSON.parse(data.links).filter((item:socialNetwork) =>! item.enabled)
            //new array with new order and the links disable
            const links = [...order,...disableLinks]

            //update the cache
            queryCliente.setQueryData(['user'],(prevData:IUser) => {
                return {
                    ...prevData,
                    links:JSON.stringify(links)
                }
            })
        }
    }
    
  return (
    <>
      <header className="bg-slate-800 py-5">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
          <div className="w-full p-5 lg:p-0 md:w-1/3">
            <img src="/logo.svg" className="w-full block" />
          </div>
          <div className="md:w-1/3 md:flex md:justify-end">
            <button
              className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
              onClick={() => {}}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>
      <div className="bg-gray-100  min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <NavigationTabs />

          <div className="flex justify-end">
            <Link
              className="font-bold text-right text-slate-800 text-2xl"
              to={`/${data.handle}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visitar Mi Perfil:/{data.handle}
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex-1 ">
              <Outlet />
            </div>
            <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
              <p className="text-4xl text-center text-white">{data.handle}</p>

              {data.image && (
                <img
                  src={data.image}
                  alt="Profile image"
                  className="mx-auto max-[250px]"
                />
              )}

              <p className="text-center text-lg font-black text-white ">
                {data.description}
              </p>
            {/* 
              add drag and drop */}
              <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                {/* show all links */}
                <div className="mt-20 flex flex-col gap-5">
                    <SortableContext items={enabledLinks} strategy={verticalListSortingStrategy}>
                        {enabledLinks.map((link) => (
                        <DevTreeLink key={link.name} link={link} />
                        ))}
                    </SortableContext>
                </div>
              </DndContext>
            </div>
          </div>
        </main>
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
}
