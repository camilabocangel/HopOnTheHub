import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  selectedCampus: string;
  type: "events" | "announcements";
};

export default function SeeMoreCreateCard({ selectedCampus, type }: Props) {
  const { colors } = useThemeColors();
  const router = useRouter();

  const config =
    type === "events"
      ? {
          seeMoreText: "Ver más eventos",
          seeMoreRoute: `/(drawer)/events?campus=${selectedCampus}`,
        }
      : {
          seeMoreText: "Ver más anuncios",
          seeMoreRoute: `/(drawer)/announcements?campus=${selectedCampus}`,
        };

  return (
    <TouchableOpacity
      style={{
        width: 280,
        minHeight: 300,
        borderRadius: 12,
        marginRight: 16,
        marginBottom: 8,
        backgroundColor: colors.surface + 'CC',
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: colors.border + '40',
      }}
      onPress={() => router.replace(config.seeMoreRoute)}
    >
      <View style={{ alignItems: "center" }}>
        <Ionicons name="chevron-forward-circle" size={48} color={colors.primary} />
        <Text style={{ 
          fontSize: 16, 
          fontWeight: "bold", 
          color: colors.primary,
          marginTop: 12,
          textAlign: "center"
        }}>
          {config.seeMoreText}
        </Text>
      </View>
    </TouchableOpacity>
  );
}