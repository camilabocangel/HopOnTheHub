// helpers/announcementIdGenerator.ts
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export const getNextAnnouncementId = async (): Promise<number> => {
  try {
    const announcementsRef = collection(db, "announcements");

    const q = query(announcementsRef, orderBy("id", "desc"), limit(1));

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return 1;
    }

    const lastAnnouncement = snapshot.docs[0].data();
    const lastId = lastAnnouncement.id;

    if (typeof lastId === "number") {
      return lastId + 1;
    } else {
      const allAnnouncements = await getDocs(announcementsRef);
      return allAnnouncements.size + 1;
    }
  } catch (error) {
    console.error("Error getting next announcement ID:", error);
    const snapshot = await getDocs(collection(db, "announcements"));
    return snapshot.size + 1;
  }
};