export const palette = {
  light: {
    background: "#F8F9FA",
    surface: "#FFFFFF",
    text: "#2C2C2C",
    textSecondary:"#2C2C2C",
    subtitle: "#8791997b",
    primary: "#002147",
    loadingSplash:"#002147",
    textSplash:"#FFD43B",
    accent: "#FFD43B",
    muted: "#E5E5E5",
    border: "#E2E8F0",
    tabBarBackground: "#FFFFFF",
    drawerBackground: "#FFFFFF",
    switchTrackOn: "#FFD43B",
    switchTrackOff: "#94A3B8",
    switchThumb: "#F8F9FA",
    map: "#ee0e0eff"
  },
  dark: {
    background: "#0F172A",
    surface: "#1E293B",
    text: "#E2E8F0",
    subtitle: "#CBD5F5",
    primary: "#60A5FA",
    loadingSplash:"#002147",
    textSplash:"#FFD43B",
    accent: "#FFD43B",
    muted: "#475569",
    border: "#334155",
    tabBarBackground: "#1E293B",
    drawerBackground: "#0F172A",
    switchTrackOn: "#FFD43B",
    switchTrackOff: "#475569",
    switchThumb: "#be9500ff",
    map: "#ee0e0eff"
  },
} as const;

export type Theme = keyof typeof palette;
export type ThemeColors = (typeof palette)[Theme];
