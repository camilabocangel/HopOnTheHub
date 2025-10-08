import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useAuthStyles } from "../styles/authStyles";
import users from "../data/users";
import { useUser } from "../hooks/useUser";
import { Link, useRouter } from "expo-router";
import { useThemeColors } from "../hooks/useThemeColors";

export default function AuthScreen() {
  const { colors } = useThemeColors();
  const { setUser } = useUser();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const styles = useAuthStyles(colors);

  const handleLogin = () => {
    const foundUser = users.find(
      (u) => u.userName === userName && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      router.replace("/(drawer)");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  const handleNoLogin = () => {
    router.replace("/(drawer)");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/icon_upb.png")}
        style={styles.logo}
      />

      <TextInput
        placeholder="Usuario"
        placeholderTextColor="#888"
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={handleNoLogin}>
        Entrar sin Iniciar Sesión →
      </Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}
