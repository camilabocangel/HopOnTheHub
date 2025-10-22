import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { Event } from "@/types/types";

export const fetchAllEvents = async (): Promise<Event[]> => {
  try {
    const eventsRef = collection(db, "events");
    const snapshot = await getDocs(eventsRef);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Event[];
  } catch (error) {
    console.error("Error fetching all events:", error);
    return [];
  }
};

export const fetchEventsByCampus = async (campus: string): Promise<Event[]> => {
  try {
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, where("campus", "array-contains", campus));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Event[];
  } catch (error) {
    console.error(`Error fetching events for campus ${campus}:`, error);
    return [];
  }
};
