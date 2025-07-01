import { useState } from "react";
import {motion} from 'framer-motion'
import { Input } from "../components/input";
import { Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../auth/authStore";
import toast from "react-hot-toast";

export const LogInPage = () => {
  const [logInCredential, setLogInCredential] = useState({
    userName: "",
    password: ""
  })
  const {login, isLoading, error} = useAuthStore()
  toast.error(error)
  const navigate = useNavigate()
  const [logInError, setLogInError] = useState("")

  const handleOnChangeLogIn =(evt: React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = evt.target;
    setLogInCredential((preValue)=>({...preValue, [name]: value}))
  }
  const handleSubmitLogIn = async(evt: React.FormEvent<HTMLFormElement>)=>{
    evt.preventDefault()
    if(!logInCredential.userName || !logInCredential.password){
      setLogInError("requred field");
      return;
    }
    setLogInError("")
    try{
      await login(logInCredential.userName, logInCredential.password)
      navigate('/')
    }catch(error){
      console.log(error)
    }
  }
  return (
    <motion.div 
    initial={{opacity: 0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5}} className="max-w-md w-full bg-gray-800/50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">

      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-sky-500 text-transparent bg-clip-text">Welcome Back</h2>
      <form onSubmit={handleSubmitLogIn}>
        <Input icon={Mail} type="text" placeholder="User Name" value={logInCredential.userName} onChange={handleOnChangeLogIn} name="userName"/>
        <Input icon={Lock} type="password" placeholder="Password" value={logInCredential.password} onChange={handleOnChangeLogIn} name="password"/>
        <div className="flex items-center mb-6">
          <Link to='/forgotpassword' className="text-sm text-blue-400 hover:underline">Forgot Password?</Link>
        </div>
        <motion.button className='cursor-pointer w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-sky-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200' whileHover={{scale:1.02}} whileTap={{scale:0.98}}>Login</motion.button>
      </form>
      </div>
      <div className='px-8 py-4 bg-gray-900/50 flex justify-center'>
        <p className='text-sm text-gray-400'>Don't have an account? <Link to={"/signup"} className='text-blue-400 hover:underline'>Sign Up</Link></p>
        </div>
    </motion.div>
  );
};
