import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";
import { Ionicons } from "@expo/vector-icons";

interface SubjectCardProps {
  subject: string;
  schedule?: string;
  classroom?: string;
  startDate?: string;
  endDate?: string;
  teacher?: string;
}

export default function SubjectCard({
  subject,
  schedule,
  classroom,
  startDate,
  endDate,
  teacher,
}: SubjectCardProps) {
  const { colors } = useThemeColors();
  const styles = subjectCardStyles();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <Text style={[styles.subjectName, { color: colors.text }]}>
          {subject}
        </Text>
        <Ionicons name="book-outline" size={20} color={colors.primary} />
      </View>

      {schedule && (
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={16} color={colors.subtitle} />
          <Text style={[styles.detailText, { color: colors.text }]}>
            {schedule}
          </Text>
        </View>
      )}

      {classroom && (
        <View style={styles.detailRow}>
          <Ionicons name="business-outline" size={16} color={colors.subtitle} />
          <Text style={[styles.detailText, { color: colors.text }]}>
            {classroom}
          </Text>
        </View>
      )}

      {teacher && (
        <View style={styles.detailRow}>
          <Ionicons name="person-outline" size={16} color={colors.subtitle} />
          <Text style={[styles.detailText, { color: colors.text }]}>
            {teacher}
          </Text>
        </View>
      )}

      {(startDate || endDate) && (
        <View style={styles.dateContainer}>
          {startDate && (
            <View style={styles.dateRow}>
              <Text style={[styles.dateLabel, { color: colors.subtitle }]}>
                Inicio:
              </Text>
              <Text style={[styles.dateValue, { color: colors.text }]}>
                {formatDate(startDate)}
              </Text>
            </View>
          )}
          {endDate && (
            <View style={styles.dateRow}>
              <Text style={[styles.dateLabel, { color: colors.subtitle }]}>
                Fin:
              </Text>
              <Text style={[styles.dateValue, { color: colors.text }]}>
                {formatDate(endDate)}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const subjectCardStyles = () =>
  StyleSheet.create({
    card: {
      padding: 16,
      borderRadius: 12,
      marginHorizontal: 16,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    subjectName: {
      fontSize: 16,
      fontWeight: "bold",
      flex: 1,
    },
    detailRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    detailText: {
      fontSize: 14,
      marginLeft: 8,
      flex: 1,
    },
    dateContainer: {
      marginTop: 8,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: "#f0f0f0",
    },
    dateRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
    },
    dateLabel: {
      fontSize: 12,
      fontWeight: "500",
    },
    dateValue: {
      fontSize: 12,
    },
  });
