import { useState, useEffect, useCallback } from "react";
import { fetchAcceptedAnnouncements, fetchAnnouncementsByCampus } from "@/helpers/fetchAnnouncements";
import { Announcement } from "@/types/types";

export const useAnnouncements = (campus?: string) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAnnouncements = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const announcementsData = campus 
        ? await fetchAnnouncementsByCampus(campus)
        : await fetchAcceptedAnnouncements();
        
      setAnnouncements(announcementsData);
    } catch (err) {
      setError("Error al cargar los anuncios");
      console.error("Error loading announcements:", err);
    } finally {
      setLoading(false);
    }
  }, [campus]);

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