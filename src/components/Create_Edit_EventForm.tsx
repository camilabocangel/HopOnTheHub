import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Modal,
  FlatList,
  Switch,
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
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import useCreateEventStyles from "@/styles/createEventStyles";
import { getNextEventId } from "@/helpers/eventIdGenerator";

interface CreateEventFormProps {
  onSubmit: (eventData: any) => void;
  onCancel: () => void;
  eventToEdit?: any;
  isEditing?: boolean;
}

const CUSTOM_EVENT_IMAGE =
  "https://www.shutterstock.com/image-vector/under-development-sign-isolated-on-260nw-80415847.jpg";

const eventCategories = [
  "Tecnología",
  "Académico",
  "Cultural",
  "Deportes",
  "Social",
  "Conferencia",
  "Taller",
  "Networking",
  "Otro",
];

const allCampuses = ["La Paz", "Santa Cruz", "Cochabamba"];

// Coordenadas por defecto para cada campus
const DEFAULT_CAMPUS_COORDINATES = {
  "La Paz": { lat: -16.575086023174308, lng: -68.12665110963786 },
  Cochabamba: { lat: -17.39812308534289, lng: -66.21836160542453 },
  "Santa Cruz": { lat: -17.819356242415207, lng: -63.23365145975613 },
};

export default function CreateEventForm({
  onSubmit,
  onCancel,
  eventToEdit,
  isEditing = false,
}: CreateEventFormProps) {
  const { colors } = useThemeColors();
  const { user } = useUser();
  const styles = useCreateEventStyles();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [place, setPlace] = useState("");
  const [selectedCampuses, setSelectedCampuses] = useState<string[]>([
    user?.campus || "La Paz",
  ]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [modality, setModality] = useState<"Presencial" | "Virtual">(
    "Presencial"
  );
  const [loading, setLoading] = useState(false);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (isEditing && eventToEdit) {
      setTitle(eventToEdit.title || "");
      setDescription(eventToEdit.description || "");
      setContent(eventToEdit.content || "");
      setCategory(eventToEdit.category || "");
      setPlace(eventToEdit.place || "");

      const campuses = Array.isArray(eventToEdit.campus)
        ? eventToEdit.campus
        : [eventToEdit.campus || user?.campus || "La Paz"];
      setSelectedCampuses(campuses);

      if (eventToEdit.date) {
        const [year, month, day] = eventToEdit.date.split("-");
        setDate(new Date(parseInt(year), parseInt(month) - 1, parseInt(day)));
      }

      if (eventToEdit.time) {
        const [hours, minutes] = eventToEdit.time.split(":");
        const newTime = new Date();
        newTime.setHours(parseInt(hours), parseInt(minutes));
        setTime(newTime);
      }

      setModality(eventToEdit.modality || "Presencial");
    }
  }, [isEditing, eventToEdit, user?.campus]);

  const handleCampusToggle = (campus: string) => {
    if (selectedCampuses.includes(campus)) {
      if (selectedCampuses.length > 1) {
        setSelectedCampuses(selectedCampuses.filter((c) => c !== campus));
      }
    } else {
      setSelectedCampuses([...selectedCampuses, campus]);
    }
  };

  const handleModalityToggle = () => {
    setModality((prev) => (prev === "Presencial" ? "Virtual" : "Presencial"));
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const formatTime = (date: Date) => {
    return date.toTimeString().split(" ")[0].substring(0, 5);
  };

  const generateLocations = (campuses: string[]) => {
    return campuses.map((campus) => {
      return (
        DEFAULT_CAMPUS_COORDINATES[
          campus as keyof typeof DEFAULT_CAMPUS_COORDINATES
        ] || DEFAULT_CAMPUS_COORDINATES["La Paz"]
      );
    });
  };

  const handleSubmit = async () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !category ||
      !place.trim() ||
      selectedCampuses.length === 0
    ) {
      Alert.alert("Error", "Por favor completa todos los campos obligatorios");
      return;
    }

    setLoading(true);
    try {
      let eventData;
      let eventDocRef;

      // Generar locations automáticamente
      const locations = generateLocations(selectedCampuses);

      if (isEditing && eventToEdit) {
        // Modo edición - actualizar evento existente
        eventData = {
          title: title.trim(),
          description: description.trim(),
          content: content.trim() || description.trim(),
          category,
          place: place.trim(),
          campus: selectedCampuses,
          date: formatDate(date),
          time: formatTime(time),
          modality: modality,
          locations: locations,
          updatedAt: serverTimestamp(),
        };

        // Usar el firestoreId si está disponible, sino generar el ID
        const eventId = eventToEdit.firestoreId || `event-${eventToEdit.id}`;
        eventDocRef = doc(db, "events", eventId);
        await updateDoc(eventDocRef, eventData);

        Alert.alert("Éxito", "Evento actualizado correctamente");
      } else {
        // Modo creación - crear nuevo evento
        const nextId = await getNextEventId();

        eventData = {
          id: nextId,
          title: title.trim(),
          description: description.trim(),
          content: content.trim() || description.trim(),
          category,
          place: place.trim(),
          campus: selectedCampuses,
          date: formatDate(date),
          time: formatTime(time),
          modality: modality,
          locations: locations,
          image: CUSTOM_EVENT_IMAGE,
          status: "pending",
          attendees: [],
          likes: [],
          createdAt: serverTimestamp(),
          createdBy: user?.id,
        };

        eventDocRef = doc(db, "events", `event-${nextId}`);
        await setDoc(eventDocRef, eventData);

        Alert.alert("Éxito", "Evento creado correctamente");
      }

      onSubmit({
        ...eventData,
        id: isEditing ? eventToEdit.id : eventData.id,
        firestoreId: eventDocRef.id,
      });
    } catch (error) {
      console.error("Error creating/updating event:", error);
      Alert.alert(
        "Error",
        `No se pudo ${isEditing ? "actualizar" : "crear"} el evento`
      );
    } finally {
      setLoading(false);
    }
  };

  const CategoryModal = () => (
    <Modal
      visible={showCategoryModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowCategoryModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Seleccionar Categoría</Text>
            <TouchableOpacity
              onPress={() => setShowCategoryModal(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={eventCategories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.modalItem,
                  category === item && styles.modalItemSelected,
                ]}
                onPress={() => {
                  setCategory(item);
                  setShowCategoryModal(false);
                }}
              >
                <Text
                  style={[
                    styles.modalItemText,
                    category === item && styles.modalItemTextSelected,
                  ]}
                >
                  {item}
                </Text>
                {category === item && (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  const isFormValid =
    title.trim() &&
    description.trim() &&
    category &&
    place.trim() &&
    selectedCampuses.length > 0;

  return (
    <View style={styles.formContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {isEditing ? "Editar Evento" : "Crear Nuevo Evento"}
        </Text>
        <Text style={styles.subtitle}>
          {isEditing
            ? "Modifica la información del evento"
            : "Completa la información del evento"}
        </Text>
      </View>

      <ScrollView
        style={styles.fieldsContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Título del Evento *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Ingresa el título del evento"
            placeholderTextColor="#888"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Descripción Corta *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Breve descripción que aparecerá en la lista"
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
            placeholder="Descripción detallada del evento..."
            placeholderTextColor="#888"
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Modalidad *</Text>
          <View style={styles.modalityContainer}>
            <Text style={styles.modalityText}>
              {modality === "Presencial" ? "Presencial" : "Virtual"}
            </Text>
            <Switch
              value={modality === "Virtual"}
              onValueChange={handleModalityToggle}
              trackColor={{ false: "#767577", true: colors.primary }}
              thumbColor={modality === "Virtual" ? colors.primary : "#f4f3f4"}
            />
          </View>
          <Text style={styles.modalityHint}>
            {modality === "Presencial"
              ? "El evento se realizará en ubicaciones físicas"
              : "El evento será completamente virtual"}
          </Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Categoría *</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setShowCategoryModal(true)}
          >
            <Text style={styles.selectButtonText}>
              {category || "Seleccionar categoría"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#888" />
          </TouchableOpacity>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Lugar *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Auditorio Principal, Cancha Deportiva, etc."
            placeholderTextColor="#888"
            value={place}
            onChangeText={setPlace}
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
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeField}>
              <Text style={styles.label}>Fecha *</Text>
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateTimeText}>{formatDate(date)}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dateTimeField}>
              <Text style={styles.label}>Hora *</Text>
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={styles.dateTimeText}>{formatTime(time)}</Text>
              </TouchableOpacity>
            </View>
          </View>
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

      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setTime(selectedTime);
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
            <Text style={styles.submitButtonText}>
              {isEditing ? "Actualizar Evento" : "Crear Evento"}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <CategoryModal />
    </View>
  );
}
