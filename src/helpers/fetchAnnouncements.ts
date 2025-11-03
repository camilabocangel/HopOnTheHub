import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  documentId,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { Announcement } from "@/types/types";
import { updateExpiredContentStatus } from "@/services/statusUpdateService";

export const fetchAcceptedAnnouncements = async (
  campus?: string
): Promise<Announcement[]> => {
  await updateExpiredContentStatus();

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
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Announcement)
    );
  } catch (error) {
    console.error("Error fetching accepted announcements:", error);
    return [];
  }
};

export const fetchPendingAnnouncements = async (): Promise<Announcement[]> => {
  await updateExpiredContentStatus();

  try {
    const announcementsRef = collection(db, "announcements");
    const q = query(
      announcementsRef,
      where("status", "==", "pending"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Announcement)
    );
  } catch (error) {
    console.error("Error fetching pending announcements:", error);
    return [];
  }
};

export const fetchAnnouncementsByCampus = async (
  campus: string
): Promise<Announcement[]> => {
  await updateExpiredContentStatus();

  try {
    const announcementsRef = collection(db, "announcements");
    const q = query(
      announcementsRef,
      where("status", "==", "accepted"),
      where("campus", "array-contains", campus),
      orderBy("date", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Announcement)
    );
  } catch (error) {
    console.error(`Error fetching announcements for campus ${campus}:`, error);
    return [];
  }
};
export const fetchAnnouncementsByIds = async (
  announcementIds: string[]
): Promise<Announcement[]> => {
  await updateExpiredContentStatus();

  try {
    if (!announcementIds.length) return [];

    const announcementsRef = collection(db, "announcements");
    const q = query(
      announcementsRef,
      where("status", "==", "accepted"),
      where("__name__", "in", announcementIds.slice(0, 30))
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Announcement)
    );
  } catch (error) {
    console.error("Error fetching announcements by IDs:", error);
    return [];
  }
};

export const fetchAllAnnouncementsByIds = async (
  announcementIds: string[]
): Promise<Announcement[]> => {
  await updateExpiredContentStatus();

  try {
    if (!announcementIds.length) return [];

    const announcementsRef = collection(db, "announcements");

    const firestoreIds = announcementIds.map((id) => `announcement-${id}`);

    if (firestoreIds.length <= 10) {
      const q = query(
        announcementsRef,
        where(documentId(), "in", firestoreIds)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Announcement)
      );
    } else {
      const batches = [];
      for (let i = 0; i < firestoreIds.length; i += 10) {
        const batch = firestoreIds.slice(i, i + 10);
        const q = query(announcementsRef, where(documentId(), "in", batch));
        batches.push(getDocs(q));
      }

      const snapshots = await Promise.all(batches);
      const announcements: Announcement[] = [];
      snapshots.forEach((snapshot) => {
        snapshot.docs.forEach((doc) => {
          announcements.push({
            id: doc.id,
            ...doc.data(),
          } as Announcement);
        });
      });
      return announcements;
    }
  } catch (error) {
    console.error("Error fetching announcements by IDs:", error);
    return [];
  }
};

export const fetchRejectedAnnouncements = async (): Promise<Announcement[]> => {
  await updateExpiredContentStatus();

  try {
    const announcementsRef = collection(db, "announcements");
    const q = query(
      announcementsRef,
      where("status", "==", "rejected"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Announcement)
    );
  } catch (error) {
    console.error("Error fetching rejected announcements:", error);
    return [];
  }
};

export const fetchHiddenAnnouncements = async (): Promise<Announcement[]> => {
  await updateExpiredContentStatus();

  try {
    const announcementsRef = collection(db, "announcements");
    const q = query(
      announcementsRef,
      where("status", "==", "hidden"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Announcement)
    );
  } catch (error) {
    console.error("Error fetching hidden announcements:", error);
    return [];
  }
};
