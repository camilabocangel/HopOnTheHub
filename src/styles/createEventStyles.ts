import { StyleSheet, Dimensions } from "react-native";
import { useMemo } from "react";
import { ThemeColors } from "@/theme/colors";
import { useThemeColors } from "@/hooks/useThemeColors";

const { width } = Dimensions.get("window");

const useCreateEventStyles = () => {
  const { colors } = useThemeColors();
  return useMemo(() => createStyles(colors), [colors]);
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    modalityContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 8,
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    modalityLabel: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text,
    },
    modalityText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
    modalityHint: {
      fontSize: 12,
      color: colors.text,
      marginTop: 4,
      fontStyle: "italic",
    },
    textInputDisabled: {
      backgroundColor: colors.background,
      color: colors.text,
    },
    hintText: {
      fontSize: 12,
      color: colors.text,
      marginTop: 4,
      fontStyle: "italic",
    },
    modalitySwitch: {
      padding: 4,
    },
    modalitySwitchTrack: {
      width: 50,
      height: 28,
      borderRadius: 14,
      backgroundColor: "#e0e0e0",
      justifyContent: "center",
      padding: 2,
    },
    modalitySwitchThumb: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    modalitySwitchActive: {},
    modalitySwitchInactive: {},
    modalitySwitchThumbActive: {
      alignSelf: "flex-start",
    },
    modalitySwitchThumbInactive: {
      alignSelf: "flex-end",
    },
    container: {
      flexGrow: 1,
    },
    formContainer: {
      flex: 1,
      padding: 20,
    },
    header: {
      marginBottom: 30,
      alignItems: "center",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 8,
      textAlign: "center",
      color: colors.primary,
    },
    subtitle: {
      fontSize: 16,
      opacity: 0.7,
      textAlign: "center",
      color: colors.primary,
    },
    fieldsContainer: {
      marginBottom: 30,
    },
    fieldGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 10,
      color: colors.text,
    },
    textInput: {
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      borderColor: colors.border,
      color: colors.text,
      backgroundColor: colors.surface,
    },
    textArea: {
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      minHeight: 120,
      textAlignVertical: "top",
      borderColor: colors.border,
      color: colors.text,
      backgroundColor: colors.surface,
    },
    dateTimeContainer: {
      flexDirection: "row",
      gap: 12,
    },
    dateTimeField: {
      flex: 1,
    },
    dateTimeButton: {
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      justifyContent: "center",
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    dateTimeText: {
      fontSize: 16,
      color: colors.text,
    },
    campusContainer: {
      marginTop: 8,
    },
    campusCheckboxRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 20,
    },
    checkbox: {
      width: 22,
      height: 22,
      borderRadius: 6,
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
    campusHint: {
      fontSize: 12,
      color: colors.subtitle,
      marginTop: 8,
      fontStyle: "italic",
    },
    selectButton: {
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      justifyContent: "center",
      borderColor: colors.border,
      backgroundColor: colors.surface,
      flexDirection: "row",
      alignItems: "center",
    },
    selectButtonText: {
      fontSize: 16,
      color: colors.text,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      margin: 20,
      borderRadius: 16,
      padding: 20,
      width: width - 40,
      maxHeight: "80%",
      backgroundColor: colors.background,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },
    closeButton: {
      padding: 4,
    },
    modalItem: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modalItemSelected: {
      backgroundColor: colors.primary + "20",
    },
    modalItemText: {
      fontSize: 16,
      color: colors.text,
      flex: 1,
    },
    modalItemTextSelected: {
      color: colors.primary,
      fontWeight: "600",
    },
    actionsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 16,
      marginTop: 10,
    },
    cancelButton: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: "center",
      borderColor: colors.border,
    },
    cancelButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
    submitButton: {
      flex: 1,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: "center",
      backgroundColor: colors.primary,
    },
    submitButtonDisabled: {
      opacity: 0.6,
    },
    submitButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.surface,
    },
  });

export default useCreateEventStyles;
