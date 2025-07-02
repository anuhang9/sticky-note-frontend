import { useState } from 'react';
import { Input, } from "../components/input";
import {motion} from 'framer-motion'
import { Loader, Lock, Mail, User, UserIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PasswordStrengthMeter } from '../components/password-strenght-meter';
import { useAuthStore } from '../auth/authStore';

export const SignUpPage = () => {

  const [signUpFormData, setSignUpFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: ""
  })
  
  const { signUp, error, isLoading } = useAuthStore();
  const navigate = useNavigate()
    const handleChange =(evt: React.ChangeEvent<HTMLInputElement>)=>{
    const{name, value} = evt.target;
    setSignUpFormData((previousValue)=> ({...previousValue, [name]:value}))
  }
  const handleSubmit =async (evt: React.FormEvent<HTMLFormElement>)=>{
    evt.preventDefault()
    try{
      await signUp(signUpFormData.email, signUpFormData.password, signUpFormData.name, signUpFormData.userName);
      navigate("/otpverify")
    }catch(error){
      console.log(error)
    }
  }

  return (
    <motion.div
    initial = {{opacity: 0, y: 20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.5}}
    className='max-w-md w-full bg-gray-800/50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-sky-500 text-transparent bg-clip-text'>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <Input icon={UserIcon} type="text" value={signUpFormData.name} placeholder="Full Name" onChange={handleChange} name="name" />
          <Input icon={User} type="text" value={signUpFormData.userName} placeholder="User Name" onChange={handleChange} name="userName" />
          <Input icon={Mail} type="text" value={signUpFormData.email} placeholder="Email" onChange={handleChange} name="email" />
          <Input icon={Lock} type="text" value={signUpFormData.password} placeholder="Password" onChange={handleChange} name="password" />
          {error && <p className='text-red-500 mb-5 font-semibold'>{error}</p>}
          <PasswordStrengthMeter password={signUpFormData.password}/>
          <motion.button className='cursor-pointer mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-sky-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200' whileHover={{scale:1.02}} whileTap={{scale:0.98}}
          disabled={isLoading}
          >{
            isLoading ? <Loader className='animate-spin mx-auto' size={24}/> : "Sign Up"
            }</motion.button>
        </form>
      </div>
        <div className='px-8 py-4 bg-gray-900/50 flex justify-center'>
        <p className='text-sm text-gray-400'>Already have an account? <Link to={"/login"} className='text-blue-400 hover:underline'>Login</Link></p>
        </div>
    </motion.div>
  );
};
