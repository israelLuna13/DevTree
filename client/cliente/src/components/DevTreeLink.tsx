
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import { socialNetwork } from "../types"

type DevTreeLinkProps={
    link:socialNetwork
}

export default function DevTreeLink({link}:DevTreeLinkProps) {
  //--------------------------
  //config drag and drop
  const {attributes,listeners,setNodeRef,transform,transition} = useSortable({
    id:link.id
  })
  const style ={
    transform:CSS.Transform.toString(transform),
    transition
  }
  //------------------------
  return (
    //add attributes to list, list will be the element dinamic
    <li
      ref={setNodeRef}
       style={style}
        className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
        {...attributes} 
        {...listeners}
        >

          <div className="w-12 h-12 bg-cover" 
                style={{backgroundImage:`url('/social/icon_${link.name}.svg')`}}>
         </div>

         <p className="capitalize">Follow me: <span className="font-black">{link.name}</span> </p>
    </li>
  )
}
