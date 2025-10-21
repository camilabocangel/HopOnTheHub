import { create } from "zustand";

interface User {
  id: number;
  userName: string;
  password: string;
  name: string;
  lastName: string;
  secondLastName: string;
  birthday: string;
  picture: string;
  campus: string;
  career: string;
  semester: number;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
