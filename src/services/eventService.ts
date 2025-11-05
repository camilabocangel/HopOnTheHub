import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export const updateEventStatus = async (eventId: string, status: "accepted" | "rejected" | "passed"): Promise<boolean> => {
  try {
    const formattedEventId = eventId.startsWith('event-') ? eventId : `event-${eventId}`;
    
    const eventRef = doc(db, "events", formattedEventId);
    await updateDoc(eventRef, {
      status: status,
      updatedAt: new Date()
    });
    
    console.log(`Evento ${formattedEventId} actualizado a status: ${status}`);
    return true;
  } catch (error) {
    console.error("Error updating event status:", error);
    return false;
  }
};