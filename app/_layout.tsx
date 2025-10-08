import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen 
        name="home" 
        options={{ 
          headerTitle: "UPB",
          headerTitleAlign: 'center'
        }} 
      />
    </Stack>
  );
}
