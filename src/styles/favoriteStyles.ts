import { StyleSheet, Dimensions } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

const { colors } = useThemeColors();

const { width } = Dimensions.get("window");

const favoriteStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginVertical: 16,
    color: colors.text,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    color: colors.text,
    marginTop: 12,
    lineHeight: 24,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  horizontalCard: {
    width: width * 0.8,
    marginHorizontal: 8,
  },
  horizontalListContent: {
    paddingHorizontal: 8,
  },
});

export default favoriteStyles;
