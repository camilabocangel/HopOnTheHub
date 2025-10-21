import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export interface Career {
  id: string;
  name: string;
}

export const fetchCareers = async (): Promise<Career[]> => {
  try {
    const careersRef = collection(db, "careers");
    const snapshot = await getDocs(careersRef);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));
  } catch (error) {
    console.error("Error fetching careers:", error);
    return [];
  }
};
