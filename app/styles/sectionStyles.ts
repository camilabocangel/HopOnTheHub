import { StyleSheet } from "react-native";

const sectionStyles = StyleSheet.create({
  section: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 10,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 12,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  divider: {
    height: 5,
    flex: 1,
    borderRadius: 5,
  },
});

export default sectionStyles;
