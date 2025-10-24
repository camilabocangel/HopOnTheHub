import { StyleSheet } from "react-native";

const eventCardStyles = StyleSheet.create({
  pendingBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#FFA500",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 10,
  },
  pendingText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  card: {
    width: 280,
    minHeight: 300,
    borderRadius: 12,
    marginRight: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: 140,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    padding: 12,
  },
  category: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    lineHeight: 20,
  },
  date: {
    fontSize: 12,
    marginBottom: 2,
  },
  time: {
    fontSize: 12,
    marginBottom: 2,
  },
  place: {
    fontSize: 12,
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
  },
});

export default eventCardStyles;
