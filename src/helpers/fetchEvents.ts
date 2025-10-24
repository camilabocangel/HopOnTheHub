import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  documentId,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { Event } from "@/types/types";
import { updateExpiredContentStatus } from "@/services/statusUpdateService";

export const fetchAcceptedEvents = async (
  campus?: string
): Promise<Event[]> => {
  await updateExpiredContentStatus();

  try {
    const today = new Date().toISOString().split("T")[0];
    const eventsRef = collection(db, "events");

    let q;
    if (campus) {
      q = query(
        eventsRef,
        where("status", "==", "accepted"),
        where("campus", "array-contains", campus),
        where("date", ">=", today),
        orderBy("date", "asc")
      );
    } else {
      q = query(
        eventsRef,
        where("status", "==", "accepted"),
        where("date", ">=", today),
        orderBy("date", "asc")
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Event)
    );
  } catch (error) {
    console.error("Error fetching accepted events:", error);
    return [];
  }
};

export const fetchPendingEvents = async (): Promise<Event[]> => {
  await updateExpiredContentStatus();

  try {
    const eventsRef = collection(db, "events");
    const q = query(
      eventsRef,
      where("status", "==", "pending"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Event)
    );
  } catch (error) {
    console.error("Error fetching pending events:", error);
    return [];
  }
};

export const fetchEventsByCampus = async (campus: string): Promise<Event[]> => {
  await updateExpiredContentStatus();

  try {
    const today = new Date().toISOString().split("T")[0];
    const eventsRef = collection(db, "events");
    const q = query(
      eventsRef,
      where("status", "==", "accepted"),
      where("campus", "array-contains", campus),
      where("date", ">=", today),
      orderBy("date", "asc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Event)
    );
  } catch (error) {
    console.error(`Error fetching events for campus ${campus}:`, error);
    return [];
  }
};
export const fetchEventsByIds = async (
  eventIds: string[]
): Promise<Event[]> => {
  await updateExpiredContentStatus();

  try {
    if (!eventIds.length) return [];

    const eventsRef = collection(db, "events");
    const q = query(
      eventsRef,
      where("status", "==", "accepted"),
      where("__name__", "in", eventIds.slice(0, 30))
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Event)
    );
  } catch (error) {
    console.error("Error fetching events by IDs:", error);
    return [];
  }
};

export const fetchAllEventsByIds = async (
  eventIds: string[]
): Promise<Event[]> => {
  await updateExpiredContentStatus();

  try {
    if (!eventIds.length) return [];

    const eventsRef = collection(db, "events");

    const firestoreIds = eventIds.map((id) => `event-${id}`);

    if (firestoreIds.length <= 10) {
      const q = query(eventsRef, where(documentId(), "in", firestoreIds));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Event)
      );
    } else {
      const batches = [];
      for (let i = 0; i < firestoreIds.length; i += 10) {
        const batch = firestoreIds.slice(i, i + 10);
        const q = query(eventsRef, where(documentId(), "in", batch));
        batches.push(getDocs(q));
      }

      const snapshots = await Promise.all(batches);
      const events: Event[] = [];
      snapshots.forEach((snapshot) => {
        snapshot.docs.forEach((doc) => {
          events.push({
            id: doc.id,
            ...doc.data(),
          } as Event);
        });
      });
      return events;
    }
  } catch (error) {
    console.error("Error fetching events by IDs:", error);
    return [];
  }
};
