import { StyleSheet } from "react-native";
import { useMemo } from "react";
import { useThemeColors } from "../hooks/useThemeColors";
import { ThemeColors } from "../theme/colors";

const profileStyles = () => {
  const { colors } = useThemeColors();

  return useMemo(() => createStyles(colors), [colors]);
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
      backgroundColor: colors.background,
    },
    profileSection: {
      alignItems: "center",
      marginBottom: 30,
      paddingTop: 20,
    },
    imageContainer: {
      width: 150,
      height: 150,
      borderRadius: 75,
      borderWidth: 4,
      borderColor: "#1a73e8",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
      marginBottom: 20,
      overflow: "hidden",
    },
    profileImage: {
      width: "100%",
      height: "100%",
    },
    userName: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 8,
      textAlign: "center",
      color: colors.text,
    },
    campus: {
      fontSize: 18,
      fontWeight: "600",
      textAlign: "center",
    },
    infoSection: {
      marginBottom: 25,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 15,
      marginLeft: 5,
      color: colors.text,
    },
    infoCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
      paddingVertical: 4,
    },
    infoLabel: {
      fontSize: 16,
      fontWeight: "600",
      flex: 1,
      color: colors.text,
    },
    infoValue: {
      fontSize: 16,
      fontWeight: "400",
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
      color: colors.text,
      fontWeight: "500",
    },
    logoutCard: {
      marginTop: 16,
      paddingVertical: 16,
      alignItems: "center",
      borderRadius: 16,
      backgroundColor: "#EF4444",
    },
    logoutText: {
      color: "white",
      fontWeight: "600",
      fontSize: 16,
    },
  });

export default profileStyles;