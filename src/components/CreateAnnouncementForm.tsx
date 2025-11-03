import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useUser } from "@/hooks/useUser";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import useCreateAnnouncementStyles from "@/styles/createAnnouncementStyles";
import { getNextAnnouncementId } from "@/helpers/announcementIdGenerator";

interface CreateAnnouncementFormProps {
  onSubmit: (announcementData: any) => void;
  onCancel: () => void;
}

const CUSTOM_ANNOUNCEMENT_IMAGE =
  "https://www.shutterstock.com/image-vector/under-development-sign-isolated-on-260nw-80415847.jpg";

const allCampuses = ["La Paz", "Santa Cruz", "Cochabamba"];

export default function CreateAnnouncementForm({
  onSubmit,
  onCancel,
}: CreateAnnouncementFormProps) {
  const { colors } = useThemeColors();
  const { user } = useUser();
  const styles = useCreateAnnouncementStyles();

  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [selectedCampuses, setSelectedCampuses] = useState<string[]>([
    user?.campus || "La Paz",
  ]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCampusToggle = (campus: string) => {
    if (selectedCampuses.includes(campus)) {
      if (selectedCampuses.length > 1) {
        setSelectedCampuses(selectedCampuses.filter((c) => c !== campus));
      }
    } else {
      setSelectedCampuses([...selectedCampuses, campus]);
    }
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = async () => {
    if (!description.trim() || selectedCampuses.length === 0) {
      Alert.alert("Error", "Por favor completa todos los campos obligatorios");
      return;
    }

    setLoading(true);
    try {
      const nextId = await getNextAnnouncementId();

      const firestoreId = `announcement-${nextId}`;

      const announcementData = {
        id: nextId,
        description: description.trim(),
        content: content.trim() || description.trim(),
        campus: selectedCampuses,
        date: formatDate(date),
        image: CUSTOM_ANNOUNCEMENT_IMAGE,
        status: "pending",
        likes: [],
        createdAt: serverTimestamp(),
        createdBy: user?.name + " " + user?.lastName || "Usuario Desconocido",
      };

      const announcementRef = doc(db, "announcements", firestoreId);
      await setDoc(announcementRef, announcementData);

      Alert.alert(
        "Éxito",
        "Anuncio creado correctamente. Está pendiente de aprobación."
      );

      setDescription("");
      setContent("");
      setSelectedCampuses([user?.campus || "La Paz"]);
      setDate(new Date());

      onSubmit(announcementData);
    } catch (error) {
      console.error("Error creating announcement:", error);
      Alert.alert("Error", "No se pudo crear el anuncio");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = description.trim() && selectedCampuses.length > 0;

  return (
    <View style={styles.formContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Crear Nuevo Anuncio</Text>
        <Text style={styles.subtitle}>Completa la información del anuncio</Text>
      </View>

      <ScrollView
        style={styles.fieldsContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Descripción del Anuncio *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Describe brevemente el anuncio..."
            placeholderTextColor="#888"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Contenido Completo</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Información detallada del anuncio..."
            placeholderTextColor="#888"
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Campus *</Text>
          <View style={styles.campusContainer}>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {allCampuses.map((campusItem) => (
                <View key={campusItem} style={styles.campusCheckboxRow}>
                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => handleCampusToggle(campusItem)}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        selectedCampuses.includes(campusItem) &&
                          styles.checkboxChecked,
                      ]}
                    >
                      {selectedCampuses.includes(campusItem) && (
                        <Ionicons name="checkmark" size={16} color="white" />
                      )}
                    </View>
                    <Text style={styles.checkboxText}>
                      {campusItem}
                      {campusItem === user?.campus && " (tu campus)"}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <Text style={styles.campusHint}>Selecciona al menos un campus</Text>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Fecha del Anuncio *</Text>
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateTimeText}>{formatDate(date)}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onCancel}
          disabled={loading}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.submitButton,
            !isFormValid && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={loading || !isFormValid}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.submitButtonText}>Crear Anuncio</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
