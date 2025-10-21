import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { checkFirebaseConfig } from "@/utils/checkFireBase";

export default function RootLayout() {
  useEffect(() => {
    checkFirebaseConfig();
  }, []);
  
  return (
    <Stack>
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen 
        name="(drawer)" 
        options={{ headerShown: false }}  
      />
    </Stack>
  );
}