import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";
axios.defaults.withCredentials = true;

interface User {
  email: string;
  name: string;
  userName: string;
  isVerified: boolean;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  signUp: (
    email: string,
    password: string,
    name: string,
    userName: string
  ) => Promise<void>;
  emailVerify: (code: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  login: (userName: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signUp: async (
    email: string,
    password: string,
    name: string,
    userName: string
  ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        userName,
        name,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: unknown) {
      console.log(error);
      let erroMessage = "signup failed";
      if (axios.isAxiosError(error)) {
        erroMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        erroMessage = error.message;
      } else {
        erroMessage = "something error in your code";
      }
      set({
        error: erroMessage,
        isLoading: false,
      });
      throw new Error(erroMessage);
    }
  },

  emailVerify: async (code: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/otpverify`, {
        code,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: unknown) {
      console.log(error);
      let erroMessage = "signup failed";
      if (axios.isAxiosError(error)) {
        erroMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        erroMessage = error.message;
      } else {
        erroMessage = "something error in your code";
      }
      set({
        error: erroMessage,
        isLoading: false,
      });
      throw new Error(erroMessage);
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/checkauth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      let erroMessage = "signup failed";
      if (axios.isAxiosError(error)) {
        erroMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        erroMessage = error.message;
      } else {
        erroMessage = "something error in your code";
      }
      set({
        error: erroMessage,
        isLoading: false,
        isCheckingAuth: false,
        isAuthenticated: false,
      });
      throw new Error(erroMessage);
    }
  },
  login: async(userName: string, password: string)=>{
    set({isLoading: true, error: null})
    try{
      const response = await axios.post(`${API_URL}/login`,{
        userName, password
      })
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false
      })
    }catch(error){
      console.log(error);
      let erroMessage = "signup failed";
      if (axios.isAxiosError(error)) {
        erroMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        erroMessage = error.message;
      } else {
        erroMessage = "something error in your code";
      }
      set({
        error: erroMessage,
        isLoading: false,
      });
      throw new Error(erroMessage);
    }
  },
  logout: async()=>{
    set({isLoading: true, error: null})
    try{
      await axios.post(`${API_URL}/logout`)
      set({user: null, isAuthenticated: false, error: null, isLoading: false})
    }catch(error){
      console.log(error);
      let erroMessage = "signup failed";
      if (axios.isAxiosError(error)) {
        erroMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        erroMessage = error.message;
      } else {
        erroMessage = "something error in your code";
      }
      set({
        error: erroMessage,
        isLoading: false,
      });
      throw new Error(erroMessage);
    }
  }
}));
