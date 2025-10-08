import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Switch,
  StyleSheet,
} from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";
import users from "../data/users";
import { useThemeStore } from "../store/useThemeStore";
import { ThemeColors } from "../theme/colors";
import profileStyles from "../styles/profileStyles";

export default function ProfileScreen() {
  const user = users[0];

  const { theme, colors } = useThemeColors();
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const styles = profileStyles();

  const calculateAge = (birthday: string) => {
    const birthDate = new Date(birthday);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background },
        ]}
      >
        <View style={styles.profileSection}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/joaquin-aguilera-profile-picture.jpg")}
              style={styles.profileImage}
              resizeMode="cover"
            />
          </View>

          <Text style={[styles.userName, { color: colors.text }]}>
            {user.name} {user.lastName}
          </Text>

          <Text style={[styles.campus, { color: colors.primary }]}>
            Campus {user.campus}
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Información Académica
          </Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.text }]}>
                Carrera:
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {user.career}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.text }]}>
                Semestre:
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {user.semester}° Semestre
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.text }]}>
                Campus:
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {user.campus}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Información Personal
          </Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.text }]}>
                Nombre completo:
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {user.name} {user.lastName} {user.secondLastName}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.text }]}>
                Código:
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {user.id}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.text }]}>
                Edad:
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {calculateAge(user.birthday)} años
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.text }]}>
                Fecha de nacimiento:
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {formatDate(user.birthday)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Configuraciones
        </Text>
        <View style={styles.preferenceRow}>
          <Text style={styles.preferenceLabel}>Modo oscuro</Text>
          <Switch
            value={theme === "dark"}
            onValueChange={toggleTheme}
            trackColor={{
              false: colors.switchTrackOff,
              true: colors.switchTrackOn,
            }}
            thumbColor={theme === "dark" ? colors.switchThumb : "#f4f4f5"}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 24,
      backgroundColor: colors.background,
    },
    preferenceRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 16,
      backgroundColor: colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      marginBottom: 12,
    },
    preferenceLabel: {
      fontSize: 18,
      color: colors.text,
      fontWeight: "500",
    }
  });

function createColorStyles(
  colors:
    | {
        readonly background: "#F8F9FA";
        readonly surface: "#FFFFFF";
        readonly text: "#2C2C2C";
        readonly subtitle: "#6C757D";
        readonly primary: "#002147";
        readonly accent: "#FFD43B";
        readonly muted: "#E5E5E5";
        readonly border: "#E2E8F0";
        readonly tabBarBackground: "#FFFFFF";
        readonly drawerBackground: "#FFFFFF";
        readonly switchTrackOn: "#FFD43B";
        readonly switchTrackOff: "#94A3B8";
        readonly switchThumb: "#F8F9FA";
      }
    | {
        readonly background: "#0F172A";
        readonly surface: "#1E293B";
        readonly text: "#E2E8F0";
        readonly subtitle: "#CBD5F5";
        readonly primary: "#60A5FA";
        readonly accent: "#FFD43B";
        readonly muted: "#475569";
        readonly border: "#334155";
        readonly tabBarBackground: "#1E293B";
        readonly drawerBackground: "#0F172A";
        readonly switchTrackOn: "#FFD43B";
        readonly switchTrackOff: "#475569";
        readonly switchThumb: "#1E293B";
      }
): any {
  throw new Error("Function not implemented.");
}
