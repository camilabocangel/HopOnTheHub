import React from "react";
import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import CreateAnnouncementForm from "@/components/CreateAnnouncementForm";
import createAnnouncementStyles from "@/styles/createAnnouncementStyles";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = createAnnouncementStyles;

export default function CreateEventScreen() {
  const { colors } = useThemeColors();
  const router = useRouter();

  const handleCreateAnnouncement = (eventData: any) => {
    console.log("Anuncio creado:", eventData);
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
      <CreateAnnouncementForm 
        onSubmit={handleCreateAnnouncement}
        onCancel={handleCancel}
      />
    </ScrollView>
    </SafeAreaView>
  );
}