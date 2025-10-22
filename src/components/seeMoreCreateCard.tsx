import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";
import { useRouter } from "expo-router";
import campusStyles from "../styles/campusStyles";

const styles = campusStyles;

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
          seeMoreText: "Ver más\neventos",
          seeMoreRoute: `/(drawer)/events?campus=${selectedCampus}`,
          createText: "Crear\nevento",
          createRoute: "/(drawer)/create_event",
        }
      : {
          seeMoreText: "Ver más\nanuncios",
          seeMoreRoute: `/(drawer)/announcements?campus=${selectedCampus}`,
          createText: "Crear\nanuncio",
          createRoute: "/(drawer)/create_announcement",
        };

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        height: 300,
        width: 200,
      }}
    >
      <TouchableOpacity
        style={[
          styles.seeMoreCard,
          {
            flex: 1,
            marginBottom: 8,
            backgroundColor: colors.surface,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            borderWidth: 0,
          },
        ]}
        onPress={() => router.replace(config.seeMoreRoute)}
      >
        <Text style={[styles.seeMoreText, { color: colors.primary }]}>
          {config.seeMoreText}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.seeMoreCard,
          {
            flex: 1,
            backgroundColor: colors.surface,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            borderWidth: 0,
          },
        ]}
        onPress={() => router.push(config.createRoute)}
      >
        <Text style={[styles.seeMoreText, { color: colors.primary }]}>
          {config.createText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
