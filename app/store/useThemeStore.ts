import { Appearance } from 'react-native';
import { create } from 'zustand';

import type { Theme } from '../theme/colors';

const initialTheme: Theme = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light'; //si el sistema esta en dark mode, el tema inicial es dark, si no es light

type ThemeStore = { //tengo un tema, un void y el estado que recibe un tema
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({ //debe tener los estados y las acciones que van a modificar algo
  theme: initialTheme, //este es el estado inicial, es una tabla 
  toggleTheme: () =>
    set((prev) => ({
      theme: prev.theme === 'dark' ? 'light' : 'dark',
    })),
  setTheme: (theme) => set({ theme }),
}));
