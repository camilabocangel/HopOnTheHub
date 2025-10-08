import { StyleSheet } from "react-native";

const announcementCardStyles = StyleSheet.create({
  card: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: "100%",
    height: 160,
  },
  placeholderImage: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
    fontWeight: "400",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  info: {
    flex: 1,
  },
  date: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "500",
  },
  campus: {
    fontSize: 12,
    fontStyle: "italic",
  },
  likeButton: {
    padding: 8,
    marginLeft: 12,
  },
});

export default announcementCardStyles;
