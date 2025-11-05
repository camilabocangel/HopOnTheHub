import React, { useCallback, useState, useMemo } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import { useUser } from "../../src/hooks/useUser";
import { useRouter } from "expo-router";
import { useThemeStore } from "@/store/useThemeStore";
import profileStyles from "../../src/styles/profileStyles";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { uploadToCloudinary } from "@/services/cloudinary";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const { user, logout, updateUserPhoto } = useUser();
  const { theme, colors } = useThemeColors();
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const styles = profileStyles();
  const router = useRouter();

  const [uploading, setUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(user?.picture);

  const isDarkMode = useMemo(() => theme === "dark", [theme]);

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
    console.error("Error cargando imagen de perfil:", error);
  };

  const requestMediaPermission = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permiso requerido",
        "Necesitamos acceso a tus fotos para actualizar tu imagen de perfil."
      );
      return false;
    }
    return true;
  }, []);

  const handlePickImage = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const currentUser = auth.currentUser;
    if (!currentUser) {
      Alert.alert(
        "Sesión expirada",
        "Vuelve a iniciar sesión para cambiar tu foto."
      );
      return;
    }

    const hasPermission = await requestMediaPermission();
    if (!hasPermission) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
      return;
    }

    const asset = result.assets[0];
    if (!asset.uri) {
      Alert.alert("Error", "No pudimos leer la imagen seleccionada.");
      return;
    }

    try {
      setUploading(true);
      const uploadResponse = await uploadToCloudinary(asset.uri, {
        fileName: asset.fileName ?? "profile-photo.jpg",
        mimeType: asset.mimeType ?? "image/jpeg",
      });

      const secureUrl = uploadResponse.secure_url;
      if (!secureUrl) {
        throw new Error("Cloudinary no devolvió una URL pública.");
      }

      await updateUserPhoto(currentUser.uid, secureUrl);
      setPhotoUrl(secureUrl);
      Alert.alert("Listo", "Tu foto de perfil se actualizó correctamente.");
    } catch (error: any) {
      console.warn("Error subiendo imagen", error);
      Alert.alert("Error", error?.message ?? "No se pudo subir tu foto.");
    } finally {
      setUploading(false);
    }
  }, [requestMediaPermission, updateUserPhoto]);

  const handleRemovePhoto = useCallback(async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    Alert.alert(
      "Eliminar foto",
      "¿Estás seguro de que quieres eliminar tu foto de perfil?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await updateUserPhoto(currentUser.uid, "");
              setPhotoUrl(undefined);
              Alert.alert("Listo", "Foto de perfil eliminada.");
            } catch (error) {
              console.error("Error removing photo:", error);
              Alert.alert("Error", "No se pudo eliminar la foto.");
            }
          },
        },
      ]
    );
  }, [updateUserPhoto]);

  const handleThemeToggle = useCallback(
    (value: boolean) => {
      toggleTheme();
    },
    [toggleTheme]
  );

  if (!user) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View
          style={[
            styles.container,
            { alignItems: "center", justifyContent: "center", flex: 1 },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text, marginBottom: 20 },
            ]}
          >
            No hay usuario logueado
          </Text>
          <TouchableOpacity
            style={styles.logoutCard}
            onPress={() => router.replace("/auth")}
          >
            <Text style={styles.logoutText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Configuraciones
          </Text>

          <View style={styles.preferenceRow}>
            <Text style={[styles.preferenceLabel, { color: colors.text }]}>
              Modo oscuro
            </Text>
            <Switch
              value={isDarkMode}
              onValueChange={handleThemeToggle}
              trackColor={{
                false: colors.switchTrackOff,
                true: colors.switchTrackOn,
              }}
              thumbColor={isDarkMode ? colors.switchThumb : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
        <View
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          <View style={styles.profileSection}>
            <View style={styles.imageContainer}>
              <Image
                source={
                  photoUrl || user.picture
                    ? { uri: photoUrl || user.picture }
                    : require("../../assets/default-profile-picture.jpg")
                }
                style={styles.profileImage}
                resizeMode="cover"
                onError={handleImageError}
                defaultSource={require("../../assets/default-profile-picture.jpg")}
              />

              {(photoUrl || user.picture) && (
                <TouchableOpacity
                  onPress={handleRemovePhoto}
                  style={styles.removePhotoButton}
                >
                  <Ionicons name="close-circle" size={28} color="#ff3b30" />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              onPress={handlePickImage}
              disabled={uploading}
              style={styles.changePhotoContainer}
            >
              {uploading ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <Text
                  style={[styles.changePhotoText, { color: colors.primary }]}
                >
                  {user.picture ? "Cambiar foto" : "Agregar foto"}
                </Text>
              )}
            </TouchableOpacity>

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

        <View style={styles.container}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Configuraciones
          </Text>

          <View style={styles.preferenceRow}>
            <Text style={[styles.preferenceLabel, { color: colors.text }]}>
              Modo oscuro
            </Text>
            <Switch
              value={isDarkMode}
              onValueChange={handleThemeToggle}
              trackColor={{
                false: colors.switchTrackOff,
                true: colors.switchTrackOn,
              }}
              thumbColor={isDarkMode ? colors.switchThumb : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
            />
          </View>

          <TouchableOpacity style={styles.logoutCard} onPress={handleLogout}>
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
