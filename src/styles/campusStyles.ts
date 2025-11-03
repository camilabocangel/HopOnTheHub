import { StyleSheet } from "react-native";

const campusStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
  },
  horizontalCard: {
    marginRight: 12,
  },
  flatListContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  seeMoreCard: {
    width: 180,
    height: 120,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 2,
    borderStyle: "dashed",
  },
  seeMoreText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 8,
  },
});

export default campusStyles;
