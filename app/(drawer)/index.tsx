import React from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import Section from "../../src/components/Section";
import SubjectCard from "../../src/components/SubjectCard";
import CampusCard from "../../src/components/CampusCard";
import { Link } from "expo-router";
import { useUser } from "../../src/hooks/useUser";
import { importCareersToFirebase } from "@/scripts/importCareersToFirebase";
import { useCareers } from "@/hooks/useCareers";

const { height, width } = Dimensions.get("window");

export default function HomeScreen() {
  const { colors } = useThemeColors();
  const { user } = useUser();
  const { careers, loading: careersLoading, getCurrentSemester } = useCareers(); 


  const currentSemester = getCurrentSemester(user?.career, user?.semester);

  // const handleImport = async () => {
  //   try {
  //     await importCareersToFirebase();
  //     Alert.alert("Éxito", "Carreras importadas correctamente");
  //   } catch (error) {
  //     Alert.alert("Error", "No se pudieron importar las carreras");
  //   }
  // };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.hero, { height: height - 10 }]}>
        <Image
          source={require("../../assets/upb.jpg")}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>

      {user ? (
        <Section title="Hoy en tu horario">
          {currentSemester ? (
            currentSemester.subjects
              .slice(0, 3)
              .map((subject, index) => (
                <SubjectCard key={index} subject={subject} />
              ))
          ) : (
            <Text style={{ color: colors.text }}>
              {user.career && user.semester
                ? `No se encontraron materias para ${user.career} - Semestre ${user.semester}`
                : "Completa tu información académica en tu perfil"}
            </Text>
          )}
        </Section>
      ) : (
        <View></View>
      )}

      <Section title="Campus">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12 }}
        >
          <CampusCard
            label="La Paz"
            href="/(drawer)/campus?campus=La Paz"
            image={require("../../assets/lapaz.jpg")}
          />
          <CampusCard
            label="Cochabamba"
            href="/(drawer)/campus?campus=Cochabamba"
            image={require("../../assets/cocha.jpg")}
          />
          <CampusCard
            label="Santa Cruz"
            href="/(drawer)/campus?campus=Santa Cruz"
            image={require("../../assets/staCruz.jpg")}
          />
        </ScrollView>
      </Section>

      <Section title="Carreras">
        <ScrollView
          horizontal={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 12 }}
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
      </Section>
      {/* <TouchableOpacity
        onPress={handleImport}
        style={{
          position: "absolute",
          top: 50,
          right: 20,
          backgroundColor: "red",
          padding: 10,
          borderRadius: 5,
          zIndex: 9999,
        }}
      >
        <Text style={{ color: "white", fontSize: 12 }}>Import Carreras</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#666",
    backgroundColor: "#333",
  },
  dataRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#444",
  },
  headerCell: {
    width: 120,
    fontWeight: "bold",
    padding: 12,
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#555",
  },
  cell: {
    width: 120,
    padding: 8,
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#444",
  },
  careerCard: {
    width: 220,
    height: 100,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  careerText: {
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});
