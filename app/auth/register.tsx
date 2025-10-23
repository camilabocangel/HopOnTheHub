import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Image,
  Modal,
  FlatList,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/config/firebaseConfig";
import { useRouter } from "expo-router";
import { useRegisterStyles } from "@/styles/registerStyles";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useThemeColors } from "@/hooks/useThemeColors";
import { fetchCareers } from "@/helpers/fetchCareers ";
import { useCareers } from "@/hooks/useCareers";  
import { SafeAreaView } from "react-native-safe-area-context";
import { uploadToCloudinary } from "@/services/cloudinary";

export default function RegisterScreen() {
  const { colors } = useThemeColors();
  const styles = useRegisterStyles();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [secondLastName, setSecondLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [campus, setCampus] = useState("La Paz");
  const [career, setCareer] = useState("");
  const [semester, setSemester] = useState<number | null>(null);

  const { careers, loading: careersLoading } = useCareers();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [photo, setPhoto] = useState<string | null>(null);

  const [showCampusModal, setShowCampusModal] = useState(false);
  const [showCareerModal, setShowCareerModal] = useState(false);
  const [showSemesterModal, setShowSemesterModal] = useState(false);
  const semesters = Array.from({ length: 10 }, (_, i) => i + 1);


  const campuses = ["La Paz", "Santa Cruz", "Cochabamba"];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) newErrors.email = "El correo es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Correo no válido";

    if (!password) newErrors.password = "La contraseña es obligatoria";
    else if (password.length < 6) newErrors.password = "Mínimo 6 caracteres";

    if (!confirmPassword) newErrors.confirmPassword = "Confirma tu contraseña";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";

    if (!name) newErrors.name = "El nombre es obligatorio";
    if (!lastName) newErrors.lastName = "El apellido paterno es obligatorio";

    if (!isAdmin && !career) newErrors.career = "Selecciona una carrera";
    if (!isAdmin && !semester)
      newErrors.semester = "El semestre es obligatorio";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const pickImage = useCallback(async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permisos requeridos",
          "Se necesitan permisos para acceder a la galería."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      Alert.alert("Error", "No se pudo seleccionar la imagen");
    }
  }, []);

  const handleRegister = async () => {
  if (!validateForm()) return;

  setLoading(true);
  try {
    let photoUrl = "";

    if (photo) {
      try {
        const uploadResponse = await uploadToCloudinary(photo, {
          fileName: "profile-photo.jpg",
          mimeType: "image/jpeg",
        });
        photoUrl = uploadResponse.secure_url || "";
      } catch (uploadError) {
        console.error("Error uploading photo:", uploadError);
      }
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;

    const userData: any = {
      uid: uid,
      id: uid,
      role: isAdmin ? "admin" : "normal",
      picture: photoUrl,
      userName: email,
      name,
      lastName,
      secondLastName,
      campus,
      createdAt: serverTimestamp(),
    };

    if (!isAdmin) {
      Object.assign(userData, {
        career,
        semester: Number(semester),
        likedEvents: [],
        likedAnnouncements: [],
      });
    }

    await setDoc(doc(db, "users", uid), userData);

    Alert.alert(
      "Registro exitoso",
      "Tu cuenta ha sido creada correctamente",
      [
        {
          text: "Continuar",
          onPress: () => router.replace("/(drawer)"),
        },
      ]
    );
  } catch (error: any) {
    console.error("Error en registro:", error);

    let errorMessage = "Error al registrar usuario";
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "Este correo electrónico ya está registrado";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "El correo electrónico no es válido";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "La contraseña es demasiado débil";
    }

    Alert.alert("Error", errorMessage);
  } finally {
    setLoading(false);
  }
};

  const CampusModal = () => (
    <Modal
      visible={showCampusModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowCampusModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Seleccionar Campus</Text>
            <TouchableOpacity
              onPress={() => setShowCampusModal(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={campuses}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.modalItem,
                  campus === item && styles.modalItemSelected,
                ]}
                onPress={() => {
                  setCampus(item);
                  setShowCampusModal(false);
                }}
              >
                <Text
                  style={[
                    styles.modalItemText,
                    campus === item && styles.modalItemTextSelected,
                  ]}
                >
                  {item}
                </Text>
                {campus === item && (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  const CareerModal = () => (
    <Modal
      visible={showCareerModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowCareerModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Seleccionar Carrera</Text>
            <TouchableOpacity
              onPress={() => setShowCareerModal(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={careers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.modalItem,
                  career === item.name && styles.modalItemSelected,
                ]}
                onPress={() => {
                  setCareer(item.name);
                  setShowCareerModal(false);
                }}
              >
                <Text
                  style={[
                    styles.modalItemText,
                    career === item.name && styles.modalItemTextSelected,
                  ]}
                >
                  {item.name}
                </Text>
                {career === item.name && (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
  const SemesterModal = () => (
    <Modal
      visible={showSemesterModal}
    animationType="slide"
    transparent={true}
    onRequestClose={() => setShowSemesterModal(false)}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Seleccionar Semestre</Text>
          <TouchableOpacity
            onPress={() => setShowSemesterModal(false)}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={semesters}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.modalItem,
                semester === item && styles.modalItemSelected,
              ]}
              onPress={() => {
                setSemester(item);
                setShowSemesterModal(false);
              }}
            >
              <Text
                style={[
                  styles.modalItemText,
                  semester === item && styles.modalItemTextSelected,
                ]}
              >
                Semestre {item}
              </Text>
              {semester === item && (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
    </Modal>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Crear Cuenta</Text>
        </View>
      </View>

      <View style={styles.photoSection}>
        <TouchableOpacity onPress={pickImage} style={styles.photoButton}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photoImage} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Ionicons name="camera" size={32} color="#888" />
              <Text style={styles.photoText}>Agregar foto</Text>
            </View>
          )}
        </TouchableOpacity>
        {photo && (
          <TouchableOpacity
            onPress={() => setPhoto(null)}
            style={styles.removePhotoButton}
          >
            <Ionicons name="close-circle" size={28} color="#ff3b30" />
          </TouchableOpacity>
        )}
      </View>

      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#888"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <View style={styles.inputWithIcon}>
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#888"
          secureTextEntry={!showPassword}
          style={[styles.input, styles.passwordInput]}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <View style={styles.inputWithIcon}>
        <TextInput
          placeholder="Confirmar contraseña"
          placeholderTextColor="#888"
          secureTextEntry={!showConfirmPassword}
          style={[styles.input, styles.passwordInput]}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons
            name={showConfirmPassword ? "eye-off" : "eye"}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      )}

      <TextInput
        placeholder="Nombre"
        placeholderTextColor="#888"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        placeholder="Apellido Paterno"
        placeholderTextColor="#888"
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />
      {errors.lastName && (
        <Text style={styles.errorText}>{errors.lastName}</Text>
      )}

      <TextInput
        placeholder="Apellido Materno"
        placeholderTextColor="#888"
        style={styles.input}
        value={secondLastName}
        onChangeText={setSecondLastName}
      />

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setIsAdmin(!isAdmin)}
      >
        <View style={[styles.checkbox, isAdmin && styles.checkboxChecked]}>
          {isAdmin && <Ionicons name="checkmark" size={16} color="white" />}
        </View>
        <Text style={styles.checkboxText}>Es administrador</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Campus</Text>
      <TouchableOpacity
        style={styles.select}
        onPress={() => setShowCampusModal(true)}
      >
        <Text style={styles.selectText}>{campus}</Text>
        <Ionicons name="chevron-down" size={20} color="#888" />
      </TouchableOpacity>

      {!isAdmin && (
        <>
          <Text style={styles.label}>Carrera</Text>
          <TouchableOpacity
            style={styles.select}
            onPress={() => setShowCareerModal(true)}
          >
            <Text style={styles.selectText}>
              {career || "Seleccionar carrera"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#888" />
          </TouchableOpacity>
          {errors.career && (
            <Text style={styles.errorText}>{errors.career}</Text>
          )}

          <Text style={styles.label}>Semestre</Text>
          <TouchableOpacity
            style={styles.select}
            onPress={() => setShowSemesterModal(true)}
          >
            <Text style={styles.selectText}>
              {semester ? `Semestre ${semester}` : "Seleccionar semestre"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#888" />
          </TouchableOpacity>
          {errors.semester && (
            <Text style={styles.errorText}>{errors.semester}</Text>
          )}
        </>
      )}

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Crear Cuenta</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={{marginTop: 0}}>
        <Text style={styles.link}>Volver al inicio de sesión</Text>
      </TouchableOpacity>

      <CampusModal />
      <CareerModal />
      <SemesterModal/>
    </ScrollView>
    </SafeAreaView>
  );
}
