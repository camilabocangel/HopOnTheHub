import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function CreateAnnouncementCard() {
  const { colors } = useThemeColors();
  const router = useRouter();

  return (
    <TouchableOpacity
      style={{
        width: 280,
        minHeight: 300,
        borderRadius: 12,
        marginRight: 16,
        marginBottom: 8,
        backgroundColor: colors.surface + 'CC', // Color opaco
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: colors.border + '40', // Borde opaco
      }}
      onPress={() => router.push("/(drawer)/create_announcement")}
    >
      <View style={{ alignItems: "center" }}>
        <Ionicons name="add-circle" size={48} color={colors.primary} />
        <Text style={{ 
          fontSize: 16, 
          fontWeight: "bold", 
          color: colors.primary,
          marginTop: 12,
          textAlign: "center"
        }}>
          Crear anuncio
        </Text>
      </View>
    </TouchableOpacity>
  );
}