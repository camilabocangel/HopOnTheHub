import React from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { useFavorites } from "@/hooks/useFavorites";
import EventCard from "@/components/EventCard";
import AnnouncementCard from "@/components/AnnouncementCard";
import { useThemeColors } from "@/hooks/useThemeColors";
import favoriteStyles from "@/styles/favoriteStyles";

const { width } = Dimensions.get("window");

export default function FavoritesScreen() {
  const { favoriteEvents, favoriteAnnouncements, loading, refreshFavorites } =
    useFavorites();
  const { colors } = useThemeColors();

  const styles = favoriteStyles;

  const renderEventItem = ({ item }: { item: any }) => (
    <View style={styles.horizontalCard}>
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
        campus={item.campus?.[0] || ""}
        status="accepted"
      />
    </View>
  );

  const renderAnnouncementItem = ({ item }: { item: any }) => (
    <View style={styles.horizontalCard}>
      <AnnouncementCard
        id={item.id}
        image={item.image}
        description={item.description}
        date={item.date}
        campus={item.campus}
        status="accepted"
      />
    </View>
  );

  if (!favoriteEvents.length && !favoriteAnnouncements.length && !loading) {
    return (
      <View style={[styles.container, styles.emptyState]}>
        <Text style={styles.emptyText}>
          No tienes favoritos aún.{"\n"}Haz like en eventos o anuncios para
          verlos aquí.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={refreshFavorites}
          colors={[colors.primary]}
        />
      }
      contentContainerStyle={styles.contentContainer}
    >
      {favoriteEvents.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Eventos Favoritos ({favoriteEvents.length})
          </Text>
          <FlatList
            horizontal
            data={favoriteEvents}
            keyExtractor={(item) => item.id}
            renderItem={renderEventItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContent}
            snapToAlignment="start"
            decelerationRate="fast"
            snapToInterval={width * 0.8 + 16}
          />
        </View>
      )}

      {favoriteAnnouncements.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Anuncios Favoritos ({favoriteAnnouncements.length})
          </Text>
          <FlatList
            horizontal
            data={favoriteAnnouncements}
            keyExtractor={(item) => item.id}
            renderItem={renderAnnouncementItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContent}
            snapToAlignment="start"
            decelerationRate="fast"
            snapToInterval={width * 0.8 + 16}
          />
        </View>
      )}
    </ScrollView>
  );
}
