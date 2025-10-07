import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Section from "../components/Section";
import EventCard from "../components/EventCard";
import { events } from "../data/events";
import users from "../data/users";
import { useThemeColors } from "../hooks/useThemeColors";
import eventsStyles from "../styles/eventsStyles";

export default function EventsScreen() {
  const { colors } = useThemeColors();
  const { campus } = useLocalSearchParams();

  const campusParam = Array.isArray(campus) ? campus[0] : campus;
  const selectedCampus = campusParam || users[0]?.campus;

  const campusEvents = events.filter((event) =>
    event.campus.includes(selectedCampus)
  );

  const categories = campusEvents.reduce((acc: string[], event) => {
    if (!acc.includes(event.category)) {
      acc.push(event.category);
    }
    return acc;
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[eventsStyles.container, { backgroundColor: colors.background }]}>
        <Text style={[eventsStyles.title, { color: colors.text }]}>
          Eventos en {selectedCampus}
        </Text>

        {categories.length > 0 ? (
          categories.map((category) => {
            const categoryEvents = campusEvents.filter(
              (event) => event.category === category
            );

            return (
              <Section key={category} title={category}>
                <FlatList
                  horizontal
                  data={categoryEvents}
                  renderItem={({ item }) => (
                    <EventCard
                      title={item.title}
                      date={item.date}
                      time={item.time}
                      place={item.place}
                      category={item.category}
                      description={item.description}
                      image={item.coverUri}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
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
  );
}