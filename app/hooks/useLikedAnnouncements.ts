import useLikedStore from "../store/useLikedStore";

const useLikedAnnouncements = () => {
  const likedAnnouncements = useLikedStore(
    (state: { likedAnnouncements: any }) => state.likedAnnouncements
  );
  const toggleLike = useLikedStore(
    (state: { toggleLike: any }) => state.toggleLike
  );
  const isLiked = useLikedStore((state: { isLiked: any }) => state.isLiked);
  const addLike = useLikedStore((state: { addLike: any }) => state.addLike);
  const removeLike = useLikedStore(
    (state: { removeLike: any }) => state.removeLike
  );

  return {
    likedAnnouncements,
    toggleLike,
    isLiked,
    addLike,
    removeLike,
  };
};

export default useLikedAnnouncements;
