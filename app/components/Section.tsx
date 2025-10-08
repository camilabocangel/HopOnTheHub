import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";
import sectionStyles from "../styles/sectionStyles";

type Props = {
  title: string;
  children: React.ReactNode;
  showDivider?: boolean;
};

const styles = sectionStyles;

export default function Section({ title, children }: Props) {
  const { colors } = useThemeColors();

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={[styles.divider, { backgroundColor: colors.primary }]} />
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <View style={[styles.divider, { backgroundColor: colors.primary }]} />
      </View>
      {children}
    </View>
  );
}

