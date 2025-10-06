import React from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useThemeColors } from "../hooks/useThemeColors";
import Section from "../components/Section";
import CampusButton from "../components/CampusButton";

import users from "../data/users";
import careers from "../data/careers";

const { height, width } = Dimensions.get("window");

export default function HomeScreen() {
  const { colors } = useThemeColors();
  const router = useRouter();

  const user = users[0];
  const userCareer = careers.find((c) => c.name === user.career);

  const maxRows = Math.max(
    ...(userCareer?.semesters.map((s) => s.subjects.length) || [0])
  );

  const currentSemester = userCareer?.semesters.find(
    (s) => s.semester === user.semester
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      {" "}
      <View style={[styles.hero, { height: height - 10 }]}>
        {" "}
        <Image
          source={require("../../assets/upb.jpg")}
          style={styles.heroImage}
          resizeMode="cover"
        />{" "}
        <Ionicons
          name="chevron-down"
          size={32}
          color="white"
          style={styles.downIcon}
        />{" "}
      </View>
      {/* Hoy en tu horario */}
      <Section title="Hoy en tu horario">
        {currentSemester ? (
          currentSemester.subjects.map((subject, index) => (
            <Text key={index} style={{ color: colors.text, marginVertical: 2 }}>
              • {subject}
            </Text>
          ))
        ) : (
          <Text style={{ color: colors.text }}>
            No se encontraron materias.
          </Text>
        )}
      </Section>
      {/* Campus */}
      <Section title="Campus">
        <View style={styles.row}>
          <CampusButton
            label="La Paz"
            onPress={() => router.push("/(drawer)/events?campus=La Paz")}
          />
          <CampusButton
            label="Cochabamba"
            onPress={() => router.push("/(drawer)/events?campus=Cochabamba")}
          />
          <CampusButton
            label="Santa Cruz"
            onPress={() => router.push("/(drawer)/events?campus=Santa Cruz")}
          />
        </View>
      </Section>
      {/* Horario */}
      <Section title="Horario">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <View style={styles.headerRow}>
              <Text style={[styles.headerCell, { color: colors.text }]}>#</Text>
              {userCareer?.semesters.map((s, idx) => (
                <Text
                  key={idx}
                  style={[styles.headerCell, { color: colors.text }]}
                >
                  Semestre {s.semester}
                </Text>
              ))}
            </View>

            {Array.from({ length: maxRows }).map((_, rowIndex) => (
              <View key={rowIndex} style={styles.dataRow}>
                <Text style={[styles.cell, { color: colors.text }]}>
                  {rowIndex + 1}
                </Text>
                {userCareer?.semesters.map((semester, semesterIndex) => (
                  <Text
                    key={semesterIndex}
                    style={[styles.cell, { color: colors.text }]}
                  >
                    {semester.subjects[rowIndex] || "-"}
                  </Text>
                ))}
              </View>
            ))}
          </View>
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
  downIcon: {
    marginBottom: 12,
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
});
