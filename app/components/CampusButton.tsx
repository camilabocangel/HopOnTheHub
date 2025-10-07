// components/CampusButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { palette } from "../theme/colors";

type Props = {
  label: string;
  href: string; 
};

export default function CampusButton({ label }: Props) {
  return (
    <Link href={{ pathname: "/(drawer)/(tabs)", params: { campus: label } }} asChild>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: palette.light.surface,
    borderColor: palette.light.accent,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: palette.light.primary,
    fontWeight: "600",
  },
});
