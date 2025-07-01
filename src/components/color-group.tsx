import { LogOut } from "lucide-react"
import { useAuthStore } from "../auth/authStore"

export const ColorGroup =({handleclickToAddNote})=>{
    const {logout} = useAuthStore()
    return(
        <div className="flex flex-col bg-gradient-to-br to-sky-900 from-blue-900 p-4 gap-5 w-fit rounded-full mx-6 my-4 shadow-2xl shadow-indigo-900">
            {/* <button className="text-white font-bold text-5xl mb-1 cursor-pointer">+</button> */}
            <button className="p-6 bg-yellow-300 rounded-full border-2 border-white cursor-pointer" onClick={handleclickToAddNote}></button>
            <button className="p-6 bg-red-300 rounded-full border-2 border-white cursor-pointer"></button>
            <button className="p-6 bg-purple-300 rounded-full border-2 border-white cursor-pointer"></button>
            <button className="p-6 bg-green-300 rounded-full border-2 border-white cursor-pointer"></button>
            <button className="p-6 bg-cyan-300 rounded-full border-2 border-white cursor-pointer"></button>
            <button onClick={()=>logout()} className="text-white font-bold text-5xl mx-auto p-2 mb-1 cursor-pointer"><LogOut/></button>

        </div>
    )
}
            