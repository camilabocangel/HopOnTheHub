import { useUser } from "./useUser";
import { toggleAnnouncementLike, toggleEventLike } from "@/helpers/likeHelpers";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export const useLikes = () => {
  const { user } = useUser();

  const normalizeId = (id: string | number): string => id.toString();

  const isAnnouncementLiked = (announcementId: string): boolean => {
    const normalizedId = normalizeId(announcementId);
    const userLikedAnnouncements = user?.likedAnnouncements?.map(normalizeId) || [];
    return userLikedAnnouncements.includes(normalizedId);
  };

  const isEventLiked = (eventId: string): boolean => {
    const normalizedId = normalizeId(eventId);
    const userLikedEvents = user?.likedEvents?.map(normalizeId) || [];
    return userLikedEvents.includes(normalizedId);
  };

  const toggleAnnouncementLikeStatus = async (
    announcementId: string
  ): Promise<boolean> => {
    if (!user) return false;

    try {
      const userDocRef = doc(db, "users", user.id);
      const normalizedId = normalizeId(announcementId);
      const isCurrentlyLiked = isAnnouncementLiked(announcementId);

      if (isCurrentlyLiked) {
        const currentLikes = user?.likedAnnouncements || [];
        const updatedLikes = currentLikes.filter(
          id => normalizeId(id) !== normalizedId
        );
        
        await updateDoc(userDocRef, {
          likedAnnouncements: updatedLikes
        });
      } else {
        await updateDoc(userDocRef, {
          likedAnnouncements: arrayUnion(normalizedId)
        });
      }
      
      return true;
    } catch (error) {
      console.error("Error toggling announcement like:", error);
      return false;
    }
  };

  const toggleEventLikeStatus = async (eventId: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const userDocRef = doc(db, "users", user.id);
      const normalizedId = normalizeId(eventId);
      const isCurrentlyLiked = isEventLiked(eventId);

      if (isCurrentlyLiked) {
        const currentLikes = user?.likedEvents || [];
        const updatedLikes = currentLikes.filter(
          id => normalizeId(id) !== normalizedId
        );
        
        await updateDoc(userDocRef, {
          likedEvents: updatedLikes
        });
      } else {
        await updateDoc(userDocRef, {
          likedEvents: arrayUnion(normalizedId)
        });
      }
      
      return true;
    } catch (error) {
      console.error("Error toggling event like:", error);
      return false;
    }
  };

  return {
    isAnnouncementLiked,
    isEventLiked,
    toggleAnnouncementLikeStatus,
    toggleEventLikeStatus,
    userLikedAnnouncements: user?.likedAnnouncements?.map(normalizeId) || [],
    userLikedEvents: user?.likedEvents?.map(normalizeId) || [],
  };
};
