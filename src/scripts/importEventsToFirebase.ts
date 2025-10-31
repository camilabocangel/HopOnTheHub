import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import events from "@/data/events";

const DEFAULT_CAMPUS_COORDINATES = {
  "La Paz": { lat: -16.575086023174308, lng: -68.12665110963786 },
  Cochabamba: { lat: -17.39812308534289, lng: -66.21836160542453 },
  "Santa Cruz": { lat: -17.819356242415207, lng: -63.23365145975613 },
};

const eventsData = events;

export const importEventsToFirebase = async () => {
  try {
    console.log("Importando eventos a Firebase...");

    for (const event of eventsData) {
      const eventId = `event-${event.id}`;

      let locations = event.locations;

      if (!locations || locations.length === 0) {
        locations = event.campus.map((campusName: string) => {
          return (
            DEFAULT_CAMPUS_COORDINATES[
              campusName as keyof typeof DEFAULT_CAMPUS_COORDINATES
            ] || DEFAULT_CAMPUS_COORDINATES["La Paz"]
          );
        });
      }

      const eventData = {
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
        modality: event.modality || "Presencial",
        locations: locations,
        attendees: [],
        likes: [],
        createdAt: new Date(),
        createdBy: "system",
      };

      await setDoc(doc(db, "events", eventId), eventData);
      console.log(`Evento importado: ${event.title}`);
    }

    console.log("Todos los eventos importados exitosamente");
  } catch (error) {
    console.error("Error importando eventos:", error);
  }
};
