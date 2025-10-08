import { StyleSheet } from "react-native";
import { useMemo } from "react";
import { useThemeColors } from "../hooks/useThemeColors";
import { ThemeColors } from "../theme/colors";

export const useAuthStyles = () => {
  const { colors } = useThemeColors();
  return useMemo(() => createStyles(colors), [colors]);
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    link: {
      color: colors.primary,
      fontWeight: "600",
      fontSize: 16,
      marginBottom: 12,
      paddingTop: 20,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
      paddingHorizontal: 20,
    },
    logo: {
      width: 120,
      height: 120,
      marginBottom: 40,
      resizeMode: "contain",
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
      marginBottom: 20,
    },
    button: {
      width: "100%",
      height: 50,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 12,
      marginTop: 10,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: "bold",
    },
    errorText: {
      color: "red",
      fontSize: 14,
      marginTop: 10,
      textAlign: "center",
    },
  });
