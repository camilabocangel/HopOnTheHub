import React, { useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { events } from "../data/events";
import { announcements } from "../data/announcements";
import { useThemeColors } from "../hooks/useThemeColors";
import EventCard from "../components/EventCard";
import AnnouncementCard from "../components/AnnouncementCard";
import Section from "../components/Section";
import useLikedAnnouncements from "../hooks/useLikedAnnouncements";
import campusStyles from "../styles/campusStyles";

const styles = campusStyles;

type SeeMoreItem = {
  id: string;
  type: "see-more";
};

export default function CampusScreen() {
  const { colors } = useThemeColors();
  const router = useRouter();
  const { campus } = useLocalSearchParams<{ campus: string }>();
  const { toggleLike } = useLikedAnnouncements();

  const selectedCampus = Array.isArray(campus) ? campus[0] : campus;

  const filteredEvents = useMemo(() => {
    return events
      .filter((e) => e.campus.includes(selectedCampus || ""))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  }, [selectedCampus]);

  const filteredAnnouncements = useMemo(() => {
    return announcements
      .filter((a) => a.campus.includes(selectedCampus || ""))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  }, [selectedCampus]);

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

  const handleAnnouncementLikeToggle = (id: number) => {
    toggleLike(id);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Eventos */}
      <Section title={`Eventos en ${selectedCampus}`}>
        <FlatList
          horizontal
          data={eventsWithSeeMore}
          renderItem={({ item }) => {
            if ("type" in item && item.type === "see-more") {
              return (
                <TouchableOpacity
                  style={[
                    styles.seeMoreCard,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() =>
                    router.push(`/(drawer)/events?campus=${selectedCampus}`)
                  }
                >
                  <Text style={[styles.seeMoreText, { color: colors.primary }]}>
                    Ver más{"\n"}eventos →
                  </Text>
                </TouchableOpacity>
              );
            } else {
              const event = item as (typeof events)[0];
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
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </Section>

      {/* Anuncios */}
      <Section title={`Anuncios en ${selectedCampus}`}>
        <FlatList
          horizontal
          data={announcementsWithSeeMore}
          renderItem={({ item }) => {
            if ("type" in item && item.type === "see-more") {
              return (
                <TouchableOpacity
                  style={[
                    styles.seeMoreCard,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() =>
                    router.push(
                      `/(drawer)/announcements?campus=${selectedCampus}`
                    )
                  }
                >
                  <Text style={[styles.seeMoreText, { color: colors.primary }]}>
                    Ver más{"\n"}anuncios →
                  </Text>
                </TouchableOpacity>
              );
            } else {
              const announcement = item as (typeof announcements)[0];
              return (
                <AnnouncementCard
                  id={announcement.id}
                  image={announcement.image}
                  description={announcement.description}
                  date={announcement.date}
                  campus={announcement.campus}
                  onLikeToggle={handleAnnouncementLikeToggle}
                />
              );
            }
          }}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </Section>
    </ScrollView>
  );
}
