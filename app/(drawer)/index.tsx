import React, { useEffect } from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  Dimensions,
  Alert,
  FlatList,
  RefreshControl,
} from "react-native";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import Section from "../../src/components/Section";
import SubjectCard from "../../src/components/SubjectCard";
import CampusCard from "../../src/components/CampusCard";
import AnnouncementCard from "../../src/components/AnnouncementCard";
import EventCard from "../../src/components/EventCard";
import { useFocusEffect } from "@react-navigation/native";
import { useUser } from "../../src/hooks/useUser";
import { useCareers } from "@/hooks/useCareers";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { useEvents } from "@/hooks/useEvents";
import { usePendingEvents } from "@/hooks/usePendingEvents";
import { usePendingAnnouncements } from "@/hooks/usePendingAnnouncements";
import { homeStyles } from "@/styles/homeStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { importCareersToFirebase } from "@/scripts/importCareersToFirebase";
import { importAnnouncementsToFirebase } from "@/scripts/importAnnouncementsToFirebase";
import { importEventsToFirebase } from "@/scripts/importEventsToFirebase";
import CreateEventCard from "@/components/CreateEventCard";
import CreateAnnouncementCard from "@/components/CreateAnnouncementCard";

const { height, width } = Dimensions.get("window");

const generateMockScheduleData = () => {
  const subjectsData = [
    {
      schedule: "9:30 - 11:30",
      classroom: "Aula A1",
      startDate: "2025-01-15",
      endDate: "2025-05-20",
      teacher: "Dr. Paulvazo Landaeta",
    },
    {
      schedule: "07:15 - 09:15",
      classroom: "Laboratorio L3",
      startDate: "2025-01-15",
      endDate: "2025-05-20",
      teacher: "Ing. Rene Sosa",
    },
    {
      schedule: "11:00 - 12:30",
      classroom: "Aula 205",
      startDate: "2025-01-15",
      endDate: "2025-05-20",
      teacher: "MSc. Roberto Silva",
    },
    {
      schedule: "14:00 - 15:30",
      classroom: "Aula 410",
      startDate: "2025-01-15",
      endDate: "2025-05-20",
      teacher: "Dra. María Fernández",
    },
    {
      schedule: "15:45 - 17:15",
      classroom: "Laboratorio A",
      startDate: "2025-01-15",
      endDate: "2025-05-20",
      teacher: "Lic. Jorge Torres",
    },
  ];

  return subjectsData;
};

