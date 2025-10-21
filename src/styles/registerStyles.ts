// src/styles/registerStyles.ts
import { StyleSheet } from "react-native";
import { useMemo } from "react";
import { ThemeColors } from "@/theme/colors";
import { useThemeColors } from "@/hooks/useThemeColors";

export const useRegisterStyles = () => {
  const { colors } = useThemeColors();
  return useMemo(() => createStyles(colors), [colors]);
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    photoSection: {
      alignItems: "center",
      marginBottom: 24,
      position: "relative",
    },
    photoButton: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: colors.surface,
      borderWidth: 2,
      borderColor: colors.primary,
      borderStyle: "dashed",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    photoImage: {
      width: "100%",
      height: "100%",
      borderRadius: 60,
    },
    photoPlaceholder: {
      justifyContent: "center",
      alignItems: "center",
    },
    photoText: {
      marginTop: 8,
      color: colors.text,
      fontSize: 12,
      textAlign: "center",
    },
    removePhotoButton: {
      position: "absolute",
      top: 0,
      right: 100,
      backgroundColor: colors.surface,
      borderRadius: 12,
    },
    container: {
      flexGrow: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
      paddingVertical: 40,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text,
      textAlign: "center",
      marginBottom: 30,
    },
    input: {
      width: "100%",
      height: 50,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 15,
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.surface,
      marginBottom: 16,
    },
    inputWithIcon: {
      flexDirection: "row",
      alignItems: "center",
    },
    passwordInput: {
      flex: 1,
    },
    iconButton: {
      paddingBottom: 15,
      position: "absolute",
      right: 10,
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 8,
      marginTop: 8,
    },
    select: {
      width: "100%",
      height: 50,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 15,
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.surface,
      textAlignVertical: "center",
      marginBottom: 16,
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
      marginTop: 10,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: colors.primary,
      marginRight: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    checkboxChecked: {
      backgroundColor: colors.primary,
    },
    checkboxText: {
      fontSize: 16,
      color: colors.text,
    },
    button: {
      width: "100%",
      height: 50,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 12,
      marginTop: 20,
      marginBottom: 30,
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.surface,
    },
    errorText: {
      color: "#ff3b30",
      fontSize: 14,
      marginTop: 5,
      textAlign: "center",
    },
    link: {
      color: colors.primary,
      fontWeight: "600",
      fontSize: 16,
      textAlign: "center",
      marginTop: 20,
    },
  });
