import { StyleSheet } from "react-native";

const singleAnnouncementStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: 250,
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
    textAlign: "center",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  detailValue: {
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
  },
  campusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  campusTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  campusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  mapContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  smallMap: {
    height: 150,
    width: '100%',
  },
  expandButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  campusSubtitle: {
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
  },
});

export default singleAnnouncementStyles;
