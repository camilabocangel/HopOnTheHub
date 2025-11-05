import { useState, useEffect, useCallback } from "react";
import { fetchRejectedAnnouncements } from "@/helpers/fetchAnnouncements";
import { Announcement } from "@/types/types";

export const useRejectedAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAnnouncements = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const announcementsData = await fetchRejectedAnnouncements();
      setAnnouncements(announcementsData);
    } catch (err) {
      setError("Error al cargar los anuncios rechazados");
      console.error("Error loading rejected announcements:", err);
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