import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export const toggleAnnouncementLike = async (
  userId: string,
  announcementId: string,
  isCurrentlyLiked: boolean
) => {
  try {
    const userRef = doc(db, "users", userId);

    if (isCurrentlyLiked) {
      await updateDoc(userRef, {
        likedAnnouncements: arrayRemove(announcementId),
      });
    } else {
      await updateDoc(userRef, {
        likedAnnouncements: arrayUnion(announcementId),
      });
    }

    return true;
  } catch (error) {
    console.error("Error toggling announcement like:", error);
    return false;
  }
};

export const toggleEventLike = async (
  userId: string,
  eventId: string,
  isCurrentlyLiked: boolean
) => {
  try {
    const userRef = doc(db, "users", userId);

    if (isCurrentlyLiked) {
      await updateDoc(userRef, {
        likedEvents: arrayRemove(eventId),
      });
    } else {
      await updateDoc(userRef, {
        likedEvents: arrayUnion(eventId),
      });
    }

    return true;
  } catch (error) {
    console.error("Error toggling event like:", error);
    return false;
  }
};