export default function HomeScreen() {
  const styles = homeStyles;
  const { colors } = useThemeColors();
  const { user } = useUser();
  const { careers, loading: careersLoading, getCurrentSemester } = useCareers();

  const {
    events: allEvents,
    loading: eventsLoading,
    refetch: refetchEvents,
  } = useEvents(user?.campus);
  const {
    announcements: allAnnouncements,
    loading: announcementsLoading,
    refetch: refetchAnnouncements,
  } = useAnnouncements(user?.campus);

  const {
    events: pendingEvents,
    loading: pendingEventsLoading,
    refetch: refetchPendingEvents,
    updateEventStatus,
  } = usePendingEvents();
  const {
    announcements: pendingAnnouncements,
    loading: pendingAnnouncementsLoading,
    refetch: refetchPendingAnnouncements,
  } = usePendingAnnouncements();

  const [refreshing, setRefreshing] = React.useState(false);

   useFocusEffect(
     React.useCallback(() => {
       const refreshData = async () => {
         if (user?.role === "admin") {
           await Promise.all([
             refetchPendingEvents(),
             refetchPendingAnnouncements(),
           ]);
         } else {
           await Promise.all([refetchEvents(), refetchAnnouncements()]);
         }
       };

       refreshData();
     }, [
       user?.role,
       refetchPendingEvents,
       refetchPendingAnnouncements,
       refetchEvents,
       refetchAnnouncements,
     ])
   );

  const currentSemester = getCurrentSemester(user?.career, user?.semester);
  
  const upcomingEvents = allEvents?.slice(0, 5) || [];
  const recentAnnouncements = allAnnouncements?.slice(0, 5) || [];

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      if (user?.role === "admin") {
        await Promise.all([
          refetchPendingEvents(),
          refetchPendingAnnouncements(),
        ]);
      } else {
        await Promise.all([refetchEvents(), refetchAnnouncements()]);
      }
    } catch (error) {
      console.error("Error refreshing:", error);
    } finally {
      setRefreshing(false);
    }
  }, [
    user?.role,
    refetchPendingEvents,
    refetchPendingAnnouncements,
    refetchEvents,
    refetchAnnouncements,
  ]);

  const handleImport = async () => {
    try {
      await importCareersToFirebase();
      await importAnnouncementsToFirebase();
      await importEventsToFirebase();
      Alert.alert("Éxito", "Importación correcta");
    } catch (error) {
      Alert.alert("Error", "Importación fallida");
    }
  };

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
        status={item.status}
      />
    </View>
  );

  const renderEventListFooter = () => <CreateEventCard />;

  const renderAnnouncementItem = ({ item }: { item: any }) => (
    <View style={styles.horizontalCard}>
      <AnnouncementCard
        id={item.id}
        image={item.image}
        description={item.description}
        date={item.date}
        campus={item.campus}
        status={item.status}
      />
    </View>
  );

  const renderAnnouncementListFooter = () => <CreateAnnouncementCard />;

  const renderPendingEventItem = ({ item }: { item: any }) => (
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
        status={item.status}
        isPending={true}
      />
    </View>
  );

  const renderPendingAnnouncementItem = ({ item }: { item: any }) => (
    <View style={styles.horizontalCard}>
      <AnnouncementCard
        id={item.id}
        image={item.image}
        description={item.description}
        date={item.date}
        campus={item.campus}
        status={item.status}
        isPending={true}
      />
    </View>
  );

  if (user?.role === "admin") {
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
          <View style={[styles.hero, { height: height * 0.3 }]}>
            <Image
              source={require("../../assets/upb.jpg")}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay}>
              <Text style={styles.heroTitle}>Panel de Administración</Text>
              <Text style={styles.heroSubtitle}>
                Gestiona eventos y anuncios pendientes
              </Text>
            </View>
          </View>

          <Section title={`Eventos Pendientes (${pendingEvents.length})`}>
            {pendingEventsLoading ? (
              <Text
                style={{ color: colors.text, textAlign: "center", padding: 20 }}
              >
                Cargando eventos pendientes...
              </Text>
            ) : pendingEvents.length > 0 ? (
              <FlatList
                horizontal
                data={pendingEvents}
                renderItem={renderPendingEventItem}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalListContent}
                snapToAlignment="start"
                decelerationRate="fast"
              />
            ) : (
              <View style={styles.emptyState}>
                <Text style={[styles.emptyStateText, { color: colors.text }]}>
                  No hay eventos pendientes de aprobación
                </Text>
              </View>
            )}
          </Section>

          <Section
            title={`Anuncios Pendientes (${pendingAnnouncements.length})`}
          >
            {pendingAnnouncementsLoading ? (
              <Text
                style={{ color: colors.text, textAlign: "center", padding: 20 }}
              >
                Cargando anuncios pendientes...
              </Text>
            ) : pendingAnnouncements.length > 0 ? (
              <FlatList
                horizontal
                data={pendingAnnouncements}
                renderItem={renderPendingAnnouncementItem}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalListContent}
                snapToAlignment="start"
                decelerationRate="fast"
              />
            ) : (
              <View style={styles.emptyState}>
                <Text style={[styles.emptyStateText, { color: colors.text }]}>
                  No hay anuncios pendientes de aprobación
                </Text>
              </View>
            )}
          </Section>
        </ScrollView>
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
              currentSemester.subjects?.slice(0, 2).map((subject, index) => {
                const mockData = generateMockScheduleData();
                const subjectData = mockData[index % mockData.length];

                return (
                  <SubjectCard
                    key={index}
                    subject={subject}
                    schedule={subjectData.schedule}
                    classroom={subjectData.classroom}
                    startDate={subjectData.startDate}
                    endDate={subjectData.endDate}
                    teacher={subjectData.teacher}
                  />
                );
              })
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
              ListFooterComponent={renderEventListFooter}
            />
          </Section>
        )}

        {user && upcomingEvents.length === 0 && (
          <Section title={`Eventos (${user.campus})`}>
            <View style={{ flexDirection: "row" }}>
              <CreateEventCard />
            </View>
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
              ListFooterComponent={renderAnnouncementListFooter}
            />
          </Section>
        )}

        {user && recentAnnouncements.length === 0 && (
          <Section title={`Anuncios (${user.campus})`}>
            <View style={{ flexDirection: "row" }}>
              <CreateAnnouncementCard />
            </View>
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
      </ScrollView>
    </SafeAreaView>
  );
}