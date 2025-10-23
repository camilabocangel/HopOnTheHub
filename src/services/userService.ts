import { doc, setDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { auth, db } from "@/config/firebaseConfig";
import { User } from "@/types/types";

export const updateUserByUid = async (uid: string, userData: Partial<User>) => {
  try {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, userData, { merge: true });
    return true;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const updateUserPhoto = async (uid: string, photoUrl: string) => {
  try {
    await updateUserByUid(uid, { picture: photoUrl });

    const currentUser = auth.currentUser;
    if (currentUser && currentUser.uid === uid) {
      await updateProfile(currentUser, {
        photoURL: photoUrl,
      });
    }

    return true;
  } catch (error) {
    console.error("Error updating user photo:", error);
    throw error;
  }
};

