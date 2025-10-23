// app/(admin)/singleEvent.tsx
import React from "react";
import { View, Text, Image, Pressable, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useThemeColors } from "@/hooks/useThemeColors";
import events from "../../src/data/events"; 

export default function AdminSingleEvent() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useThemeColors();
  const router = useRouter();

  const event = events.find((e) => e.id.toString() === id);

  if (!event) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Evento no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <Text style={[styles.title, { color: colors.text }]}>{event.title}</Text>
      <Text style={{ color: colors.text }}>{event.description}</Text>
      <Text style={{ color: colors.subtitle }}>📅 {event.date}</Text>
      <Text style={{ color: colors.subtitle }}>⏰ {event.time}</Text>
      <Text style={{ color: colors.subtitle }}>📍 {event.place}</Text>

      {/* Botones Aceptar / Rechazar */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => alert("Evento Aceptado ✅")}
        >
          <Text style={styles.buttonText}>Aceptar</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={() => alert("Evento Rechazado ❌")}
        >
          <Text style={styles.buttonText}>Rechazar</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.back}
        onPress={() => router.back()}
      >
        <Text style={{ color: colors.primary }}>← Volver</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  image: { width: "100%", height: 200, borderRadius: 12, marginBottom: 12 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  back: { alignSelf: "center", marginTop: 30 },
});
