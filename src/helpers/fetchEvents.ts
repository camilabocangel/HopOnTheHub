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
export const fetchEventsByIds = async (eventIds: string[]): Promise<Event[]> => {
  try {
    if (!eventIds.length) return [];

    const eventsRef = collection(db, "events");
    const q = query(
      eventsRef,
      where("status", "==", "accepted"),
      where("__name__", "in", eventIds.slice(0, 30)) 
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    } as Event));
  } catch (error) {
    console.error("Error fetching events by IDs:", error);
    return [];
  }
};

export const fetchAllEventsByIds = async (eventIds: string[]): Promise<Event[]> => {
  try {
    if (!eventIds.length) return [];

    const batches = [];
    for (let i = 0; i < eventIds.length; i += 30) {
      const batch = eventIds.slice(i, i + 30);
      if (batch.length > 0) {
        batches.push(fetchEventsByIds(batch));
      }
    }

    const results = await Promise.all(batches);
    return results.flat();
  } catch (error) {
    console.error("Error fetching all events by IDs:", error);
    return [];
  }
};