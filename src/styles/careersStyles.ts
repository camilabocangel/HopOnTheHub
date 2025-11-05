import { StyleSheet } from "react-native";

const careersStyles = StyleSheet.create({
  facultySection: {
    marginBottom: 40,
  },
  divider: {
    height: 4,
    borderRadius: 2,
    marginVertical: 16,
  },
  facultyTitleContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  facultyTitle: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    lineHeight: 24,
  },
  careersContainer: {
    marginTop: 20,
    gap: 16,
  },
  careerCard: {
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  careerHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  careerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    marginTop: 2,
  },
  careerIconText: {
    fontSize: 14,
    fontWeight: "800",
  },
  careerInfo: {
    flex: 1,
  },
  careerName: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 8,
    lineHeight: 24,
  },
  careerDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: 14,
    fontWeight: "600",
  },
  loadingContainer: {
    padding: 60,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "600",
  },
  emptyContainer: {
    padding: 60,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default careersStyles;