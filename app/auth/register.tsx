// app/auth/register.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/config/firebaseConfig";
import { useRouter } from "expo-router";
import { useRegisterStyles } from "@/styles/registerStyles";
import { Ionicons } from "@expo/vector-icons";
import { fetchCareers } from "@/helpers/fetchCareers ";

export default function RegisterScreen() {
  const styles = useRegisterStyles();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [secondLastName, setSecondLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [campus, setCampus] = useState("La Paz");
  const [career, setCareer] = useState("");
  const [semester, setSemester] = useState<number | null>(null);
  
  const [careers, setCareers] = useState<{ id: string; name: string }[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const campuses = ["La Paz", "Santa Cruz", "Cochabamba"];

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCareers();
        setCareers(data as any);
      } catch (error) {
        console.error("Error fetching careers:", error);
      }
    })();
  }, []);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!email) newErrors.email = "El correo es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Correo no válido";

    if (!password) newErrors.password = "La contraseña es obligatoria";
    else if (password.length < 6) newErrors.password = "Mínimo 6 caracteres";

    if (!confirmPassword) newErrors.confirmPassword = "Confirma tu contraseña";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";

    if (!name) newErrors.name = "El nombre es obligatorio";
    if (!lastName) newErrors.lastName = "El apellido paterno es obligatorio";
    if (!birthday) newErrors.birthday = "La fecha de nacimiento es obligatoria";

    if (!isAdmin && !career) newErrors.career = "Selecciona una carrera";
    if (!isAdmin && !semester) newErrors.semester = "El semestre es obligatorio";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      const userData: any = {
        id: uid,
        role: isAdmin ? "admin" : "normal",
        userName: email,
        name,
        lastName,
        secondLastName,
        birthday,
        campus,
        createdAt: serverTimestamp()
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
            onPress: () => router.replace("/(drawer)") 
          }
        ]
      );
      
    } catch (error: any) {
      console.error("Error en registro:", error);
      
      let errorMessage = "Error al registrar usuario";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Este correo electrónico ya está registrado";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "El correo electrónico no es válido";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "La contraseña es demasiado débil";
      }
      
      Alert.alert("❌ Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const nextOption = (current: string, options: string[]) => {
    const currentIndex = options.indexOf(current);
    return options[(currentIndex + 1) % options.length];
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>

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
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

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
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

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
      {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

      <TextInput
        placeholder="Apellido Materno"
        placeholderTextColor="#888"
        style={styles.input}
        value={secondLastName}
        onChangeText={setSecondLastName}
      />

      <TextInput
        placeholder="Fecha de Nacimiento (AAAA-MM-DD)"
        placeholderTextColor="#888"
        style={styles.input}
        value={birthday}
        onChangeText={setBirthday}
      />
      {errors.birthday && <Text style={styles.errorText}>{errors.birthday}</Text>}

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
        onPress={() => setCampus(nextOption(campus, campuses))}
      >
        <Text style={styles.select}>{campus}</Text>
      </TouchableOpacity>

      {!isAdmin && (
        <>
          <Text style={styles.label}>Carrera</Text>
          <TouchableOpacity
            onPress={() => {
              if (careers.length > 0) {
                const next = nextOption(career, careers.map(c => c.name));
                setCareer(next);
              }
            }}
          >
            <Text style={styles.select}>{career || "Seleccionar carrera"}</Text>
          </TouchableOpacity>
          {errors.career && <Text style={styles.errorText}>{errors.career}</Text>}

          <TextInput
            placeholder="Semestre (1-10)"
            placeholderTextColor="#888"
            style={styles.input}
            keyboardType="numeric"
            value={semester?.toString() || ""}
            onChangeText={(v) => setSemester(v ? Number(v) : null)}
          />
          {errors.semester && <Text style={styles.errorText}>{errors.semester}</Text>}
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

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.link}>← Volver al inicio de sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}