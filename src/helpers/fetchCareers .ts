import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export const fetchCareers = async () => {
  const careersRef = collection(db, "careers");
  const snapshot = await getDocs(careersRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
