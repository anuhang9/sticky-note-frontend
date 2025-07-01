import { Button } from "./button"

export const OTPverify =()=>{
    return(
        <div className="absolute top-0 z-[-2] gap-10 min-h-screen w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] flex items-center justify-center text-gray-200">
            <div className="bg-gray-800 backdrop-blur-xl  p-2 rounded-sm flex flex-col justify-center items-center">

            <h3>Enter Your OTP Here.</h3>
            <form className="flex flex-col items-center" action="">
                <div>

                <input className="border border-gray-400 rounded-sm focus:outline-none p-1 w-10 text-center m-2" type="text" inputMode="numeric" pattern="[0-9]" />
                <input className="border border-gray-400 rounded-sm focus:outline-none p-1 w-10 text-center m-2" type="text" inputMode="numeric" pattern="[0-9]" />
                <input className="border border-gray-400 rounded-sm focus:outline-none p-1 w-10 text-center m-2" type="text" inputMode="numeric" pattern="[0-9]" />
                <input className="border border-gray-400 rounded-sm focus:outline-none p-1 w-10 text-center m-2" type="text" inputMode="numeric" pattern="[0-9]" />
                </div>
                <Button buttonName="VeriFy" buttonType="submit"/>

            </form>

            <div className="w-64 h-[0.5px] bg-gray-400 my-2"></div>
        <div className="flex items-center m-2">
          <div className="text-xs m-1">Didn't get code.</div>
          <a href="" className="text-xs m-1">
            Resent.
          </a>
          <span className="text-xs m-1">00</span>
        </div>
            </div>
        </div>
    )
}