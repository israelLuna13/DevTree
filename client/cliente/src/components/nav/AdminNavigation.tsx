import { useQueryClient } from "@tanstack/react-query";
export default function AdminNavigation() {
  const queryClient = useQueryClient()

  //clear local storage and update the cache
  const logout = () =>{
    localStorage.removeItem('AUTH_TOKEN')
    //execute the query again
    queryClient.invalidateQueries({queryKey:['user']})
  }

  return (
    <button
      className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
      onClick={logout}
    >
      Logout
    </button>
  );
}
