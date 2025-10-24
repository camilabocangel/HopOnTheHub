import React from "react";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useCareers } from "@/hooks/useCareers";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import careersStyles from "@/styles/careersStyles";

export default function CareersScreen() {
  const { colors } = useThemeColors();
  const { careers, loading: careersLoading } = useCareers();

  const styles = careersStyles;

  const groupedCareers = careers.reduce((acc, career) => {
    const faculty = career.faculty || "Sin Facultad";
    if (!acc[faculty]) {
      acc[faculty] = [];
    }
    acc[faculty].push(career);
    return acc;
  }, {} as Record<string, typeof careers>);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {careersLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={[styles.loadingText, { color: colors.text }]}>
              Cargando carreras...
            </Text>
          </View>
        ) : careers.length > 0 ? (
          Object.entries(groupedCareers).map(([faculty, facultyCareers]) => (
            <View key={faculty} style={styles.facultySection}>
              <View
                style={[styles.divider, { backgroundColor: colors.primary }]}
              />

              <View style={styles.facultyTitleContainer}>
                <Text
                  style={[styles.facultyTitle, { color: colors.primary }]}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {faculty}
                </Text>
              </View>

              <View
                style={[styles.divider, { backgroundColor: colors.primary }]}
              />

              <View style={styles.careersContainer}>
                {facultyCareers.map((career, index) => (
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
                      style={[
                        styles.careerCard,
                        {
                          backgroundColor: colors.surface,
                          borderLeftColor: colors.primary,
                        },
                      ]}
                    >
                      <View style={styles.careerHeader}>
                        <View style={styles.careerIcon}>
                          <Text
                            style={[
                              styles.careerIconText,
                              { color: colors.primary },
                            ]}
                          >
                            {(index + 1).toString().padStart(2, "0")}
                          </Text>
                        </View>
                        <View style={styles.careerInfo}>
                          <Text
                            style={[styles.careerName, { color: colors.text }]}
                            numberOfLines={2}
                          >
                            {career.name}
                          </Text>
                          <View style={styles.careerDetails}>
                            <View style={styles.detailItem}>
                              <Text
                                style={[
                                  styles.detailText,
                                  { color: colors.text },
                                ]}
                              >
                                📚 {career.semesters?.length || 0} semestres
                              </Text>
                            </View>
                            <View style={styles.detailItem}>
                              <Text
                                style={[
                                  styles.detailText,
                                  { color: colors.text },
                                ]}
                              >
                                📖{" "}
                                {career.semesters?.reduce(
                                  (total, sem) => total + sem.subjects.length,
                                  0
                                ) || 0}{" "}
                                materias
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Link>
                ))}
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No hay carreras disponibles
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
