import React, { useMemo, useState, useCallback, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useLocalSearchParams, useFocusEffect, useNavigation } from "expo-router";
import Section from "../../src/components/Section";
import EventCard from "../../src/components/EventCard";
import { SearchBar } from "../../src/components/SearchBar";
import { DateFilter, DateFilterType } from "../../src/components/DateFilter";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import eventsStyles from "../../src/styles/eventsStyles";
import { useUser } from "../../src/hooks/useUser";
import { useEvents } from "@/hooks/useEvents";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EventsScreen() {
  const { colors } = useThemeColors();
  const { campus } = useLocalSearchParams();
  const { user } = useUser();
  const styles = eventsStyles;

  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilterType>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const campusParam = Array.isArray(campus) ? campus[0] : campus;
  const selectedCampus = campusParam || user?.campus || "Cochabamba";

  const navigation = useNavigation();
  
    useLayoutEffect(() => {
      navigation.setOptions({
        title: "Sección de Eventos",
      });
    }, [navigation]);

  const {
    events: campusEvents,
    loading: eventsLoading,
    refetch: refetchEvents,
  } = useEvents(selectedCampus);

  useFocusEffect(
    useCallback(() => {
      const refreshData = async () => {
        await refetchEvents();
        setInitialLoad(false);
      };

      refreshData();
    }, [refetchEvents])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetchEvents();
    } catch (error) {
      console.error("Error refreshing:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refetchEvents]);

  const getDateRange = (filter: DateFilterType) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (filter) {
      case "today":
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return { start: today, end: tomorrow };

      case "week":
        const endOfWeek = new Date(today);
        endOfWeek.setDate(endOfWeek.getDate() + 7);
        return { start: today, end: endOfWeek };

      case "month":
        const endOfMonth = new Date(today);
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        return { start: today, end: endOfMonth };

      default:
        return null;
    }
  };

  const filteredEvents = useMemo(() => {
    let filtered = campusEvents;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(query)
      );
    }

    if (dateFilter) {
      const dateRange = getDateRange(dateFilter);
      if (dateRange) {
        filtered = filtered.filter((event) => {
          const eventDate = new Date(event.date);
          eventDate.setHours(0, 0, 0, 0);
          return eventDate >= dateRange.start && eventDate < dateRange.end;
        });
      }
    }

    return filtered;
  }, [campusEvents, searchQuery, dateFilter]);

  const categories = useMemo(() => {
    const uniqueCategories = filteredEvents.reduce((acc: string[], event) => {
      if (!acc.includes(event.category)) {
        acc.push(event.category);
      }
      return acc;
    }, []);

    return uniqueCategories.sort((a, b) => a.localeCompare(b));
  }, [filteredEvents]);

  const eventsByCategory = useMemo(() => {
    return categories.reduce((acc: { [key: string]: any[] }, category) => {
      acc[category] = filteredEvents.filter(
        (event) => event.category === category
      );
      return acc;
    }, {});
  }, [filteredEvents, categories]);

  const renderEventItem = ({ item, index }: { item: any; index: number }) => (
    <View style={{ marginBottom: 16 }}>
      <EventCard
        id={item.id}
        title={item.title}
        date={item.date}
        time={item.time}
        place={item.place}
        category={item.category}
        description={item.description}
        image={item.image}
        content={item.content}
        campus={selectedCampus}
        status={item.status}
        index={index}
        createdBy={item.createdBy}
        createdAt={item.createdAt}
        creatorPushToken={item.creatorPushToken}
      />
    </View>
  );

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleClearDateFilter = () => {
    setDateFilter(null);
  };

  const isLoading = initialLoad || eventsLoading;

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.text }]}>
            Cargando eventos...
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
        <View
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          <Text style={[styles.title, { color: colors.text }]}>
            Eventos en {selectedCampus}
          </Text>

          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Buscar eventos por nombre..."
            onClear={handleClearSearch}
          />

          <DateFilter
            selectedFilter={dateFilter}
            onFilterChange={setDateFilter}
          />

          {categories.length > 0 ? (
            categories.map((category) => {
              const categoryEvents = eventsByCategory[category];

              return (
                <Section key={category} title={category}>
                  <FlatList
                    horizontal
                    data={categoryEvents}
                    renderItem={renderEventItem}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContent}
                    snapToAlignment="start"
                    decelerationRate="fast"
                  />
                </Section>
              );
            })
          ) : (
            <View style={styles.noEventsContainer}>
              {searchQuery || dateFilter ? (
                <Text style={[styles.noEvents, { color: colors.text }]}>
                  No se encontraron eventos
                  {searchQuery && ` para "${searchQuery}"`}
                  {dateFilter && ` en el período seleccionado`}
                  {` en ${selectedCampus}`}
                </Text>
              ) : (
                <Text style={[styles.noEvents, { color: colors.text }]}>
                  No hay eventos disponibles para {selectedCampus}
                </Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
