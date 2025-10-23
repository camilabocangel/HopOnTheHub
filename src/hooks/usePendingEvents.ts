import { useState, useEffect, useCallback } from "react";
import { fetchPendingEvents } from "@/helpers/fetchEvents";
import { Event } from "@/types/types";

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

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return {
    events,
    loading,
    error,
    refetch: loadEvents
  };
};