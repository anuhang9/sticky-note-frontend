import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../auth/authStore";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

export const EmailVerify = () => {
  const [code, setcode] = useState<string[]>(["", "", "", ""]);
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const { emailVerify, isLoading, error } = useAuthStore()
  const navigate = useNavigate()

    const handleChange = (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return; // ^ starting regex, $ ending regex, \d number 0-9, * limitation can be 0 to more than 0
      const newCode = [...code];
      if (value.length > 1) {
      const pastedCode = value.slice(0, 4).split("");
      for (let i = 0; i < 4; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setcode(newCode);
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 3 ? lastFilledIndex + 1 : 3;
      inputRef.current[focusIndex]?.focus();
    } else {
      newCode[index] = value;
      setcode(newCode);
      if (value && index < 3) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };
  
  const handleSubmit = async(evt?: React.FormEvent<HTMLFormElement>) => {
    if (evt) {
      evt.preventDefault();
    }
    try{
      await emailVerify(code.join(''))
      navigate('/')
      
    }catch(error){
      console.log(error)
    }
  };
  
  const handleKeyDown = (index: number, evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Backspace" && !code[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };
  
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit();
      toast.success("welcome in dashboard !")
    }
  }, [code]);
  
  return (
    <div className="max-w-md w-full bg-gray-800/50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800/50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-sky-500 text-transparent bg-clip-text">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Enter the code sent to your email.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={4}
                value={digit}
                ref={(e) => {
                  inputRef.current[index] = e;
                }}
                onChange={(evt) => handleChange(index, evt.target.value)}
                onKeyDown={(evt) => handleKeyDown(index, evt)}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            ))}
          </div>
            <p className="text-red-500 font-semibold">{code.every(digit=>digit !== '') ? error: ""}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-sky-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Verify Email"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};