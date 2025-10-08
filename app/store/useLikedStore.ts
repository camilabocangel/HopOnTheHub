import { create } from "zustand";

type LikesState = {
  likedAnnouncements: number[];
  toggleLike: (id: number) => void;
  isLiked: (id: number) => boolean;
  addLike: (id: number) => void;
  removeLike: (id: number) => void;
};

const useLikedStore = create<LikesState>((set, get) => ({
  likedAnnouncements: [],

  toggleLike: (id: number) => {
    set((state) => {
      const isCurrentlyLiked = state.likedAnnouncements.includes(id);
      if (isCurrentlyLiked) {
        return {
          likedAnnouncements: state.likedAnnouncements.filter(
            (item) => item !== id
          ),
        };
      } else {
        return {
          likedAnnouncements: [...state.likedAnnouncements, id],
        };
      }
    });
  },

  isLiked: (id: number) => {
    return get().likedAnnouncements.includes(id);
  },

  addLike: (id: number) => {
    set((state) => {
      if (!state.likedAnnouncements.includes(id)) {
        return {
          likedAnnouncements: [...state.likedAnnouncements, id],
        };
      }
      return state;
    });
  },

  removeLike: (id: number) => {
    set((state) => ({
      likedAnnouncements: state.likedAnnouncements.filter(
        (item) => item !== id
      ),
    }));
  },
}));

export default useLikedStore;
