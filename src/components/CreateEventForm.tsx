import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal
} from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";
import createEventStyles from "@/styles/createEventStyles";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from "react-native-calendars";

const styles = createEventStyles;

type EventFormData = {
  title: string;
  description: string;
  date: string;
  time: string;
  place: string;
  category: string;
};

type Props = {
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
};

export default function CreateEventForm({ onSubmit, onCancel }: Props) {
  const { colors } = useThemeColors();
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    date: "",
    time: "",
    place: "",
    category: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.date || !formData.place.trim()) {
      Alert.alert("Error", "Por favor completa los campos obligatorios");
      return;
    }
    onSubmit(formData);
  };

  const updateField = (field: keyof EventFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  const handleDateSelect = (day: any) => {
    const dateString = day.dateString; 
    setFormData(prev => ({ ...prev, date: dateString }));
    setShowDatePicker(false);
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false); // Cerramos el picker después de seleccionar
    
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}`;
      setFormData(prev => ({ ...prev, time: timeString }));
    }
  };
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Crear Nuevo Evento
        </Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Completa la información del evento
        </Text>
      </View>

      <View style={styles.fieldsContainer}>
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.text }]}>
            Título del Evento *
          </Text>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            placeholder="Ingresa el título del evento"
            placeholderTextColor={colors.text}
            value={formData.title}
            onChangeText={(value) => updateField("title", value)}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.text }]}>
            Descripción
          </Text>
          <TextInput
            style={[
              styles.textArea,
              {
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            placeholder="Describe el evento..."
            placeholderTextColor={colors.text}
            value={formData.description}
            onChangeText={(value) => updateField("description", value)}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Fecha */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.text }]}>
            Fecha *
          </Text>
          <TouchableOpacity
            style={[
              styles.dateTimeButton,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={[styles.dateTimeText, { 
              color: formData.date ? colors.text : colors.text 
            }]}>
              {formData.date ? formatDisplayDate(formData.date) : "Seleccionar fecha"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Hora */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.text }]}>
            Hora
          </Text>
          <TouchableOpacity
            style={[
              styles.dateTimeButton,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={[styles.dateTimeText, { 
              color: formData.time ? colors.text : colors.text 
            }]}>
              {formData.time ? formData.time : "Seleccionar hora"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Lugar */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.text }]}>
            Lugar *
          </Text>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            placeholder="¿Dónde será el evento?"
            placeholderTextColor={colors.text}
            value={formData.place}
            onChangeText={(value) => updateField("place", value)}
          />
        </View>

        {/* Categoría */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.text }]}>
            Categoría
          </Text>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            placeholder="Ej: Académico, Social, Deportes..."
            placeholderTextColor={colors.text}
            value={formData.category}
            onChangeText={(value) => updateField("category", value)}
          />
        </View>
      </View>
      <Modal
        visible={showDatePicker}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={[
            styles.modalContent, 
            { backgroundColor: colors.background }
          ]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Seleccionar Fecha
              </Text>
              <TouchableOpacity 
                onPress={() => setShowDatePicker(false)}
                style={styles.closeButton}
              >
                <Text style={[styles.closeButtonText, { color: colors.primary }]}>
                  Cerrar
                </Text>
              </TouchableOpacity>
            </View>
            
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={{
                [formData.date]: {
                  selected: true,
                  selectedColor: colors.primary,
                }
              }}
              theme={{
                backgroundColor: colors.background,
                calendarBackground: colors.background,
                textSectionTitleColor: colors.text,
                selectedDayBackgroundColor: colors.primary,
                selectedDayTextColor: '#ffffff',
                todayTextColor: colors.primary,
                dayTextColor: colors.text,
                textDisabledColor: colors.text,
                arrowColor: colors.primary,
                monthTextColor: colors.text,
                indicatorColor: colors.primary,
              }}
            />
          </View>
        </View>
      </Modal>

      {/* Time Picker (Android) */}
      {showTimePicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}

      {/* Botones de Acción */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[
            styles.cancelButton,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
          onPress={onCancel}
        >
          <Text style={[styles.cancelButtonText, { color: colors.text }]}>
            Cancelar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: colors.primary },
          ]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>
            Crear Evento
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}