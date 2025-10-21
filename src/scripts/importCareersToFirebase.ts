// src/scripts/importCareersToFirebase.ts
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import careers from "@/data/careers";

const careersData = careers;

export const importCareersToFirebase = async () => {
  try {
    console.log("📤 Importando carreras a Firebase...");
    
    for (const career of careersData) {
      const careerId = career.name.toLowerCase().replace(/\s+/g, '-');
      
      await setDoc(doc(db, "careers", careerId), {
        name: career.name,
        semesters: career.semesters,
        createdAt: new Date()
      });
      
      console.log(`✅ Carrera importada: ${career.name}`);
    }
    
    console.log("🎉 Todas las carreras importadas exitosamente");
  } catch (error) {
    console.error("❌ Error importando carreras:", error);
  }
};

// Para ejecutar desde la consola de desarrollo
// importCareersToFirebase();