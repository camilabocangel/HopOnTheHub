import React from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import Section from "../../src/components/Section";
import SubjectCard from "../../src/components/SubjectCard";
import CampusCard from "../../src/components/CampusCard";
import AnnouncementCard from "../../src/components/AnnouncementCard";
import EventCard from "../../src/components/EventCard";
import { Link } from "expo-router";
import { useUser } from "../../src/hooks/useUser";
import { useCareers } from "@/hooks/useCareers";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { useEvents } from "@/hooks/useEvents";
import { importCareersToFirebase } from "@/scripts/importCareersToFirebase";
import { importAnnouncementsToFirebase } from "@/scripts/importAnnouncementsToFirebase";
import { importEventsToFirebase } from "@/scripts/importEventsToFirebase";
import { homeStyles } from "@/styles/homeStyles";
import { SafeAreaView } from "react-native-safe-area-context";

const { height, width } = Dimensions.get("window");

export default function HomeScreen() {
  const styles = homeStyles;
  const { colors } = useThemeColors();
  const { user } = useUser();
  const { careers, loading: careersLoading, getCurrentSemester } = useCareers();

  const { events: allEvents, loading: eventsLoading } = useEvents(user?.campus);
  const { announcements: allAnnouncements, loading: announcementsLoading } =
    useAnnouncements(user?.campus);

  const currentSemester = getCurrentSemester(user?.career, user?.semester);

  const upcomingEvents = allEvents.slice(0, 5);
  const recentAnnouncements = allAnnouncements.slice(0, 5);

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
        campus={item.campus}
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
      />
    </View>
  );

  // const handleImport = async () => {
  //   try {
  //     await importCareersToFirebase();
  //     await importAnnouncementsToFirebase();
  //     await importEventsToFirebase();
  //     Alert.alert("Éxito", "Importación correcta");
  //   } catch (error) {
  //     Alert.alert("Error", "Importación fallida");
  //   }
  // };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={[styles.hero, { height: height - 10 }]}>
          <Image
            source={require("../../assets/upb.jpg")}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {user ? (
          <Section title="Hoy en tu horario">
            {currentSemester ? (
              currentSemester.subjects
                .slice(0, 3)
                .map((subject, index) => (
                  <SubjectCard key={index} subject={subject} />
                ))
            ) : (
              <Text style={{ color: colors.text }}>
                {user.career && user.semester
                  ? `No se encontraron materias para ${user.career} - Semestre ${user.semester}`
                  : "Completa tu información académica en tu perfil"}
              </Text>
            )}
          </Section>
        ) : (
          <View></View>
        )}

        {user && upcomingEvents.length > 0 && (
          <Section title={`Próximos Eventos (${user.campus})`}>
            <FlatList
              horizontal
              data={upcomingEvents}
              renderItem={renderEventItem}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalListContent}
              snapToAlignment="start"
              decelerationRate="fast"
            />
          </Section>
        )}

        {user && recentAnnouncements.length > 0 && (
          <Section title={`Anuncios (${user.campus})`}>
            <FlatList
              horizontal
              data={recentAnnouncements}
              renderItem={renderAnnouncementItem}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalListContent}
              snapToAlignment="start"
              decelerationRate="fast"
            />
          </Section>
        )}

        <Section title="Buscar por Campus">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 12 }}
          >
            <CampusCard
              label="La Paz"
              href="/(drawer)/campus?campus=La Paz"
              image={require("../../assets/lapaz.jpg")}
            />
            <CampusCard
              label="Cochabamba"
              href="/(drawer)/campus?campus=Cochabamba"
              image={require("../../assets/cocha.jpg")}
            />
            <CampusCard
              label="Santa Cruz"
              href="/(drawer)/campus?campus=Santa Cruz"
              image={require("../../assets/staCruz.jpg")}
            />
          </ScrollView>
        </Section>
        {/* {__DEV__ && (
        <TouchableOpacity
          onPress={handleImport}
          style={{
            position: "absolute",
            top: 50,
            right: 20,
            backgroundColor: "red",
            padding: 10,
            borderRadius: 5,
            zIndex: 9999,
          }}
        >
          <Text style={{ color: "white", fontSize: 12 }}>Import Data</Text>
        </TouchableOpacity>
      )} */}
      </ScrollView>
    </SafeAreaView>
  );
}
