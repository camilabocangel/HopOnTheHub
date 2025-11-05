import { useState, useEffect, useCallback } from "react";
import { fetchHiddenAnnouncements } from "@/helpers/fetchAnnouncements";
import { Announcement } from "@/types/types";

export const useHiddenAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAnnouncements = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const announcementsData = await fetchHiddenAnnouncements();
      setAnnouncements(announcementsData);
    } catch (err) {
      setError("Error al cargar los anuncios ocultos");
      console.error("Error loading hidden announcements:", err);
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
    refetch: loadAnnouncements,
  };
};