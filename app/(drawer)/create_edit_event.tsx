import React from "react";
import { View, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import CreateEventForm from "@/components/Create_Edit_EventForm";
import createEventStyles from "@/styles/createEventStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";

export default function CreateEventScreen() {
  const { colors } = useThemeColors();
  const styles = createEventStyles();
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  const isEditing = params.isEditing === "true";
  
  const eventToEdit = isEditing ? {
    id: params.id as string,
    title: params.title as string,
    description: params.description as string,
    content: params.content as string,
    category: params.category as string,
    place: params.place as string,
    campus: params.campus as string,
    date: params.date as string,
    time: params.time as string,
    image: params.image as string,
    status: params.status as string,
    firestoreId: params.firestoreId as string || params.id as string,
  } : undefined;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Editar Evento" : "Crear Evento",
    });
  }, [navigation, isEditing]);

  const handleCreateEvent = (eventData: any) => {
    console.log(`Evento ${isEditing ? 'actualizado' : 'creado'}:`, eventData);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
        contentContainerStyle={styles.container}
      >
        <CreateEventForm 
          onSubmit={handleCreateEvent} 
          onCancel={handleCancel}
          eventToEdit={eventToEdit}
          isEditing={isEditing}
        />
      </ScrollView>
    </SafeAreaView>
  );
}