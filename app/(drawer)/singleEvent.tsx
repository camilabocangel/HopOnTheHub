import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import singleEventsStyles from "@/styles/singleEventStyles";
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
import { ScreenTransitionView } from "@/components/ScreenTransitionView";
import { useScreenTransition } from "@/hooks/useScreenTransition";
import { AnimatedLikeButton } from "@/components/AnimatedLikeButton";
import { notifyEventStatusChange } from "@/services/notificationService";

interface FirebaseTimestamp {
  seconds: number;
  nanoseconds?: number;
}

export default function SingleEventScreen() {
  const { colors } = useThemeColors();
  const params = useLocalSearchParams();
  const router = useRouter();
  const [showMapModal, setShowMapModal] = useState(false);
  const { isEventLiked, toggleEventLikeStatus } = useLikes();
  const { user } = useUser();
  const { updateEventStatus } = usePendingEvents();
  const navigation = useNavigation();
  const screenTransition = useScreenTransition(0);

  const [actionLoading, setActionLoading] = useState<{
    approve?: boolean;
    reject?: boolean;
    cancel?: boolean;
  }>({});

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Evento",
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      screenTransition.enter({ duration: 500, delay: 100 });
      return () => {
        screenTransition.exit({ duration: 0 });
      };
    }, [])
  );

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

  const eventId = Array.isArray(id) ? id[0] : id;
  const eventTitle = Array.isArray(title) ? title[0] : title;
  const eventDate = Array.isArray(date) ? date[0] : date;
  const eventTime = Array.isArray(time) ? time[0] : time;
  const eventPlace = Array.isArray(place) ? place[0] : place;
  const eventCategory = Array.isArray(category) ? category[0] : category;
  const eventDescription = Array.isArray(description)
    ? description[0]
    : description;
  const eventImage = Array.isArray(image) ? image[0] : image;
  const eventContent = Array.isArray(content) ? content[0] : content;
  const eventCampus = Array.isArray(campus) ? campus[0] : campus;
  const eventStatus = Array.isArray(status) ? status[0] : status;
  const eventCreatedBy = Array.isArray(createdBy) ? createdBy[0] : createdBy;
  const eventCreatedAt = Array.isArray(createdAt) ? createdAt[0] : createdAt;
  const eventCreatorPushToken = Array.isArray(params.creatorPushToken)
    ? params.creatorPushToken[0]
    : params.creatorPushToken;

  const liked = isEventLiked(eventId || "");
  const isNormal = user ? user?.role === "normal" : false;
  const isAdmin = user?.role === "admin";

  const formatCreatedAt = useMemo(() => {
    if (!eventCreatedAt) {
      return "Fecha no disponible";
    }

    try {
      if (typeof eventCreatedAt === "string") {
        if (
          eventCreatedAt.trim().startsWith("{") &&
          eventCreatedAt.trim().endsWith("}")
        ) {
          try {
            const timestampObj = JSON.parse(
              eventCreatedAt
            ) as FirebaseTimestamp;

            if (timestampObj && typeof timestampObj.seconds === "number") {
              const date = new Date(timestampObj.seconds * 1000);
              const result = date.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
              return result;
            }
          } catch (e) {}
        }

        const date = new Date(eventCreatedAt);
        if (!isNaN(date.getTime())) {
          const result = date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
          return result;
        }
      }

      return "Fecha no disponible";
    } catch (error) {
      console.error("Error formateando fecha:", error);
      return "Fecha no disponible";
    }
  }, [eventCreatedAt]);

  const handleLikeToggle = async () => {
    if (!eventId) return false;

    const success = await toggleEventLikeStatus(eventId);
    if (!success) {
      Alert.alert("Error", "No se pudo actualizar el like");
      return false;
    }
    return true;
  };

  const handleEditEvent = () => {
    if (!eventId) return;

    const eventData = {
      id: eventId,
      title: eventTitle || "",
      date: eventDate || "",
      time: eventTime || "",
      place: eventPlace || "",
      category: eventCategory || "",
      description: eventDescription || "",
      image: eventImage || "",
      content: eventContent || "",
      campus: eventCampus || "",
      status: eventStatus || "",
      createdBy: eventCreatedBy || "",
      createdAt: eventCreatedAt || "",
      firestoreId: eventId,
      creatorPushToken: eventCreatorPushToken || null,
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
    if (!eventId) return;

    setActionLoading({ approve: true });
    try {
      const success = await updateEventStatus(eventId, "accepted");
      if (success) {
        await notifyEventStatusChange(
          eventId,
          eventTitle || "Tu evento",
          "accepted",
          eventCreatorPushToken
        );

        Alert.alert(
          "Evento Aprobado",
          "El evento ha sido aprobado correctamente",
          [{ text: "OK", onPress: () => router.back() }]
        );
      } else {
        Alert.alert("Error", "No se pudo aprobar el evento");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo aprobar el evento");
    } finally {
      setActionLoading({});
    }
  };

  const handleRejectEvent = async () => {
    if (!eventId) return;

    setActionLoading({ reject: true });
    try {
      const success = await updateEventStatus(eventId, "rejected");
      if (success) {
        await notifyEventStatusChange(
          eventId,
          eventTitle || "Tu evento",
          "rejected",
          eventCreatorPushToken
        );

        Alert.alert("Evento Rechazado", "El evento ha sido rechazado", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } else {
        Alert.alert("Error", "No se pudo rechazar el evento");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo rechazar el evento");
    } finally {
      setActionLoading({});
    }
  };

  const handleCancelEvent = async () => {
    if (!eventId) return;

    setActionLoading({ cancel: true });
    try {
      const success = await updateEventStatus(eventId, "rejected");

      if (success) {
        await notifyEventStatusChange(
          eventId,
          eventTitle || "Tu evento",
          "rejected",
          eventCreatorPushToken
        );

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
    } finally {
      setActionLoading({});
    }
  };

  const eventCampuses = useMemo(() => {
    return parseCampuses(eventCampus || "la paz");
  }, [eventCampus]);

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

  const showCreationInfo = isAdmin && (eventCreatedBy || eventCreatedAt);

  if (!eventId) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={singleEventsStyles.container}>
          <Text style={[singleEventsStyles.title, { color: colors.text }]}>
            Error: Evento no encontrado
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenTransitionView duration={500} delay={100}>
        <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
          <View style={singleEventsStyles.container}>
            <Animated.View
              style={[
                singleEventsStyles.imageContainer,
                {
                  opacity: screenTransition.opacity,
                  transform: [
                    {
                      scale: screenTransition.opacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              {eventImage ? (
                <Image
                  source={{ uri: eventImage }}
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
                    {eventTitle}
                  </Text>
                </View>
              )}
            </Animated.View>

            <View style={singleEventsStyles.content}>
              <Animated.Text
                style={[
                  singleEventsStyles.title,
                  {
                    color: colors.text,
                    opacity: screenTransition.opacity,
                    transform: [{ translateY: screenTransition.translateY }],
                  },
                ]}
              >
                {eventTitle}
              </Animated.Text>

              <View style={singleEventsStyles.detailsContainer}>
                {[
                  { label: "Fecha:", value: eventDate },
                  { label: "Hora:", value: eventTime },
                  { label: "Lugar:", value: eventPlace },
                  {
                    label: "Campus:",
                    value: campusDisplayText,
                    special: true,
                  },
                  { label: "Categoría:", value: eventCategory },
                ].map((detail, index) => (
                  <Animated.View
                    key={detail.label}
                    style={[
                      singleEventsStyles.detailRow,
                      { borderBottomColor: colors.border },
                      {
                        opacity: screenTransition.opacity,
                        transform: [
                          {
                            translateY: screenTransition.translateY.interpolate(
                              {
                                inputRange: [0, 30],
                                outputRange: [0, 10 - index * 5],
                              }
                            ),
                          },
                        ],
                      },
                    ]}
                  >
                    <Text
                      style={[
                        singleEventsStyles.detailLabel,
                        { color: colors.subtitle },
                      ]}
                    >
                      {detail.label}
                    </Text>
                    <Text
                      style={[
                        singleEventsStyles.detailValue,
                        {
                          color: detail.special ? colors.primary : colors.text,
                          fontWeight: detail.special ? "bold" : "normal",
                        },
                      ]}
                    >
                      {detail.value}
                    </Text>
                  </Animated.View>
                ))}

                {showCreationInfo && (
                  <>
                    {eventCreatedBy && (
                      <Animated.View
                        style={[
                          singleEventsStyles.detailRow,
                          { borderBottomColor: colors.border },
                          {
                            opacity: screenTransition.opacity,
                            transform: [
                              { translateY: screenTransition.translateY },
                            ],
                          },
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
                          {eventCreatedBy}
                        </Text>
                      </Animated.View>
                    )}

                    {eventCreatedAt && (
                      <Animated.View
                        style={[
                          singleEventsStyles.detailRow,
                          { borderBottomColor: colors.border },
                          {
                            opacity: screenTransition.opacity,
                            transform: [
                              { translateY: screenTransition.translateY },
                            ],
                          },
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
                      </Animated.View>
                    )}
                  </>
                )}

                {isNormal && (
                  <Animated.View
                    style={[
                      singleEventsStyles.detailRow,
                      { borderBottomColor: colors.border },
                      {
                        opacity: screenTransition.opacity,
                        transform: [
                          { translateY: screenTransition.translateY },
                        ],
                      },
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
                    <AnimatedLikeButton
                      isLiked={liked}
                      onPress={handleLikeToggle}
                      size={24}
                      color={colors.subtitle}
                      likedColor={colors.accent}
                      style={singleEventsStyles.likeButton}
                    />
                  </Animated.View>
                )}
              </View>

              <Animated.View
                style={[
                  singleEventsStyles.section,
                  {
                    opacity: screenTransition.opacity,
                    transform: [{ translateY: screenTransition.translateY }],
                  },
                ]}
              >
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
              </Animated.View>

              <Animated.View
                style={[
                  singleEventsStyles.section,
                  {
                    opacity: screenTransition.opacity,
                    transform: [{ translateY: screenTransition.translateY }],
                  },
                ]}
              >
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
              </Animated.View>

              {content && (
                <Animated.View
                  style={[
                    singleEventsStyles.section,
                    {
                      opacity: screenTransition.opacity,
                      transform: [{ translateY: screenTransition.translateY }],
                    },
                  ]}
                >
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
                </Animated.View>
              )}
            </View>

            {isAdmin && (
              <Animated.View
                style={[
                  singleEventsStyles.adminActions,
                  { backgroundColor: colors.background },
                  {
                    opacity: screenTransition.opacity,
                    transform: [{ translateY: screenTransition.translateY }],
                  },
                ]}
              >
                {status === "pending" && (
                  <>
                    <View style={singleEventsStyles.editButtonContainer}>
                      <TouchableOpacity
                        style={[
                          singleEventsStyles.actionButton,
                          singleEventsStyles.editButton,
                          { backgroundColor: "#ddb503ff" },
                        ]}
                        onPress={handleEditEvent}
                      >
                        <Ionicons
                          name="create-outline"
                          size={20}
                          color="white"
                        />
                        <Text style={singleEventsStyles.buttonText}>
                          Editar Evento
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={singleEventsStyles.rowButtonsContainer}>
                      <TouchableOpacity
                        style={[
                          singleEventsStyles.actionButton,
                          singleEventsStyles.rowButton,
                          { backgroundColor: "#4CAF50" },
                          actionLoading.approve &&
                            singleEventsStyles.actionButtonDisabled,
                        ]}
                        onPress={handleApproveEvent}
                        disabled={actionLoading.approve}
                      >
                        {actionLoading.approve ? (
                          <ActivityIndicator size="small" color="white" />
                        ) : (
                          <>
                            <Ionicons
                              name="checkmark-circle"
                              size={20}
                              color="white"
                            />
                            <Text style={singleEventsStyles.buttonText}>
                              Aceptar
                            </Text>
                          </>
                        )}
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          singleEventsStyles.actionButton,
                          singleEventsStyles.rowButton,
                          { backgroundColor: "#f44336" },
                          actionLoading.reject &&
                            singleEventsStyles.actionButtonDisabled,
                        ]}
                        onPress={handleRejectEvent}
                        disabled={actionLoading.reject}
                      >
                        {actionLoading.reject ? (
                          <ActivityIndicator size="small" color="white" />
                        ) : (
                          <>
                            <Ionicons
                              name="close-circle"
                              size={20}
                              color="white"
                            />
                            <Text style={singleEventsStyles.buttonText}>
                              Rechazar
                            </Text>
                          </>
                        )}
                      </TouchableOpacity>
                    </View>
                  </>
                )}
                {status === "accepted" && (
                  <>
                    {eventStatus !== "rejected" && (
                      <View style={singleEventsStyles.editButtonContainer}>
                        <TouchableOpacity
                          style={[
                            singleEventsStyles.actionButton,
                            singleEventsStyles.editButton,
                            { backgroundColor: "#ddb503ff" },
                          ]}
                          onPress={handleEditEvent}
                        >
                          <Ionicons
                            name="create-outline"
                            size={20}
                            color="white"
                          />
                          <Text style={singleEventsStyles.buttonText}>
                            Editar Evento
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    <View style={singleEventsStyles.rowButtonsContainer}>
                      <TouchableOpacity
                        style={[
                          singleEventsStyles.actionButton,
                          singleEventsStyles.rowButton,
                          { backgroundColor: "#f44336" },
                          actionLoading.cancel &&
                            singleEventsStyles.actionButtonDisabled,
                        ]}
                        onPress={handleCancelEvent}
                        disabled={actionLoading.cancel}
                      >
                        {actionLoading.cancel ? (
                          <ActivityIndicator size="small" color="white" />
                        ) : (
                          <>
                            <Ionicons
                              name="close-circle"
                              size={20}
                              color="white"
                            />
                            <Text style={singleEventsStyles.buttonText}>
                              Cancelar Evento
                            </Text>
                          </>
                        )}
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </Animated.View>
            )}
          </View>
        </ScrollView>
      </ScreenTransitionView>

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
