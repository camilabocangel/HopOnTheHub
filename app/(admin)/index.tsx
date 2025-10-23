import React, { useMemo } from "react";
import { View, Text, FlatList, SafeAreaView, ScrollView } from "react-native";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import EventCard from "../../src/components/EventCard";
import events from "../../src/data/events"; 
import Section from "../../src/components/Section";
import { useRouter } from "expo-router";

export default function AdminHome() {
  const { colors } = useThemeColors();
  const router = useRouter();

  // Mostrar todos los eventos mock (fácil para pruebas)
  const pendingEvents = useMemo(() => events, [events]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: "700", color: colors.text, marginBottom: 12 }}>
            Panel de Administrador
          </Text>

          <Section title="Eventos (mock)">
            {pendingEvents.length > 0 ? (
              <FlatList
                data={pendingEvents}
                renderItem={({ item }) => (
                  <View style={{ marginBottom: 12 }}>
                    <EventCard
                      id={item.id}
                      title={item.title}
                      date={item.date}
                      time={item.time}
                      place={item.place}
                      category={item.category}
                      description={item.description}
                      image={item.image}
                      onPress={() => router.push(`/(admin)/singleEvent?id=${item.id}`)}
                    />
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
              />
            ) : (
              <Text style={{ color: colors.text, textAlign: "center", marginTop: 30 }}>
                No hay eventos mock.
              </Text>
            )}
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
