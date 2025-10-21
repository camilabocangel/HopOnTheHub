import { useUserStore } from "../store/useUserStore";

export const useUser = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const logout = useUserStore((state) => state.logout);

  return { user, setUser, logout };
};
