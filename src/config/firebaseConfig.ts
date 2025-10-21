// src/config/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Verifica que todas las variables estén definidas
console.log('Firebase Config:', {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ? '✅ Definida' : '❌ No definida',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Definida' : '❌ No definida',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Definida' : '❌ No definida',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ? '✅ Definida' : '❌ No definida',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? '✅ Definida' : '❌ No definida',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID ? '✅ Definida' : '❌ No definida',
});

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  // measurementId es opcional, no lo necesitas para lo básico
};

// Verifica que la configuración sea válida
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('❌ Configuración de Firebase incompleta');
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log('✅ Firebase inicializado correctamente');