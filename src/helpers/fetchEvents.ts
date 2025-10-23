import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { Event } from "@/types/types";

export const fetchAcceptedEvents = async (campus?: string): Promise<Event[]> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const eventsRef = collection(db, "events");
    
    let q;
    if (campus) {
      q = query(
        eventsRef,
        where("status", "==", "accepted"),
        where("campus", "array-contains", campus),
        where("date", ">=", today),
        orderBy("date", "asc")
      );
    } else {
      q = query(
        eventsRef,
        where("status", "==", "accepted"),
        where("date", ">=", today),
        orderBy("date", "asc")
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    } as Event));
  } catch (error) {
    console.error("Error fetching accepted events:", error);
    return [];
  }
};

export const fetchPendingEvents = async (): Promise<Event[]> => {
  try {
    const eventsRef = collection(db, "events");
    const q = query(
      eventsRef,
      where("status", "==", "pending"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    } as Event));
  } catch (error) {
    console.error("Error fetching pending events:", error);
    return [];
  }
};

export const fetchEventsByCampus = async (campus: string): Promise<Event[]> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const eventsRef = collection(db, "events");
    const q = query(
      eventsRef,
      where("status", "==", "accepted"),
      where("campus", "array-contains", campus),
      where("date", ">=", today),
      orderBy("date", "asc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    } as Event));
  } catch (error) {
    console.error(`Error fetching events for campus ${campus}:`, error);
    return [];
  }
};