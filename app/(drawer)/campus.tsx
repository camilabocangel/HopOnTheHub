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
import { events } from "../../src/data/events";
import { announcements } from "../../src/data/announcements";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import EventCard from "../../src/components/EventCard";
import AnnouncementCard from "../../src/components/AnnouncementCard";
import Section from "../../src/components/Section";
import useLikedAnnouncements from "../../src/hooks/useLikedAnnouncements";
import campusStyles from "../../src/styles/campusStyles";
import SeeMoreCreateCard from "@/components/seeMoreCreateCard";

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
      <Section title={`Eventos en ${selectedCampus}`}>
        <FlatList
          horizontal
          data={eventsWithSeeMore}
          renderItem={({ item }) => {
            if ("type" in item && item.type === "see-more") {
              return (
                <SeeMoreCreateCard selectedCampus={selectedCampus} type="events"/>
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

      <Section title={`Anuncios en ${selectedCampus}`}>
        <FlatList
          horizontal
          data={announcementsWithSeeMore}
          renderItem={({ item }) => {
            if ("type" in item && item.type === "see-more") {
              return (
                <SeeMoreCreateCard selectedCampus={selectedCampus} type="announcements"/>

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
