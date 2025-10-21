// src/styles/profileStyles.ts
import { StyleSheet } from "react-native";
import { useMemo } from "react";
import { ThemeColors } from "@/theme/colors";
import { useThemeColors } from "@/hooks/useThemeColors";

export const useProfileStyles = () => {
  const { colors } = useThemeColors();
  return useMemo(() => createStyles(colors), [colors]);
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      padding: 10,
    },
    profileSection: {
      alignItems: "center",
      marginBottom: 30,
    },
    imageContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: colors.primary,
      padding: 3,
      marginBottom: 16,
    },
    profileImage: {
      width: "100%",
      height: "100%",
      borderRadius: 60,
    },
    userName: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 4,
      textAlign: "center",
    },
    campus: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 8,
    },
    roleBadge: {
      backgroundColor: colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    roleText: {
      color: colors.surface,
      fontSize: 12,
      fontWeight: "600",
    },
    infoSection: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 12,
    },
    infoCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    infoLabel: {
      fontSize: 14,
      fontWeight: "500",
      flex: 1,
    },
    infoValue: {
      fontSize: 14,
      flex: 2,
      textAlign: "right",
    },
    preferenceRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 16,
      backgroundColor: colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      marginBottom: 12,
    },
    preferenceLabel: {
      fontSize: 18,
      fontWeight: "500",
    },
    logoutCard: {
      backgroundColor: "#ff3b30",
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 16,
      alignItems: "center",
      marginTop: 8,
    },
    logoutText: {
      color: "#ffffff",
      fontSize: 18,
      fontWeight: "600",
    },
  });

export default useProfileStyles;
