import { StyleSheet } from "react-native";

const announcementCardStyles = StyleSheet.create({
  rejectedBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#f44336",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rejectedText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  hiddenBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#666",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  hiddenText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
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
  date: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  campusContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    flexWrap: "wrap",
  },
  campusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  campusText: {
    fontSize: 10,
    fontWeight: "500",
  },
  moreCampuses: {
    fontSize: 10,
    fontWeight: "500",
    marginLeft: 4,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  likeIcon: {
    fontSize: 16,
  },
  likeButtonOverlay: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
});

export default announcementCardStyles;
