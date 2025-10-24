import { useState, useEffect } from 'react';
import { useUser } from './useUser';
import { fetchAllEventsByIds } from '@/helpers/fetchEvents';
import { fetchAllAnnouncementsByIds } from '@/helpers/fetchAnnouncements';
import { Event, Announcement } from '@/types/types';

export const useFavorites = () => {
  const { user } = useUser();
  const [favoriteEvents, setFavoriteEvents] = useState<Event[]>([]);
  const [favoriteAnnouncements, setFavoriteAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setFavoriteEvents([]);
        setFavoriteAnnouncements([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch favorite events
        const likedEvents = user.likedEvents || [];
        const events = await fetchAllEventsByIds(likedEvents);
        setFavoriteEvents(events);

        // Fetch favorite announcements
        const likedAnnouncements = user.likedAnnouncements || [];
        const announcements = await fetchAllAnnouncementsByIds(likedAnnouncements);
        setFavoriteAnnouncements(announcements);
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

  const refreshFavorites = async () => {
    if (!user) return;
    
    try {
      const likedEvents = user.likedEvents || [];
      const events = await fetchAllEventsByIds(likedEvents);
      setFavoriteEvents(events);

      const likedAnnouncements = user.likedAnnouncements || [];
      const announcements = await fetchAllAnnouncementsByIds(likedAnnouncements);
      setFavoriteAnnouncements(announcements);
    } catch (error) {
      console.error('Error refreshing favorites:', error);
    }
  };

  return {
    favoriteEvents,
    favoriteAnnouncements,
    loading,
    refreshFavorites,
    hasFavorites: favoriteEvents.length > 0 || favoriteAnnouncements.length > 0
  };
};