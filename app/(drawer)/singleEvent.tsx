import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
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
  convertToCampusKeys,
  CampusKey,
} from "@/utils/campusUtils";
import { useLikes } from "@/hooks/useLikes";
import { useUser } from "@/hooks/useUser";
import { usePendingEvents } from "@/hooks/usePendingEvents";
import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { ScreenTransitionView } from "@/components/ScreenTransitionView";
import { useScreenTransition } from "@/hooks/useScreenTransition";
import { Animated } from 'react-native';
import { AnimatedLikeButton } from "@/components/AnimatedLikeButton";

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
  } = params;

  const eventId = id as string;
  const liked = isEventLiked(eventId);

  const isNormal = user ? user?.role === "normal" : false;

  const handleLikeToggle = async () => {
    if (!eventId) return false;

    const success = await toggleEventLikeStatus(eventId);
    if (!success) {
      Alert.alert("Error", "No se pudo actualizar el like");
      return false
    }
    return true;
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
        .map((campus) => campus.charAt(0).toUpperCase() + campus.slice(1))
        .join(" y ");
    }
    return eventCampuses[0].charAt(0).toUpperCase() + eventCampuses[0].slice(1);
  }, [eventCampuses]);

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
                  transform: [{
                    scale: screenTransition.opacity.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1],
                    })
                  }]
                }
              ]}
            >
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
            </Animated.View>

            <View style={singleEventsStyles.content}>
              <Animated.Text 
                style={[
                  singleEventsStyles.title, 
                  { 
                    color: colors.text,
                    opacity: screenTransition.opacity,
                    transform: [{ translateY: screenTransition.translateY }]
                  }
                ]}
              >
                {title as string}
              </Animated.Text>

              <View style={singleEventsStyles.detailsContainer}>
                {[
                  { label: "Fecha:", value: date as string },
                  { label: "Hora:", value: time as string },
                  { label: "Lugar:", value: place as string },
                  { 
                    label: "Campus:", 
                    value: campusDisplayText,
                    special: true 
                  },
                  { label: "Categoría:", value: category as string },
                ].map((detail, index) => (
                  <Animated.View
                    key={detail.label}
                    style={[
                      singleEventsStyles.detailRow,
                      { borderBottomColor: colors.border },
                      {
                        opacity: screenTransition.opacity,
                        transform: [{
                          translateY: screenTransition.translateY.interpolate({
                            inputRange: [0, 30],
                            outputRange: [0, 10 - (index * 5)],
                          })
                        }]
                      }
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
                          fontWeight: detail.special ? "bold" : "normal"
                        },
                      ]}
                    >
                      {detail.value}
                    </Text>
                  </Animated.View>
                ))}

                {isNormal && (
                  <Animated.View
                    style={[
                      singleEventsStyles.detailRow,
                      { borderBottomColor: colors.border },
                      {
                        opacity: screenTransition.opacity,
                        transform: [{ translateY: screenTransition.translateY }]
                      }
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
                    transform: [{ translateY: screenTransition.translateY }]
                  }
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
                    transform: [{ translateY: screenTransition.translateY }]
                  }
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
                      transform: [{ translateY: screenTransition.translateY }]
                    }
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
          </View>

          {user?.role === "admin" && (
            <Animated.View
              style={[
                singleEventsStyles.adminActions,
                { backgroundColor: colors.background },
                {
                  opacity: screenTransition.opacity,
                  transform: [{ translateY: screenTransition.translateY }]
                }
              ]}
            >
              <TouchableOpacity
                style={[
                  singleEventsStyles.actionButton,
                  { backgroundColor: "#ddb503ff" },
                ]}
                onPress={handleEditEvent}
              >
                <Ionicons name="checkmark-circle" size={20} color="white" />
                <Text style={singleEventsStyles.buttonText}>Editar Evento</Text>
              </TouchableOpacity>
              {status === "pending" && (
                <>
                  <TouchableOpacity
                    style={[
                      singleEventsStyles.actionButton,
                      { backgroundColor: "#4CAF50" },
                    ]}
                    onPress={handleApproveEvent}
                  >
                    <Ionicons name="checkmark-circle" size={20} color="white" />
                    <Text style={singleEventsStyles.buttonText}>Aceptar Evento</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      singleEventsStyles.actionButton,
                      { backgroundColor: "#f44336" },
                    ]}
                    onPress={handleRejectEvent}
                  >
                    <Ionicons name="close-circle" size={20} color="white" />
                    <Text style={singleEventsStyles.buttonText}>Rechazar Evento</Text>
                  </TouchableOpacity>
                </>
              )}
            </Animated.View>
          )}
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


