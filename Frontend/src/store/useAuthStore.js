import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set)=> ({
    authUser:null,
    isSigningUp: false,
    isLoggingIn:false,
    isUpdatingprofile: false,

    isCheckingAuth: true,
    checkAuth: async()=>{
        try {
            const re = await axiosInstance.get("/auth/check");

            set({authUser:res.data})
        } catch (error) {
            console.log("error in checkAuth:",error);
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false});
        }
    }
}));