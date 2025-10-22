import React from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useCareers } from "@/hooks/useCareers";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CareersScreen() {
  const { colors } = useThemeColors();
  const { careers, loading: careersLoading } = useCareers();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
        <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16 }}
    >
      {careersLoading ? (
        <Text style={{ color: colors.text, textAlign: "center" }}>
          Cargando carreras...
        </Text>
      ) : careers.length > 0 ? (
        careers.map((career) => (
          <Link
            key={career.id}
            href={{
              pathname: "/(drawer)/career",
              params: {
                name: career.name,
                id: career.id,
              },
            }}
            asChild
          >
            <TouchableOpacity
              style={{
                backgroundColor: colors.surface,
                padding: 16,
                marginBottom: 12,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "700",
                  fontSize: 16,
                }}
              >
                {career.name}
              </Text>
            </TouchableOpacity>
          </Link>
        ))
      ) : (
        <Text style={{ color: colors.text, textAlign: "center" }}>
          No hay carreras disponibles
        </Text>
      )}
    </ScrollView>
    </SafeAreaView>
    
  );
}
