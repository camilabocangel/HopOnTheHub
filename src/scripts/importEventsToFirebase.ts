import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import events from "@/data/events";

const eventsData = events;

export const importEventsToFirebase = async () => {
  try {
    console.log("Importando eventos a Firebase...");
    
    for (const event of eventsData) {
      const eventId = `event-${event.id}`;
      
      await setDoc(doc(db, "events", eventId), {
        id: event.id,
        status: event.status || "accepted",
        title: event.title,
        date: event.date,
        time: event.time,
        campus: event.campus,
        place: event.place,
        category: event.category,
        description: event.description,
        image: event.image,
        content: event.content,
        attendees: [],
        likes: [],
        createdAt: new Date()
      });
      
      console.log(`Evento importado: ${event.title}`);
    }
    
    console.log("Todos los eventos importados exitosamente");
  } catch (error) {
    console.error("Error importando eventos:", error);
  }
};