// theme/palette.ts
export const palette = {
  light: {
    background: "#F8F9FA", // blanco hueso
    surface: "#FFFFFF",
    text: "#2C2C2C", // texto principal
    subtitle: "#6C757D", // subtítulo o texto gris medio
    primary: "#002147", // azul UPB
    accent: "#FFD43B", // amarillo UPB
    muted: "#E5E5E5", // gris claro
    border: "#E2E8F0",
    tabBarBackground: "#FFFFFF",
    drawerBackground: "#FFFFFF",
    switchTrackOn: "#FFD43B",
    switchTrackOff: "#94A3B8",
    switchThumb: "#F8F9FA",
  },
  dark: {
    background: "#0F172A",
    surface: "#1E293B",
    text: "#E2E8F0",
    subtitle: "#CBD5F5",
    primary: "#60A5FA",
    accent: "#FFD43B",
    muted: "#475569",
    border: "#334155",
    tabBarBackground: "#1E293B",
    drawerBackground: "#0F172A",
    switchTrackOn: "#FFD43B",
    switchTrackOff: "#475569",
    switchThumb: "#1E293B",
  },
} as const;

export type Theme = keyof typeof palette;
export type ThemeColors = (typeof palette)[Theme];
