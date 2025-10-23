import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import { useAuthStyles } from "../../src/styles/authStyles";
import { auth } from "../../src/config/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { LoadingSplash } from "@/components/LoadingSplash";
import { useUser } from "@/hooks/useUser";

export default function AuthScreen() {
  const { colors } = useThemeColors();
  const router = useRouter();
  const styles = useAuthStyles();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user, logout } = useUser();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);

      setTimeout(() => {
        setIsLoading(false);
        if (user) {
          if (user.role === "admin") {
            router.replace("/(admin)");
          } else if (user.role === "normal") {
            router.replace("/(drawer)");
          }
        }
      }, 1500);
    } catch (e: any) {
      setIsLoading(false);
      console.error("Error login:", e);
      if (e.code === "auth/invalid-credential") {
        setError("Usuario o contraseña incorrectos");
      } else if (e.code === "auth/too-many-requests") {
        setError("Demasiados intentos. Intenta más tarde");
      } else {
        setError("Error al iniciar sesión");
      }
    }
  };
  if (isLoading) {
    return <LoadingSplash />;
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Por favor ingresa tu correo");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Correo enviado",
        "Se ha enviado un correo de recuperación a tu dirección."
      );
    } catch (e) {
      setError("Error al enviar el correo, verifica tu email.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/icon_upb.png")}
        style={styles.logo}
      />

      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      <View style={styles.inputWithIcon}>
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.input}
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

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/register")}>
        <Text style={styles.link}>Crear cuenta nueva</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}
