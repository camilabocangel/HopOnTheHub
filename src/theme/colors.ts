export const palette = {
  light: {
    background: "#F8F9FA",
    surface: "#FFFFFF",
    text: "#2C2C2C",
    subtitle: "#6C757D",
    primary: "#002147",
    accent: "#FFD43B",
    muted: "#E5E5E5",
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
