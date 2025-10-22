// app/(drawer)/career.tsx
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import Section from "../../src/components/Section";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { Career } from "@/types/types";

export default function CareerScreen() {
  const { colors } = useThemeColors();
  const { name, id } = useLocalSearchParams();
  const careerName = Array.isArray(name) ? name[0] : name;
  const careerId = Array.isArray(id) ? id[0] : id;

  const [career, setCareer] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCareer = async () => {
      try {
        setLoading(true);
        setError(null);

        let careerData: Career | null = null;

        if (careerId) {
          const careerDoc = await getDoc(doc(db, "careers", careerId));
          if (careerDoc.exists()) {
            careerData = { id: careerDoc.id, ...careerDoc.data() } as Career;
          }
        }

        if (!careerData && careerName) {
          careerData = { id: careerId || "", name: careerName } as Career;
        }

        setCareer(careerData);
      } catch (err) {
        setError("Error al cargar la información de la carrera");
        console.error("Error loading career:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCareer();
  }, [careerName, careerId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.text, marginTop: 12 }}>Cargando carrera...</Text>
      </View>
    );
  }

  if (error || !career) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: colors.text }}>
          {error || "Carrera no encontrada"}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 24,
          fontWeight: "700",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        {career.name}
      </Text>

      {career.semesters && career.semesters.length > 0 ? (
        career.semesters.map((semester) => (
          <Section
            key={semester.semester}
            title={`Semestre ${semester.semester}`}
          >
            {semester.subjects.map((subject, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: colors.surface,
                  padding: 12,
                  marginVertical: 4,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text style={{ color: colors.text }}>{subject}</Text>
              </View>
            ))}
          </Section>
        ))
      ) : (
        <Text style={{ color: colors.text, textAlign: "center" }}>
          No hay información de semestres disponible para esta carrera
        </Text>
      )}
    </ScrollView>
  );
}