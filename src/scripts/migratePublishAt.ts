import { collection, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export const migrateExistingData = async (): Promise<void> => {
  try {
    console.log("Iniciando migración de datos existentes...");
    
    const announcementsRef = collection(db, "announcements");
    const announcementsSnapshot = await getDocs(announcementsRef);
    
    const announcementPromises = announcementsSnapshot.docs.map(async (announcementDoc) => {
      const data = announcementDoc.data();
      if (!data.publishAt) {
        const publishDate = new Date(data.date);
        await updateDoc(doc(db, "announcements", announcementDoc.id), {
          publishAt: Timestamp.fromDate(publishDate)
        });
        console.log(`Anuncio ${announcementDoc.id} actualizado con publishAt`);
      }
    });
    
    const eventsRef = collection(db, "events");
    const eventsSnapshot = await getDocs(eventsRef);
    
    const eventPromises = eventsSnapshot.docs.map(async (eventDoc) => {
      const data = eventDoc.data();
      if (!data.publishAt) {
        const [year, month, day] = data.date.split('-').map(Number);
        const [hours, minutes] = data.time.split(':').map(Number);
        const publishDate = new Date(year, month - 1, day, hours, minutes);
        
        await updateDoc(doc(db, "events", eventDoc.id), {
          publishAt: Timestamp.fromDate(publishDate)
        });
        console.log(`Evento ${eventDoc.id} actualizado con publishAt`);
      }
    });
    
    await Promise.all([...announcementPromises, ...eventPromises]);
    console.log("Migración completada exitosamente");
    
  } catch (error) {
    console.error("Error en migración:", error);
  }
};