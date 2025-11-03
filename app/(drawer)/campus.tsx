import React, { useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useLocalSearchParams, useFocusEffect } from "expo-router";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import EventCard from "../../src/components/EventCard";
import AnnouncementCard from "../../src/components/AnnouncementCard";
import Section from "../../src/components/Section";
import campusStyles from "../../src/styles/campusStyles";
import SeeMoreCreateCard from "@/components/seeMoreCreateCard";
import { useEvents } from "@/hooks/useEvents";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";

const styles = campusStyles;

type SeeMoreItem = {
  id: string;
  type: "see-more";
};

export default function CampusScreen() {
  const { colors } = useThemeColors();
  const { campus } = useLocalSearchParams<{ campus: string }>();
  const navigation = useNavigation();
  
  const [refreshing, setRefreshing] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Campus",
    });
  }, [navigation]);

  const selectedCampus = Array.isArray(campus) ? campus[0] : campus;

  const {
    events: allEvents,
    loading: eventsLoading,
    refetch: refetchEvents,
  } = useEvents(selectedCampus);
  
  const {
    announcements: allAnnouncements,
    loading: announcementsLoading,
    refetch: refetchAnnouncements,
  } = useAnnouncements(selectedCampus);

  // USAR USEFOCUSEFFECT COMO EN HOME SCREEN
  useFocusEffect(
    useCallback(() => {
      const refreshData = async () => {
        await Promise.all([refetchEvents(), refetchAnnouncements()]);
        setInitialLoad(false);
      };

      refreshData();
    }, [refetchEvents, refetchAnnouncements])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchEvents(), refetchAnnouncements()]);
    } catch (error) {
      console.error("Error refreshing:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refetchEvents, refetchAnnouncements]);

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

  // FUNCIONES DE RENDERIZADO IDÉNTICAS A HOME SCREEN
  const renderEventItem = ({ item, index }: { item: any; index: number }) => {
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
        <View style={{ marginBottom: 16 }}>
          <EventCard
            id={event.id}
            title={event.title}
            date={event.date}
            time={event.time}
            place={event.place}
            category={event.category}
            description={event.description}
            image={event.image}
            content={event.content}
            campus={event.campus}
            status={event.status}
            index={index}
            createdBy={event.createdBy}
            createdAt={event.createdAt}
          />
        </View>
      );
    }
  };

  const renderAnnouncementItem = ({ item, index }: { item: any; index: number }) => {
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
        <View style={{ marginBottom: 16 }}>
          <AnnouncementCard
            id={announcement.id}
            image={announcement.image}
            description={announcement.description}
            date={announcement.date}
            campus={announcement.campus}
            status={announcement.status}
            index={index}
          />
        </View>
      );
    }
  };

  const isLoading = initialLoad || eventsLoading || announcementsLoading;

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.text }]}>
            Cargando...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView 
        style={{ flex: 1, backgroundColor: colors.background }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        <Section title={`Eventos en ${selectedCampus}`}>
          {filteredEvents.length > 0 ? (
            <FlatList
              horizontal
              data={eventsWithSeeMore}
              renderItem={renderEventItem}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={campusStyles.flatListContent}
              snapToAlignment="start"
              decelerationRate="fast"
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
              renderItem={renderAnnouncementItem}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={campusStyles.flatListContent}
              snapToAlignment="start"
              decelerationRate="fast"
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