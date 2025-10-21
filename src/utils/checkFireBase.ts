import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const checkFirebaseConfig = () => {
  const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  };

  console.log('🔍 Verificando configuración Firebase:');
  Object.entries(firebaseConfig).forEach(([key, value]) => {
    console.log(`${key}: ${value ? '✅' : '❌'} ${value || 'NO DEFINIDO'}`);
  });

  try {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    console.log('✅ Firebase configurado correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error configurando Firebase:', error);
    return false;
  }
};