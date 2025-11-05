import { useFirestoreUser } from "./useFirestoreUser";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { updateUserPhoto as updateUserPhotoService } from "@/services/userService";

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

  const updateUserPhoto = async (uid: string, photoUrl: string) => {
    return updateUserPhotoService(uid, photoUrl);
  };

  return {
    user,
    setUser,
    logout,
    updateUserPhoto,
    loading,
    error,
  };
};
