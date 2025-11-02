import { useState, useEffect, useCallback } from "react";
import { fetchRejectedEvents } from "@/helpers/fetchEvents";
import { Event } from "@/types/types";

export const useRejectedEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const eventsData = await fetchRejectedEvents();
      setEvents(eventsData);
    } catch (err) {
      setError("Error al cargar los eventos rechazados");
      console.error("Error loading rejected events:", err);
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
    refetch: loadEvents,
  };
};