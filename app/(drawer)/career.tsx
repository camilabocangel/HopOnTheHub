import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import careers from "../../src/data/careers";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import Section from "../../src/components/Section";

export default function CareerScreen() {
  const { colors } = useThemeColors();
  const { name } = useLocalSearchParams();
  const careerName = Array.isArray(name) ? name[0] : name;

  const career = careers.find((c) => c.name === careerName);

  if (!career) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: colors.text }}>Carrera no encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background, padding: 12 }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 20,
          fontWeight: "700",
          marginBottom: 12,
        }}
      >
        {career.name}
      </Text>

      {career.semesters.map((semester) => (
        <Section
          key={semester.semester}
          title={`Semestre ${semester.semester}`}
        >
          {semester.subjects.map((subject, index) => (
            <Text key={index} style={{ color: colors.text, marginVertical: 2 }}>
              • {subject}
            </Text>
          ))}
        </Section>
      ))}
    </ScrollView>
  );
}
