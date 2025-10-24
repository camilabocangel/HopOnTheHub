import React from "react";
import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import CreateAnnouncementForm from "@/components/CreateAnnouncementForm";
import useCreateAnnouncementStyles from "@/styles/createAnnouncementStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";

export default function CreateAnnouncementScreen() {
  const { colors } = useThemeColors();
  const router = useRouter();
  const styles = useCreateAnnouncementStyles();
  const navigation = useNavigation();
        useLayoutEffect(() => {
          navigation.setOptions({
            title: "Crear Anuncio", 
          });
        }, [navigation]);

  const handleCreateAnnouncement = (announcementData: any) => {
    console.log("Anuncio creado:", announcementData);
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