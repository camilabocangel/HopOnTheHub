import { StyleSheet } from "react-native";

const announcementsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
  flatListContent: {
    paddingBottom: 20,
  },
  noAnnouncementsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  noAnnouncements: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
  },
});

export default announcementsStyles;
