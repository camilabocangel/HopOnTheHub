import { useState, useEffect, useCallback } from "react";
import { fetchAllEvents, fetchEventsByCampus } from "@/helpers/fetchEvents";
import { Event } from "@/types/types";

export const useEvents = (campus?: string) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const eventsData = campus 
        ? await fetchEventsByCampus(campus)
        : await fetchAllEvents();
        
      setEvents(eventsData);
    } catch (err) {
      setError("Error al cargar los eventos");
      console.error("Error loading events:", err);
    } finally {
      setLoading(false);
    }
  }, [campus]);

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