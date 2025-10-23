import React from "react";
import { View, Text, FlatList, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import EventCard from "../../src/components/EventCard";
import AnnouncementCard from "../../src/components/AnnouncementCard";
import Section from "../../src/components/Section";
import { useRouter } from "expo-router";
import { usePendingEvents } from "@/hooks/usePendingEvents";
import { usePendingAnnouncements } from "@/hooks/usePendingAnnouncements";

export default function AdminHome() {
  const { colors } = useThemeColors();
  const router = useRouter();

  const { events: pendingEvents, loading: eventsLoading } = usePendingEvents();
  const { announcements: pendingAnnouncements, loading: announcementsLoading } = usePendingAnnouncements();

  const renderEventItem = ({ item }: { item: any }) => (
    <View style={{ marginRight: 12, width: 300 }}>
      <EventCard
        id={item.id}
        title={item.title}
        date={item.date}
        time={item.time}
        place={item.place}
        category={item.category}
        description={item.description}
        image={item.image}
      />
    </View>
  );

  const renderAnnouncementItem = ({ item }: { item: any }) => (
    <View style={{ marginRight: 12, width: 300 }}>
      <AnnouncementCard
        id={item.id}
        image={item.image}
        description={item.description}
        date={item.date}
        campus={item.campus}
      />
    </View>
  );

  if (eventsLoading || announcementsLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.text, marginTop: 12 }}>Cargando contenido pendiente...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              color: colors.text,
              marginBottom: 12,
            }}
          >
            Panel de Administrador
          </Text>

          {/* Eventos Pendientes */}
          <Section title="Eventos Pendientes de Aprobación">
            {pendingEvents.length > 0 ? (
              <FlatList
                horizontal
                data={pendingEvents}
                renderItem={renderEventItem}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            ) : (
              <Text
                style={{
                  color: colors.text,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                No hay eventos pendientes de aprobación.
              </Text>
            )}
          </Section>

          {/* Anuncios Pendientes */}
          <Section title="Anuncios Pendientes de Aprobación">
            {pendingAnnouncements.length > 0 ? (
              <FlatList
                horizontal
                data={pendingAnnouncements}
                renderItem={renderAnnouncementItem}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            ) : (
              <Text
                style={{
                  color: colors.text,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                No hay anuncios pendientes de aprobación.
              </Text>
            )}
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}