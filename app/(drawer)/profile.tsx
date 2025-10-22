import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import { useUser } from "../../src/hooks/useUser";
import { useRouter } from "expo-router";
import { useThemeStore } from "@/store/useThemeStore";
import profileStyles from "../../src/styles/profileStyles";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user, logout } = useUser();
  const { theme, colors } = useThemeColors();
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const styles = profileStyles();
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Cerrar Sesión",
          style: "destructive",
          onPress: async () => {
            try {
              await logout();
              router.replace("/auth");
            } catch (error) {
              console.error("Error al cerrar sesión:", error);
              Alert.alert("Error", "No se pudo cerrar sesión");
            }
          },
        },
      ]
    );
  };

  const handleImageError = (error: any) => {
    console.log("Error cargando imagen de perfil:", error);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      {user ? (
        <View
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          <View style={styles.profileSection}>
            <View style={styles.imageContainer}>
              <Image
                source={
                  user.picture
                    ? { uri: user.picture }
                    : require("../../assets/default-profile-picture.jpg")
                }
                style={styles.profileImage}
                resizeMode="cover"
                onError={handleImageError}
                defaultSource={require("../../assets/default-profile-picture.jpg")}
              />
            </View>

            <Text style={[styles.userName, { color: colors.text }]}>
              {user.name} {user.lastName}
            </Text>

            <Text style={[styles.campus, { color: colors.primary }]}>
              Campus {user.campus}
            </Text>

            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>
                {user.role === "admin" ? "Administrador" : "Estudiante"}
              </Text>
            </View>
          </View>

          {user.role === "normal" && (
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
                    {user.career || "No especificada"}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: colors.text }]}>
                    Semestre:
                  </Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>
                    {user.semester
                      ? `${user.semester}° Semestre`
                      : "No especificado"}
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
          )}

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
                  {user.name} {user.lastName} {user.secondLastName || ""}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.text }]}>
                  Email:
                </Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {user.userName}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={[
            styles.container,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            No hay usuario logueado
          </Text>
          <TouchableOpacity
            style={styles.logoutCard}
            onPress={() => router.replace("/auth")}
          >
            <Text style={styles.logoutText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.container}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Configuraciones
        </Text>

        <View style={styles.preferenceRow}>
          <Text style={[styles.preferenceLabel, { color: colors.text }]}>
            Modo oscuro
          </Text>
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

        {user && (
          <TouchableOpacity style={styles.logoutCard} onPress={handleLogout}>
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
