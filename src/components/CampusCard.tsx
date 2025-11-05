import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { useThemeColors } from "../hooks/useThemeColors";

type Props = {
  label: string;
  href: string;
  image: any;
};

const CampusCard: React.FC<Props> = ({ label, href, image }) => {
  return (
    <Link href={href} asChild>
      <TouchableOpacity activeOpacity={0.8} style={styles.container}>
        <ImageBackground
          source={image}
          style={styles.image}
          imageStyle={{ borderRadius: 12 }}
        >
          <View
            style={[styles.overlay, { backgroundColor: "rgba(0,0,0,0.3)" }]}
          />
          <Text style={[styles.label, { color: "#fff" }]}>
            {label.toUpperCase()}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </Link>
  );
};

export default CampusCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    borderRadius: 12,
    overflow: "hidden",
    width: 300,
    height: 220,
    marginTop: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
