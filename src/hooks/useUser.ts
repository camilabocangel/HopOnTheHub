// src/hooks/useUser.ts
import { useFirestoreUser } from "./useFirestoreUser";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";

export const useUser = () => {
  const { user, loading, error } = useFirestoreUser();

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const setUser = () => {
    console.warn("setUser no está disponible con Firebase");
  };

  return { 
    user, 
    setUser, 
    logout,
    loading,
    error 
  };
};