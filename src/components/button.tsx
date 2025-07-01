interface ButtonProps{
    buttonName: string,
    buttonType: "submit" | "reset" | "button"
}

export const Button =({buttonName, buttonType}: ButtonProps)=>{
    return(
        <button className="cursor-pointer border rounded-sm px-5 py-1 m-2 hover:bg-gray-900" type={buttonType}>{buttonName}</button>
    )
}