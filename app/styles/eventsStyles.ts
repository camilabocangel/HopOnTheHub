import { StyleSheet } from "react-native";

const eventsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  flatListContent: {
    paddingHorizontal: 8,
  },
  noEventsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  noEvents: {
    textAlign: "center",
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default eventsStyles;