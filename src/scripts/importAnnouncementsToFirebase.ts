import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import announcements from "@/data/announcements";

const announcementsData = announcements;

export const importAnnouncementsToFirebase = async () => {
  try {
    console.log("Importando anuncios a Firebase...");
    
    for (const announcement of announcementsData) {
      const announcementId = `announcement-${announcement.id}`;
      
      await setDoc(doc(db, "announcements", announcementId), {
        id: announcement.id,
        status: announcement.status || "accepted",
        image: announcement.image,
        description: announcement.description,
        date: announcement.date,
        campus: announcement.campus,
        content: announcement.content,
        likes: [],
        createdAt: new Date()
      });
      
      console.log(`Anuncio importado: ${announcement.description.substring(0, 50)}...`);
    }
    
    console.log("Todos los anuncios importados exitosamente");
  } catch (error) {
    console.error("Error importando anuncios:", error);
  }
};