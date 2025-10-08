import React from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useThemeColors } from "../../hooks/useThemeColors";
import Section from "../../components/Section";
import CampusButton from "../../components/CampusCard";
import users from "../../data/users";
import careers from "../../data/careers";
import SubjectCard from "../../components/SubjectCard";
import CampusCard from "../../components/CampusCard";
import { Link } from "expo-router";
import { useUser } from "../../hooks/useUser";

const { height, width } = Dimensions.get("window");

export default function HomeScreen() {
  const { colors } = useThemeColors();

  const { user } = useUser();

  const userCareer = careers.find((c) => c.name === user?.career);

  const currentSemester = userCareer?.semesters.find(
    (s) => s.semester === user?.semester
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.hero, { height: height - 10 }]}>
        <Image
          source={require("../../../assets/upb.jpg")}
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
              No se encontraron materias.
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
            image={require("../../../assets/lapaz.jpg")}
          />
          <CampusCard
            label="Cochabamba"
            href="/(drawer)/campus?campus=Cochabamba"
            image={require("../../../assets/cocha.jpg")}
          />
          <CampusCard
            label="Santa Cruz"
            href="/(drawer)/campus?campus=Santa Cruz"
            image={require("../../../assets/staCruz.jpg")}
          />
        </ScrollView>
      </Section>

      <Section title="Carreras">
        <ScrollView
          horizontal={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 12 }}
        >
          {careers.map((career) => (
            <Link
              key={career.name}
              href={`/(drawer)/career?name=${encodeURIComponent(career.name)}`}
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
          ))}
        </ScrollView>
      </Section>
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
