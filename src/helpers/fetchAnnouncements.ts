import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { Announcement } from "@/types/types";

export const fetchAllAnnouncements = async (): Promise<Announcement[]> => {
  try {
    const announcementsRef = collection(db, "announcements");
    const snapshot = await getDocs(announcementsRef);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Announcement[];
  } catch (error) {
    console.error("Error fetching all announcements:", error);
    return [];
  }
};

export const fetchAnnouncementsByCampus = async (campus: string): Promise<Announcement[]> => {
  try {
    const announcementsRef = collection(db, "announcements");
    const q = query(announcementsRef, where("campus", "array-contains", campus));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Announcement[];
  } catch (error) {
    console.error(`Error fetching announcements for campus ${campus}:`, error);
    return [];
  }
};