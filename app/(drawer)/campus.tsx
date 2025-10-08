import React, { useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { events } from "../data/events";
import { announcements } from "../data/announcements";
import { useThemeColors } from "../hooks/useThemeColors";
import EventCard from "../components/EventCard";
import AnnouncementCard from "../components/AnnouncementCard";
import Section from "../components/Section";

export default function CampusScreen() {
  const { colors } = useThemeColors();
  const router = useRouter();
  const { campus } = useLocalSearchParams<{ campus: string }>();

  const selectedCampus = Array.isArray(campus) ? campus[0] : campus;

  // Eventos filtrados por campus
  const filteredEvents = useMemo(() => {
    return events
      .filter((e) => e.campus.includes(selectedCampus || ""))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  }, [selectedCampus]);

  // Anuncios filtrados por campus
  const filteredAnnouncements = useMemo(() => {
    return announcements
      .filter((a) => a.campus.includes(selectedCampus || ""))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  }, [selectedCampus]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Eventos */}
      <Section title={`Eventos en ${selectedCampus}`}>
        <FlatList
          horizontal
          data={[...filteredEvents, { id: "see-more-events" }]}
          renderItem={({ item }) =>
            item.id === "see-more-events" ? (
              <TouchableOpacity
                style={[styles.seeMoreCard, { backgroundColor: colors.surface }]}
                onPress={() =>
                  router.push(`/(drawer)/events?campus=${selectedCampus}`)
                }
              >
                <Text style={[styles.seeMoreText, { color: colors.primary }]}>
                  Ver más eventos →
                </Text>
              </TouchableOpacity>
            ) : (
              <EventCard
                title={item.title}
                date={item.date}
                time={item.time}
                place={item.place}
                category={item.category}
                description={item.description}
                image={item.image}
              />
            )
          }
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </Section>

      {/* Anuncios */}
      <Section title={`Anuncios en ${selectedCampus}`}>
        <FlatList
          horizontal
          data={[...filteredAnnouncements, { id: "see-more-announcements" }]}
          renderItem={({ item }) =>
            item.id === "see-more-announcements" ? (
              <TouchableOpacity
                style={[styles.seeMoreCard, { backgroundColor: colors.surface }]}
                onPress={() =>
                  router.push(
                    `/(drawer)/announcements?campus=${selectedCampus}`
                  )
                }
              >
                <Text style={[styles.seeMoreText, { color: colors.primary }]}>
                  Ver más anuncios →
                </Text>
              </TouchableOpacity>
            ) : (
              <AnnouncementCard
                id={item.id}
                image={item.image}
                description={item.description}
                date={item.date}
                campus={item.campus}
                liked={item.like}
                onLikeToggle={() => {}}
              />
            )
          }
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flatListContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  seeMoreCard: {
    width: 180,
    height: 120,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  seeMoreText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
