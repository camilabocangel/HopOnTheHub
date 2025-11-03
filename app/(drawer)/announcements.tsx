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
import Section from "../../src/components/Section";
import AnnouncementCard from "../../src/components/AnnouncementCard";
import { SearchBar } from "../../src/components/SearchBar";
import { DateFilter, DateFilterType } from "../../src/components/DateFilter";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import announcementsStyles from "../../src/styles/announcementsStyles";
import { useUser } from "../../src/hooks/useUser";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AnnouncementsScreen() {
  const { colors } = useThemeColors();
  const { campus } = useLocalSearchParams();
  const { user } = useUser();
  const styles = announcementsStyles;

  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilterType>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const campusParam = Array.isArray(campus) ? campus[0] : campus;
  const selectedCampus = campusParam || user?.campus || "Cochabamba";

  const {
    announcements: campusAnnouncements,
    loading: announcementsLoading,
    refetch: refetchAnnouncements,
  } = useAnnouncements(selectedCampus);

  // USAR USEFOCUSEFFECT COMO EN HOME SCREEN
  useFocusEffect(
    useCallback(() => {
      const refreshData = async () => {
        await refetchAnnouncements();
        setInitialLoad(false);
      };

      refreshData();
    }, [refetchAnnouncements])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetchAnnouncements();
    } catch (error) {
      console.error("Error refreshing:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refetchAnnouncements]);

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

  const filteredAnnouncements = useMemo(() => {
    let filtered = campusAnnouncements;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((announcement) =>
        announcement.description.toLowerCase().includes(query)
      );
    }

    if (dateFilter) {
      const dateRange = getDateRange(dateFilter);
      if (dateRange) {
        filtered = filtered.filter((announcement) => {
          const announcementDate = new Date(announcement.date);
          announcementDate.setHours(0, 0, 0, 0);
          return (
            announcementDate >= dateRange.start &&
            announcementDate < dateRange.end
          );
        });
      }
    }

    return filtered;
  }, [campusAnnouncements, searchQuery, dateFilter]);

  // FUNCIÓN DE RENDERIZADO CON INDEX Y WRAPPER
  const renderAnnouncementItem = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => (
    <View style={{ marginBottom: 16 }}>
      <AnnouncementCard
        id={item.id}
        image={item.image}
        description={item.description}
        date={item.date}
        campus={item.campus}
        status={item.status}
        index={index}
      />
    </View>
  );

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const isLoading = initialLoad || announcementsLoading;

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.text }]}>
            Cargando anuncios...
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
            Anuncios en {selectedCampus}
          </Text>

          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Buscar anuncios por descripción..."
            onClear={handleClearSearch}
          />

          <DateFilter
            selectedFilter={dateFilter}
            onFilterChange={setDateFilter}
          />

          {filteredAnnouncements.length > 0 ? (
            <Section title="Todos los anuncios">
              <FlatList
                horizontal
                data={filteredAnnouncements}
                renderItem={renderAnnouncementItem}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
                snapToAlignment="start"
                decelerationRate="fast"
              />
            </Section>
          ) : (
            <View style={styles.noAnnouncementsContainer}>
              {searchQuery || dateFilter ? (
                <Text style={[styles.noAnnouncements, { color: colors.text }]}>
                  No se encontraron anuncios
                  {searchQuery && ` para "${searchQuery}"`}
                  {dateFilter && ` en el período seleccionado`}
                  {` en ${selectedCampus}`}
                </Text>
              ) : (
                <Text style={[styles.noAnnouncements, { color: colors.text }]}>
                  No hay anuncios disponibles para {selectedCampus}
                </Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
