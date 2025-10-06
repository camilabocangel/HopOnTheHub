import React from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { announcements } from "../data/announcements";
import users from "../data/users";
import { useThemeColors } from "../hooks/useThemeColors";
import AnnouncementCard from "../components/AnnouncementCard";

export default function AnnouncementsScreen() {
  const { colors } = useThemeColors();
  const { campus } = useLocalSearchParams();

  const campusParam = Array.isArray(campus) ? campus[0] : campus;
  const selectedCampus = campusParam || users[0]?.campus || "La Paz";

  const campusAnnouncements = announcements.filter((announcement) =>
    announcement.campus.includes(selectedCampus)
  );

  const handleLikeToggle = (announcementId: number) => {};

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>
          Anuncios en {selectedCampus}
        </Text>

        {campusAnnouncements.length > 0 ? (
          <View style={styles.announcementsList}>
            {campusAnnouncements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                id={announcement.id}
                image={announcement.image}
                description={announcement.description}
                date={announcement.date}
                campus={announcement.campus}
                liked={announcement.like}
                onLikeToggle={handleLikeToggle}
              />
            ))}
          </View>
        ) : (
          <View style={styles.noAnnouncementsContainer}>
            <Text style={[styles.noAnnouncements, { color: colors.text }]}>
              No hay anuncios disponibles para {selectedCampus}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  announcementsList: {
    gap: 16,
  },
  noAnnouncementsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  noAnnouncements: {
    textAlign: "center",
    fontSize: 16,
    fontStyle: "italic",
  },
});
