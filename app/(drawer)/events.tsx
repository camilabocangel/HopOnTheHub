import React, { useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import Section from "../../src/components/Section";
import EventCard from "../../src/components/EventCard";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import eventsStyles from "../../src/styles/eventsStyles";
import { useUser } from "../../src/hooks/useUser";
import { useEvents } from "@/hooks/useEvents";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EventsScreen() {
  const { colors } = useThemeColors();
  const { campus } = useLocalSearchParams();
  const { user } = useUser();

  const campusParam = Array.isArray(campus) ? campus[0] : campus;
  const selectedCampus = campusParam || user?.campus || "Cochabamba";

  // Obtener eventos del campus seleccionado
  const { events: campusEvents, loading } = useEvents(selectedCampus);

  const categories = useMemo(() => {
    return campusEvents.reduce((acc: string[], event) => {
      if (!acc.includes(event.category)) {
        acc.push(event.category);
      }
      return acc;
    }, []);
  }, [campusEvents]);

  // Filtrar eventos por categoría
  const eventsByCategory = useMemo(() => {
    return categories.reduce((acc: { [key: string]: any[] }, category) => {
      acc[category] = campusEvents.filter(
        (event) => event.category === category
      );
      return acc;
    }, {});
  }, [campusEvents, categories]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.text, marginTop: 12 }}>
          Cargando eventos...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={[eventsStyles.container, { backgroundColor: colors.background }]}
      >
        <Text style={[eventsStyles.title, { color: colors.text }]}>
          Eventos en {selectedCampus}
        </Text>

        {categories.length > 0 ? (
          categories.map((category) => {
            const categoryEvents = eventsByCategory[category];

            return (
              <Section key={category} title={category}>
                <FlatList
                  horizontal
                  data={categoryEvents}
                  renderItem={({ item }) => (
                    <EventCard
                      id={item.id}
                      title={item.title}
                      date={item.date}
                      time={item.time}
                      place={item.place}
                      category={item.category}
                      description={item.description}
                      image={item.image}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={eventsStyles.flatListContent}
                />
              </Section>
            );
          })
        ) : (
          <View style={eventsStyles.noEventsContainer}>
            <Text style={[eventsStyles.noEvents, { color: colors.text }]}>
              No hay eventos disponibles para {selectedCampus}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
    </SafeAreaView>
    
  );
}
