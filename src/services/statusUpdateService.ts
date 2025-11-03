import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export const updateExpiredContentStatus = async (): Promise<void> => {
  try {
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    const eventsRef = collection(db, "events");
    const eventsQuery = query(
      eventsRef,
      where("status", "in", ["accepted", "pending", "rejected"])
    );

    const eventsSnapshot = await getDocs(eventsQuery);
    const eventUpdatePromises = eventsSnapshot.docs.map(async (eventDoc) => {
      const eventData = eventDoc.data();

      const [year, month, day] = eventData.date.split("-").map(Number);
      const [hours, minutes] = eventData.time.split(":").map(Number);
      const eventDateTime = new Date(year, month - 1, day, hours, minutes);

      if (eventDateTime < now && eventData.status !== "passed") {
        await updateDoc(doc(db, "events", eventDoc.id), {
          status: "passed",
          updatedAt: new Date(),
        });
        console.log(`Evento ${eventDoc.id} actualizado a "passed"`);
      }
    });

    const announcementsRef = collection(db, "announcements");
    const announcementsQuery = query(
      announcementsRef,
      where("status", "in", ["accepted", "pending", "rejected"])
    );

    const announcementsSnapshot = await getDocs(announcementsQuery);
    const announcementUpdatePromises = announcementsSnapshot.docs.map(
      async (announcementDoc) => {
        const announcementData = announcementDoc.data();

        const [year, month, day] = announcementData.date.split("-").map(Number);
        const announcementDate = new Date(year, month - 1, day);
        const todayDate = new Date(today);

        if (
          announcementDate < todayDate &&
          announcementData.status !== "passed"
        ) {
          await updateDoc(doc(db, "announcements", announcementDoc.id), {
            status: "passed",
            updatedAt: new Date(),
          });
          console.log(`Anuncio ${announcementDoc.id} actualizado a "passed"`);
        }
      }
    );

    await Promise.all([...eventUpdatePromises, ...announcementUpdatePromises]);
    console.log("Actualización de status completada");
  } catch (error) {
    console.error("Error actualizando status de contenido expirado:", error);
    throw error;
  }
};
