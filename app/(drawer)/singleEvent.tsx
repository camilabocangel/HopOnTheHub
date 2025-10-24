import React, { useState, useMemo } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import singleEventsStyles from "@/styles/sinlgeEventStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import MapModal from "@/components/MapModal";
import MapView, { Marker } from "react-native-maps";
import { parseCampuses, getCampusesCoordinates, getMapRegionForCampuses, convertToCampusKeys, CampusKey } from "@/utils/campusUtils";
import { useLikes } from "@/hooks/useLikes";

export default function SingleEventScreen() {
  const { colors } = useThemeColors();
  const params = useLocalSearchParams();
  const [showMapModal, setShowMapModal] = useState(false);
  const { isEventLiked, toggleEventLikeStatus } = useLikes();
  
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
    campus
  } = params;

  const eventId = id as string;
  const liked = isEventLiked(eventId);

  const handleLikeToggle = async () => {
    if (!eventId) return;
    
    const success = await toggleEventLikeStatus(eventId);
    if (!success) {
      Alert.alert("Error", "No se pudo actualizar el like");
    }
  };

  const eventCampuses = useMemo(() => {
    return parseCampuses(campus as string || 'la paz');
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
      return eventCampuses.map(campus => 
        campus.charAt(0).toUpperCase() + campus.slice(1)
      ).join(' y ');
    }
    return eventCampuses[0].charAt(0).toUpperCase() + eventCampuses[0].slice(1);
  }, [eventCampuses]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
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
                  style={[singleEventsStyles.detailValue, { color: colors.text }]}
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
                  style={[singleEventsStyles.detailValue, { color: colors.text }]}
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
                  style={[singleEventsStyles.detailValue, { color: colors.text }]}
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
                    eventCampuses.length > 1 && { fontWeight: 'bold' }
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

              {/* Like Button for Events */}
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
            </View>

            {/* Map Section */}
            <View style={singleEventsStyles.section}>
              <Text
                style={[singleEventsStyles.sectionTitle, { color: colors.text }]}
              >
                Ubicación
              </Text>
              {eventCampuses.length > 1 && (
                <Text style={[singleEventsStyles.sectionContent, { 
                  color: colors.primary, 
                  marginBottom: 8,
                  fontWeight: '600',
                  fontSize: 14 
                }]}>
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
                  style={[singleEventsStyles.expandButton, { backgroundColor: colors.primary }]}
                  onPress={() => setShowMapModal(true)}
                >
                  <Ionicons name="expand" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={singleEventsStyles.section}>
              <Text
                style={[singleEventsStyles.sectionTitle, { color: colors.text }]}
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
                  style={[singleEventsStyles.sectionTitle, { color: colors.text }]}
                >
                  Contenido
                </Text>
                <Text
                  style={[singleEventsStyles.sectionContent, { color: colors.text }]}
                >
                  {content as string}
                </Text>
              </View>
            )}
          </View>
        </View>
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