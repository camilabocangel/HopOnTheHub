import React from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useFavorites } from '@/hooks/useFavorites';
import EventCard from '@/components/EventCard';
import AnnouncementCard from '@/components/AnnouncementCard';
import { useThemeColors } from '@/hooks/useThemeColors';

export default function FavoritesScreen() {
  const { favoriteEvents, favoriteAnnouncements, loading, refreshFavorites } = useFavorites();
  const {colors} = useThemeColors();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginHorizontal: 16,
      marginVertical: 12,
      color: colors.text,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    emptyText: {
      fontSize: 16,
      textAlign: 'center',
      color: colors.text,
      marginTop: 12,
    },
    contentContainer: {
      paddingBottom: 20,
    },
  });

  if (!favoriteEvents.length && !favoriteAnnouncements.length && !loading) {
    return (
      <View style={[styles.container, styles.emptyState]}>
        <Text style={styles.emptyText}>
          No tienes favoritos aún.{'\n'}Haz like en eventos o anuncios para verlos aquí.
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
      {/* Favorite Events Section */}
      {favoriteEvents.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Eventos Favoritos</Text>
          <FlatList
            data={favoriteEvents}
            keyExtractor={(item) => item.id}
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
                content={item.content}
                campus={item.campus?.[0] || ''}
                status="accepted"
              />
            )}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      {/* Favorite Announcements Section */}
      {favoriteAnnouncements.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Anuncios Favoritos</Text>
          <FlatList
            data={favoriteAnnouncements}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AnnouncementCard
                id={item.id}
                image={item.image}
                description={item.description}
                date={item.date}
                campus={item.campus}
                status="accepted"
              />
            )}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </ScrollView>
  );
}