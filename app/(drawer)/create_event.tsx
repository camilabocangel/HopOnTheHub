import React from "react";
import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import CreateEventForm from "@/components/CreateEventForm";
import createEventStyles from "@/styles/createEventStyles";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = createEventStyles;

export default function CreateEventScreen() {
  const { colors } = useThemeColors();
  const router = useRouter();

  const handleCreateEvent = (eventData: any) => {
    console.log("Evento creado:", eventData);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <ScrollView 
      style={{ 
        flex: 1, 
        backgroundColor: colors.background 
      }}
      contentContainerStyle={styles.container}
    >
      <CreateEventForm 
        onSubmit={handleCreateEvent}
        onCancel={handleCancel}
      />
    </ScrollView>
    </SafeAreaView>
    
  );
}