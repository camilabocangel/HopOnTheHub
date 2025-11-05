import { useState, useEffect, useCallback } from "react";
import { fetchPendingAnnouncements } from "@/helpers/fetchAnnouncements";
import { Announcement } from "@/types/types";

export const usePendingAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAnnouncements = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const announcementsData = await fetchPendingAnnouncements();
      setAnnouncements(announcementsData);
    } catch (err) {
      setError("Error al cargar los anuncios pendientes");
      console.error("Error loading pending announcements:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  return {
    announcements,
    loading,
    error,
    refetch: loadAnnouncements
  };
};