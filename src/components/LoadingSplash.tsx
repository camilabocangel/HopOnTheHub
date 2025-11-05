import React from "react";
import { View, ActivityIndicator, Image, StyleSheet, Text } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors"; 
import { SafeAreaView } from "react-native-safe-area-context";

export const LoadingSplash = () => {
  const { colors } = useThemeColors(); 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.loadingSplash }}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/icon_upb.png")}
          style={styles.logo}
        />
        <ActivityIndicator size="large" color={colors.accent} style={{ marginTop: 20 }} />
        <Text style={[styles.text, { color: colors.textSplash }]}>
          Iniciando sesión...
        </Text>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
  },
});