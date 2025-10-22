// src/hooks/useLikes.ts
import { useUser } from "./useUser";
import { toggleAnnouncementLike, toggleEventLike } from "@/helpers/likeHelpers";

export const useLikes = () => {
  const { user } = useUser();

  const isAnnouncementLiked = (announcementId: string): boolean => {
    return user?.likedAnnouncements?.includes(announcementId) || false;
  };

  const isEventLiked = (eventId: string): boolean => {
    return user?.likedEvents?.includes(eventId) || false;
  };

  const toggleAnnouncementLikeStatus = async (
    announcementId: string
  ): Promise<boolean> => {
    if (!user) return false;

    const isCurrentlyLiked = isAnnouncementLiked(announcementId);
    return await toggleAnnouncementLike(
      user.id,
      announcementId,
      isCurrentlyLiked
    );
  };

  const toggleEventLikeStatus = async (eventId: string): Promise<boolean> => {
    if (!user) return false;

    const isCurrentlyLiked = isEventLiked(eventId);
    return await toggleEventLike(user.id, eventId, isCurrentlyLiked);
  };

  return {
    isAnnouncementLiked,
    isEventLiked,
    toggleAnnouncementLikeStatus,
    toggleEventLikeStatus,
    userLikedAnnouncements: user?.likedAnnouncements || [],
    userLikedEvents: user?.likedEvents || [],
  };
};
