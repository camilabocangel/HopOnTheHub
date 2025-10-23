import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export const getNextEventId = async (): Promise<number> => {
  try {
    const eventsRef = collection(db, "events");

    const q = query(eventsRef, orderBy("id", "desc"), limit(1));

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return 1;
    }

    const lastEvent = snapshot.docs[0].data();
    const lastId = lastEvent.id;

    if (typeof lastId === "number") {
      return lastId + 1;
    } else {
      const allEvents = await getDocs(eventsRef);
      return allEvents.size + 1;
    }
  } catch (error) {
    console.error("Error getting next event ID:", error);
    const snapshot = await getDocs(collection(db, "events"));
    return snapshot.size + 1;
  }
};
