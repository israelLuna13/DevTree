import { Link } from "react-router-dom";

export default function GoPanelAdmistration() {
  return (
    <Link 
          to={'/admin'}
          className="bg-lime-500 rounded-lg text-slate-800 p-2 uppercase font-black text-xs cursor-poointer"
          >
            Go to my links
      </Link>
  )
}
