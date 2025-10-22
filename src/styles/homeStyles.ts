import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  hero: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  horizontalListContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  horizontalCard: {
    marginRight: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#666",
    backgroundColor: "#333",
  },
  dataRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#444",
  },
  headerCell: {
    width: 120,
    fontWeight: "bold",
    padding: 12,
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#555",
  },
  cell: {
    width: 120,
    padding: 8,
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#444",
  },
  careerCard: {
    width: 220,
    height: 100,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  careerText: {
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});