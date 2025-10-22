import React, { useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import EventCard from "../../src/components/EventCard";
import AnnouncementCard from "../../src/components/AnnouncementCard";
import Section from "../../src/components/Section";
import campusStyles from "../../src/styles/campusStyles";
import SeeMoreCreateCard from "@/components/seeMoreCreateCard";
import { useEvents } from "@/hooks/useEvents";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = campusStyles;

type SeeMoreItem = {
  id: string;
  type: "see-more";
};

export default function CampusScreen() {
  const { colors } = useThemeColors();
  const { campus } = useLocalSearchParams<{ campus: string }>();

  const selectedCampus = Array.isArray(campus) ? campus[0] : campus;

  // Obtener eventos y anuncios del campus seleccionado
  const { events: allEvents, loading: eventsLoading } =
    useEvents(selectedCampus);
  const { announcements: allAnnouncements, loading: announcementsLoading } =
    useAnnouncements(selectedCampus);

  const filteredEvents = useMemo(() => {
    return allEvents
      .filter((e) => e.campus.includes(selectedCampus || ""))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  }, [allEvents, selectedCampus]);

  const filteredAnnouncements = useMemo(() => {
    return allAnnouncements
      .filter((a) => a.campus.includes(selectedCampus || ""))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  }, [allAnnouncements, selectedCampus]);

  const eventsWithSeeMore = useMemo(() => {
    return [
      ...filteredEvents,
      { id: "see-more-events", type: "see-more" } as SeeMoreItem,
    ];
  }, [filteredEvents]);

  const announcementsWithSeeMore = useMemo(() => {
    return [
      ...filteredAnnouncements,
      { id: "see-more-announcements", type: "see-more" } as SeeMoreItem,
    ];
  }, [filteredAnnouncements]);

  if (eventsLoading || announcementsLoading) {
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
          Cargando contenido...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <Section title={`Eventos en ${selectedCampus}`}>
        {filteredEvents.length > 0 ? (
          <FlatList
            horizontal
            data={eventsWithSeeMore}
            renderItem={({ item }) => {
              if ("type" in item && item.type === "see-more") {
                return (
                  <SeeMoreCreateCard
                    selectedCampus={selectedCampus}
                    type="events"
                  />
                );
              } else {
                const event = item as any;
                return (
                  <EventCard
                    id={event.id}
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    place={event.place}
                    category={event.category}
                    description={event.description}
                    image={event.image}
                  />
                );
              }
            }}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={campusStyles.flatListContent}
          />
        ) : (
          <Text
            style={{ color: colors.text, textAlign: "center", padding: 20 }}
          >
            No hay eventos disponibles para {selectedCampus}
          </Text>
        )}
      </Section>

      <Section title={`Anuncios en ${selectedCampus}`}>
        {filteredAnnouncements.length > 0 ? (
          <FlatList
            horizontal
            data={announcementsWithSeeMore}
            renderItem={({ item }) => {
              if ("type" in item && item.type === "see-more") {
                return (
                  <SeeMoreCreateCard
                    selectedCampus={selectedCampus}
                    type="announcements"
                  />
                );
              } else {
                const announcement = item as any;
                return (
                  <AnnouncementCard
                    id={announcement.id}
                    image={announcement.image}
                    description={announcement.description}
                    date={announcement.date}
                    campus={announcement.campus}
                  />
                );
              }
            }}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={campusStyles.flatListContent}
          />
        ) : (
          <Text
            style={{ color: colors.text, textAlign: "center", padding: 20 }}
          >
            No hay anuncios disponibles para {selectedCampus}
          </Text>
        )}
      </Section>
    </ScrollView>
    </SafeAreaView>
  );
}
