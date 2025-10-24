import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { Announcement } from "@/types/types";

export const fetchAcceptedAnnouncements = async (campus?: string): Promise<Announcement[]> => {
  try {
    const announcementsRef = collection(db, "announcements");
    
    let q;
    if (campus) {
      q = query(
        announcementsRef,
        where("status", "==", "accepted"),
        where("campus", "array-contains", campus),
        orderBy("date", "desc")
      );
    } else {
      q = query(
        announcementsRef,
        where("status", "==", "accepted"),
        orderBy("date", "desc")
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    } as Announcement));
  } catch (error) {
    console.error("Error fetching accepted announcements:", error);
    return [];
  }
};

export const fetchPendingAnnouncements = async (): Promise<Announcement[]> => {
  try {
    const announcementsRef = collection(db, "announcements");
    const q = query(
      announcementsRef,
      where("status", "==", "pending"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    } as Announcement));
  } catch (error) {
    console.error("Error fetching pending announcements:", error);
    return [];
  }
};

export const fetchAnnouncementsByCampus = async (campus: string): Promise<Announcement[]> => {
  try {
    const announcementsRef = collection(db, "announcements");
    const q = query(
      announcementsRef,
      where("status", "==", "accepted"),
      where("campus", "array-contains", campus),
      orderBy("date", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    } as Announcement));
  } catch (error) {
    console.error(`Error fetching announcements for campus ${campus}:`, error);
    return [];
  }
};
export const fetchAnnouncementsByIds = async (announcementIds: string[]): Promise<Announcement[]> => {
  try {
    if (!announcementIds.length) return [];

    const announcementsRef = collection(db, "announcements");
    const q = query(
      announcementsRef,
      where("status", "==", "accepted"),
      where("__name__", "in", announcementIds.slice(0, 30))
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    } as Announcement));
  } catch (error) {
    console.error("Error fetching announcements by IDs:", error);
    return [];
  }
};

export const fetchAllAnnouncementsByIds = async (announcementIds: string[]): Promise<Announcement[]> => {
  try {
    if (!announcementIds.length) return [];

    const batches = [];
    for (let i = 0; i < announcementIds.length; i += 30) {
      const batch = announcementIds.slice(i, i + 30);
      if (batch.length > 0) {
        batches.push(fetchAnnouncementsByIds(batch));
      }
    }

    const results = await Promise.all(batches);
    return results.flat();
  } catch (error) {
    console.error("Error fetching all announcements by IDs:", error);
    return [];
  }
};