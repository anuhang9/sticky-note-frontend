import type { LucideIcon } from "lucide-react";

interface InputProps{
    icon: LucideIcon
    placeholder: string;
    type: string;
    value: string;
    name: string;
    onChange: (evt: React.ChangeEvent<HTMLInputElement>)=> void;
}
export const Input =({icon: Icon, ...props}: InputProps)=>{
    return(
        <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon className="size-5 text-blue-500" />
            </div>
            <input {...props} className="w-full pl-10 pr-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition duration-200"></input>
        </div>
    )
}