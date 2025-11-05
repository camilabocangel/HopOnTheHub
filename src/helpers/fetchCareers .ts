import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { Career } from "@/types/types";

export const fetchCareers = async (): Promise<Career[]> => {
  try {
    const careersRef = collection(db, "careers");
    const snapshot = await getDocs(careersRef);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Career[];
  } catch (error) {
    console.error("Error fetching careers:", error);
    return [];
  }
};
