import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function AboutScreen() {
  const { campus } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Quiénes somos? {campus}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
});
