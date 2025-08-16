import { create } from "zustand";
import axios from "axios";
const API_URL = import.meta.env.VITE_API;
export const useAdminAuth = create((set, get) => ({
  isAuth: false,

  checkAuth: async (body) => {
    try {
      console.log("Sending auth request with:", body);

      const response = await axios.post(
        `${API_URL}admin`,
        body
      );

      console.log("Server response:", response.data);
      set({isAuth:true})
      return response.data; 
    } catch (error) {
      console.error("Auth request failed:", error.message);
      

      // If axios provides a server error response, log it
      if (error.response) {
        console.error("Server error:", error.response.data);
        throw error.response.data;
      } else {
        throw { error: "Unable to connect to server" };
      }
    }
  },
}));

export default useAdminAuth;
