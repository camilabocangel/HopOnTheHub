import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import singleEventsStyles from "@/styles/sinlgeEventStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import MapModal from "@/components/MapModal";
import MapView, { Marker } from "react-native-maps";
import {
  parseCampuses,
  getCampusesCoordinates,
  getMapRegionForCampuses,
  formatCampusName,
} from "@/utils/campusUtils";
import { useLikes } from "@/hooks/useLikes";
import { useUser } from "@/hooks/useUser";
import { usePendingEvents } from "@/hooks/usePendingEvents";
import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";

export default function SingleEventScreen() {
  const { colors } = useThemeColors();
  const params = useLocalSearchParams();
  const router = useRouter();
  const [showMapModal, setShowMapModal] = useState(false);
  const { isEventLiked, toggleEventLikeStatus } = useLikes();
  const { user } = useUser();
  const { updateEventStatus } = usePendingEvents();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Evento",
    });
  }, [navigation]);

  const {
    id,
    title,
    date,
    time,
    place,
    category,
    description,
    image,
    content,
    campus,
    status,
    createdBy,
    createdAt,
  } = params;

  const eventId = id as string;
  const liked = isEventLiked(eventId);
  const isNormal = user ? user?.role === "normal" : false;
  const isAdmin = user?.role === "admin";

  const formatCreatedAt = useMemo(() => {
    if (!createdAt) return "Fecha no disponible";

    try {
      if (typeof createdAt === "string" && createdAt.includes("Timestamp")) {
        const timestamp = JSON.parse(createdAt);
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      }

      const date = new Date(createdAt as string);
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Error formateando fecha:", error);
      return "Fecha no disponible";
    }
  }, [createdAt]);

  const handleLikeToggle = async () => {
    if (!eventId) return;

    const success = await toggleEventLikeStatus(eventId);
    if (!success) {
      Alert.alert("Error", "No se pudo actualizar el like");
    }
  };

  const handleEditEvent = () => {
    const eventData = {
      id: id as string,
      title: title as string,
      date: date as string,
      time: time as string,
      place: place as string,
      category: category as string,
      description: description as string,
      image: image as string,
      content: content as string,
      campus: campus as string,
      status: status as string,
      createdBy: createdBy as string,
      createdAt: createdAt as string,
      firestoreId: id as string,
    };

    router.push({
      pathname: "/(drawer)/create_edit_event",
      params: {
        ...eventData,
        isEditing: "true",
      },
    });
  };

  const handleApproveEvent = async () => {
    try {
      const success = await updateEventStatus(eventId, "accepted");

      if (success) {
        Alert.alert(
          "Evento Aprobado",
          "El evento ha sido aprobado correctamente",
          [
            {
              text: "OK",
              onPress: () => router.back(),
            },
          ]
        );
      } else {
        Alert.alert("Error", "No se pudo aprobar el evento");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo aprobar el evento");
    }
  };

  const handleRejectEvent = async () => {
    try {
      const success = await updateEventStatus(eventId, "rejected");

      if (success) {
        Alert.alert("Evento Rechazado", "El evento ha sido rechazado", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      } else {
        Alert.alert("Error", "No se pudo rechazar el evento");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo rechazar el evento");
    }
  };

  const handleCancelEvent = async () => {
    try {
      const success = await updateEventStatus(eventId, "rejected");

      if (success) {
        Alert.alert("Evento Cancelado", "El evento ha sido cancelado", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      } else {
        Alert.alert("Error", "No se pudo cancelar el evento");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo cancelar el evento");
    }
  };

  const eventCampuses = useMemo(() => {
    return parseCampuses((campus as string) || "la paz");
  }, [campus]);

  const campusesCoordinates = useMemo(() => {
    return getCampusesCoordinates(eventCampuses);
  }, [eventCampuses]);

  const mapRegion = useMemo(() => {
    return getMapRegionForCampuses(eventCampuses);
  }, [eventCampuses]);

  const campusDisplayText = useMemo(() => {
    if (eventCampuses.length === 3) return "Todos los campus";
    if (eventCampuses.length === 2) {
      return eventCampuses
        .map((campus) => formatCampusName(campus))
        .join(" y ");
    }
    return formatCampusName(eventCampuses[0]);
  }, [eventCampuses]);

  const showCreationInfo = isAdmin && (createdBy || createdAt);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={singleEventsStyles.container}>
          <View style={singleEventsStyles.imageContainer}>
            {image ? (
              <Image
                source={{ uri: image as string }}
                style={singleEventsStyles.image}
                resizeMode="cover"
              />
            ) : (
              <View
                style={[
                  singleEventsStyles.placeholderImage,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text style={singleEventsStyles.placeholderText}>
                  {title as string}
                </Text>
              </View>
            )}
          </View>

          <View style={singleEventsStyles.content}>
            <Text style={[singleEventsStyles.title, { color: colors.text }]}>
              {title as string}
            </Text>

            <View style={singleEventsStyles.detailsContainer}>
              <View
                style={[
                  singleEventsStyles.detailRow,
                  { borderBottomColor: colors.border },
                ]}
              >
                <Text
                  style={[
                    singleEventsStyles.detailLabel,
                    { color: colors.subtitle },
                  ]}
                >
                  Fecha:
                </Text>
                <Text
                  style={[
                    singleEventsStyles.detailValue,
                    { color: colors.text },
                  ]}
                >
                  {date as string}
                </Text>
              </View>

              <View
                style={[
                  singleEventsStyles.detailRow,
                  { borderBottomColor: colors.border },
                ]}
              >
                <Text
                  style={[
                    singleEventsStyles.detailLabel,
                    { color: colors.subtitle },
                  ]}
                >
                  Hora:
                </Text>
                <Text
                  style={[
                    singleEventsStyles.detailValue,
                    { color: colors.text },
                  ]}
                >
                  {time as string}
                </Text>
              </View>

              <View
                style={[
                  singleEventsStyles.detailRow,
                  { borderBottomColor: colors.border },
                ]}
              >
                <Text
                  style={[
                    singleEventsStyles.detailLabel,
                    { color: colors.subtitle },
                  ]}
                >
                  Lugar:
                </Text>
                <Text
                  style={[
                    singleEventsStyles.detailValue,
                    { color: colors.text },
                  ]}
                >
                  {place as string}
                </Text>
              </View>

              <View
                style={[
                  singleEventsStyles.detailRow,
                  { borderBottomColor: colors.border },
                ]}
              >
                <Text
                  style={[
                    singleEventsStyles.detailLabel,
                    { color: colors.subtitle },
                  ]}
                >
                  Campus:
                </Text>
                <Text
                  style={[
                    singleEventsStyles.detailValue,
                    { color: colors.primary },
                    eventCampuses.length > 1 && { fontWeight: "bold" },
                  ]}
                >
                  {campusDisplayText}
                </Text>
              </View>

              <View
                style={[
                  singleEventsStyles.detailRow,
                  { borderBottomColor: colors.border },
                ]}
              >
                <Text
                  style={[
                    singleEventsStyles.detailLabel,
                    { color: colors.subtitle },
                  ]}
                >
                  Categoría:
                </Text>
                <Text
                  style={[
                    singleEventsStyles.detailValue,
                    { color: colors.primary },
                  ]}
                >
                  {category as string}
                </Text>
              </View>

              {showCreationInfo && (
                <>
                  {createdBy && (
                    <View
                      style={[
                        singleEventsStyles.detailRow,
                        { borderBottomColor: colors.border },
                      ]}
                    >
                      <Text
                        style={[
                          singleEventsStyles.detailLabel,
                          { color: colors.subtitle },
                        ]}
                      >
                        Creado por:
                      </Text>
                      <Text
                        style={[
                          singleEventsStyles.detailValue,
                          { color: colors.text },
                        ]}
                      >
                        {createdBy as string}
                      </Text>
                    </View>
                  )}

                  {createdAt && (
                    <View
                      style={[
                        singleEventsStyles.detailRow,
                        { borderBottomColor: colors.border },
                      ]}
                    >
                      <Text
                        style={[
                          singleEventsStyles.detailLabel,
                          { color: colors.subtitle },
                        ]}
                      >
                        Fecha de creación:
                      </Text>
                      <Text
                        style={[
                          singleEventsStyles.detailValue,
                          { color: colors.text, fontSize: 12 },
                        ]}
                      >
                        {formatCreatedAt}
                      </Text>
                    </View>
                  )}
                </>
              )}

              {isNormal && (
                <View
                  style={[
                    singleEventsStyles.detailRow,
                    { borderBottomColor: colors.border },
                  ]}
                >
                  <Text
                    style={[
                      singleEventsStyles.detailLabel,
                      { color: colors.subtitle },
                    ]}
                  >
                    Guardar:
                  </Text>
                  <TouchableOpacity
                    onPress={handleLikeToggle}
                    style={singleEventsStyles.likeButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons
                      name={liked ? "heart" : "heart-outline"}
                      size={24}
                      color={liked ? colors.accent : colors.subtitle}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={singleEventsStyles.section}>
              <Text
                style={[
                  singleEventsStyles.sectionTitle,
                  { color: colors.text },
                ]}
              >
                Ubicación
              </Text>
              {eventCampuses.length > 1 && (
                <Text
                  style={[
                    singleEventsStyles.sectionContent,
                    {
                      color: colors.primary,
                      marginBottom: 8,
                      fontWeight: "600",
                      fontSize: 14,
                    },
                  ]}
                >
                  📍 Este evento se realiza en {eventCampuses.length} campus
                </Text>
              )}
              <View style={singleEventsStyles.mapContainer}>
                <MapView
                  style={singleEventsStyles.smallMap}
                  initialRegion={mapRegion}
                  scrollEnabled={false}
                  zoomEnabled={false}
                  rotateEnabled={false}
                  pitchEnabled={false}
                >
                  {campusesCoordinates.map((campusCoord, index) => (
                    <Marker
                      key={index}
                      coordinate={{
                        latitude: campusCoord.latitude,
                        longitude: campusCoord.longitude,
                      }}
                      title={campusCoord.title}
                      description={place as string}
                    />
                  ))}
                </MapView>

                <TouchableOpacity
                  style={[
                    singleEventsStyles.expandButton,
                    { backgroundColor: colors.primary },
                  ]}
                  onPress={() => setShowMapModal(true)}
                >
                  <Ionicons name="expand" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={singleEventsStyles.section}>
              <Text
                style={[
                  singleEventsStyles.sectionTitle,
                  { color: colors.text },
                ]}
              >
                Descripción
              </Text>
              <Text
                style={[
                  singleEventsStyles.sectionContent,
                  { color: colors.text },
                ]}
              >
                {description as string}
              </Text>
            </View>

            {content && (
              <View style={singleEventsStyles.section}>
                <Text
                  style={[
                    singleEventsStyles.sectionTitle,
                    { color: colors.text },
                  ]}
                >
                  Contenido
                </Text>
                <Text
                  style={[
                    singleEventsStyles.sectionContent,
                    { color: colors.text },
                  ]}
                >
                  {content as string}
                </Text>
              </View>
            )}
          </View>
        </View>

        {isAdmin && (
          <View
            style={[
              singleEventsStyles.adminActions,
              { backgroundColor: colors.background },
            ]}
          >
            {/* Para eventos pendientes */}
            {status === "pending" && (
              <>
                <TouchableOpacity
                  style={[
                    singleEventsStyles.actionButton,
                    { backgroundColor: "#ddb503ff" },
                  ]}
                  onPress={handleEditEvent}
                >
                  <Ionicons name="create-outline" size={20} color="white" />
                  <Text style={singleEventsStyles.buttonText}>
                    Editar Evento
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    singleEventsStyles.actionButton,
                    { backgroundColor: "#4CAF50" },
                  ]}
                  onPress={handleApproveEvent}
                >
                  <Ionicons name="checkmark-circle" size={20} color="white" />
                  <Text style={singleEventsStyles.buttonText}>
                    Aceptar Evento
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    singleEventsStyles.actionButton,
                    { backgroundColor: "#f44336" },
                  ]}
                  onPress={handleRejectEvent}
                >
                  <Ionicons name="close-circle" size={20} color="white" />
                  <Text style={singleEventsStyles.buttonText}>
                    Rechazar Evento
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* Para eventos aceptados - Botón de cancelar */}
            {status === "accepted" && (
              <>
                <TouchableOpacity
                  style={[
                    singleEventsStyles.actionButton,
                    { backgroundColor: "#ddb503ff" },
                  ]}
                  onPress={handleEditEvent}
                >
                  <Ionicons name="create-outline" size={20} color="white" />
                  <Text style={singleEventsStyles.buttonText}>
                    Editar Evento
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    singleEventsStyles.actionButton,
                    { backgroundColor: "#f44336" },
                  ]}
                  onPress={handleCancelEvent}
                >
                  <Ionicons name="close-circle" size={20} color="white" />
                  <Text style={singleEventsStyles.buttonText}>
                    Cancelar Evento
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* Para eventos rechazados - Solo editar */}
            {status === "rejected" && (
              <TouchableOpacity
                style={[
                  singleEventsStyles.actionButton,
                  { backgroundColor: "#ddb503ff" },
                ]}
                onPress={handleEditEvent}
              >
                <Ionicons name="create-outline" size={20} color="white" />
                <Text style={singleEventsStyles.buttonText}>
                  Editar Evento
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      <MapModal
        visible={showMapModal}
        onClose={() => setShowMapModal(false)}
        campuses={campusesCoordinates}
        place={place as string}
        isMultiCampus={eventCampuses.length > 1}
      />
    </SafeAreaView>
  );
}