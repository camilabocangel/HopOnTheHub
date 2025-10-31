import { useState, useEffect, useCallback } from "react";
import { fetchPendingEvents } from "@/helpers/fetchEvents";
import { updateEventStatus as updateEventStatusService } from "@/services/eventService";
import { Event } from "@/types/types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export const usePendingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const eventsData = await fetchPendingEvents();
      setEvents(eventsData);
    } catch (err) {
      setError("Error al cargar los eventos pendientes");
      console.error("Error loading pending events:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEventStatus = useCallback(
    async (eventId: string, newStatus: "accepted" | "rejected") => {
      try {
        const success = await updateEventStatusService(eventId, newStatus);

        if (success) {
          setEvents((prevEvents) =>
            prevEvents.filter((event) => event.id !== eventId)
          );
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error("Error updating event status:", error);
        return false;
      }
    },
    []
  );

  const updateEvent = useCallback(async (eventId: string, updatedData: Partial<Event>) => {
  try {
    const formattedEventId = eventId.startsWith('event-') ? eventId : `event-${eventId}`;
    const eventRef = doc(db, "events", formattedEventId);
    
    await updateDoc(eventRef, {
      ...updatedData,
      updatedAt: new Date()
    });

    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId ? { ...event, ...updatedData } : event
      )
    );
    
    return true;
  } catch (error) {
    console.error("Error updating event:", error);
    return false;
  }
}, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return {
    events,
    loading,
    error,
    refetch: loadEvents,
    updateEventStatus,
    updateEvent
  };
};
