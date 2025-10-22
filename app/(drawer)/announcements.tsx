import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Section from "../../src/components/Section";
import AnnouncementCard from "../../src/components/AnnouncementCard";
import { announcements } from "../../src/data/announcements";
import users from "../../src/data/users";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import announcementsStyles from "../../src/styles/announcementsStyles";
import { useUser } from "../../src/hooks/useUser";
import useLikedAnnouncements from "../../src/hooks/useLikedAnnouncements";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AnnouncementsScreen() {
  const { colors } = useThemeColors();
  const { campus } = useLocalSearchParams();
  const { user } = useUser();
  const { toggleLike } = useLikedAnnouncements();

  const getSelectedCampus = (): string => {
    if (Array.isArray(campus)) {
      return campus[0] || user?.campus || users[0]?.campus || "Cochabamba";
    }
    return campus || user?.campus || users[0]?.campus || "Cochabamba";
  };

  const selectedCampus = getSelectedCampus();

  const campusAnnouncements = announcements.filter((announcement) =>
    announcement.campus.includes(selectedCampus)
  );

  const getAnnouncementCategory = (description: string) => {
    const desc = description.toLowerCase();
    if (
      desc.includes("beca") ||
      desc.includes("convocatoria") ||
      desc.includes("postulación")
    )
      return "Becas y Convocatorias";
    if (
      desc.includes("académico") ||
      desc.includes("clase") ||
      desc.includes("curso") ||
      desc.includes("examen")
    )
      return "Académico";
    if (
      desc.includes("evento") ||
      desc.includes("actividad") ||
      desc.includes("feria") ||
      desc.includes("conferencia")
    )
      return "Eventos";
    if (
      desc.includes("deporte") ||
      desc.includes("deportivo") ||
      desc.includes("competencia") ||
      desc.includes("torneo")
    )
      return "Deportes";
    if (
      desc.includes("empleo") ||
      desc.includes("trabajo") ||
      desc.includes("pasantía") ||
      desc.includes("vacante")
    )
      return "Empleo y Pasantías";
    return "General";
  };

  const announcementsByCategory = campusAnnouncements.reduce(
    (acc: { [key: string]: any[] }, announcement) => {
      const category = getAnnouncementCategory(announcement.description);
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(announcement);
      return acc;
    },
    {}
  );

  const categories = Object.keys(announcementsByCategory);

  const handleAnnouncementLikeToggle = (id: number) => {
    toggleLike(id);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={[
          announcementsStyles.container,
          { backgroundColor: colors.background },
        ]}
      >
        <Text style={[announcementsStyles.title, { color: colors.text }]}>
          Anuncios en {selectedCampus}
        </Text>

        {categories.length > 0 ? (
          categories.map((category) => {
            const categoryAnnouncements = announcementsByCategory[category];

            return (
              <Section key={category} title={category}>
                <FlatList
                  horizontal
                  data={categoryAnnouncements}
                  renderItem={({ item }) => (
                    <AnnouncementCard
                      id={item.id}
                      image={item.image}
                      description={item.description}
                      date={item.date}
                      campus={item.campus}
                      onLikeToggle={handleAnnouncementLikeToggle}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={announcementsStyles.flatListContent}
                />
              </Section>
            );
          })
        ) : (
          <View style={announcementsStyles.noAnnouncementsContainer}>
            <Text
              style={[
                announcementsStyles.noAnnouncements,
                { color: colors.text },
              ]}
            >
              No hay anuncios disponibles para {selectedCampus}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
    </SafeAreaView>
    
  );
}
