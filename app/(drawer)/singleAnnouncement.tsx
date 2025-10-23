import React, { useState, useMemo } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import useLikedAnnouncements from "../../src/hooks/useLikedAnnouncements";
import singleAnnouncementStyles from "../../src/styles/singleAnnouncementStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import MapModal from "@/components/MapModal";
import MapView, { Marker } from "react-native-maps";
import { parseCampuses, getCampusesCoordinates, getMapRegionForCampuses, convertToCampusKeys, CampusKey } from "@/utils/campusUtils";

export default function SingleAnnouncementScreen() {
  const { colors } = useThemeColors();
  const params = useLocalSearchParams();
  const [showMapModal, setShowMapModal] = useState(false);
  const { isLiked, toggleLike } = useLikedAnnouncements();

  const { id, description, date, campus, image, content } = params;

  // Parse campuses - handle both string and array formats
  const announcementCampuses = useMemo((): CampusKey[] => {
    if (Array.isArray(campus)) {
      // If it's already an array, convert to CampusKey[]
      return convertToCampusKeys(campus);
    } else if (typeof campus === 'string') {
      // If it's a string, try to parse it as JSON first, then as plain string
      try {
        const parsedCampus = JSON.parse(campus);
        if (Array.isArray(parsedCampus)) {
          return convertToCampusKeys(parsedCampus);
        }
        return parseCampuses(parsedCampus);
      } catch {
        return parseCampuses(campus);
      }
    }
    return ['la paz']; // Default fallback
  }, [campus]);

  const campusesCoordinates = useMemo(() => {
    return getCampusesCoordinates(announcementCampuses);
  }, [announcementCampuses]);

  const mapRegion = useMemo(() => {
    return getMapRegionForCampuses(announcementCampuses);
  }, [announcementCampuses]);

  // Format campus display text
  const campusDisplayText = useMemo(() => {
    if (announcementCampuses.length === 3) return "Todos los campus";
    if (announcementCampuses.length === 2) {
      return announcementCampuses.map(campus => 
        campus.charAt(0).toUpperCase() + campus.slice(1)
      ).join(' y ');
    }
    return announcementCampuses[0].charAt(0).toUpperCase() + announcementCampuses[0].slice(1);
  }, [announcementCampuses]);

  const announcementId = id ? parseInt(id as string) : 0;
  const liked = isLiked(announcementId);

  const handleLikeToggle = () => {
    if (announcementId) {
      toggleLike(announcementId);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={singleAnnouncementStyles.container}>
          <View style={singleAnnouncementStyles.imageContainer}>
            {image ? (
              <Image
                source={{ uri: image as string }}
                style={singleAnnouncementStyles.image}
                resizeMode="cover"
              />
            ) : (
              <View
                style={[
                  singleAnnouncementStyles.placeholderImage,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text style={singleAnnouncementStyles.placeholderText}>
                  Anuncio UPB
                </Text>
              </View>
            )}
          </View>

          <View style={singleAnnouncementStyles.content}>
            <Text
              style={[
                singleAnnouncementStyles.description,
                { color: colors.text },
              ]}
            >
              {description as string}
            </Text>

            <View style={singleAnnouncementStyles.detailsContainer}>
              <View
                style={[
                  singleAnnouncementStyles.detailRow,
                  { borderBottomColor: colors.border },
                ]}
              >
                <Text
                  style={[
                    singleAnnouncementStyles.detailLabel,
                    { color: colors.subtitle },
                  ]}
                >
                  Fecha:
                </Text>
                <Text
                  style={[
                    singleAnnouncementStyles.detailValue,
                    { color: colors.text },
                  ]}
                >
                  {date as string}
                </Text>
              </View>

              <View
                style={[
                  singleAnnouncementStyles.detailRow,
                  { borderBottomColor: colors.border },
                ]}
              >
                <Text
                  style={[
                    singleAnnouncementStyles.detailLabel,
                    { color: colors.subtitle },
                  ]}
                >
                  Campus:
                </Text>
                <View style={singleAnnouncementStyles.campusContainer}>
                  <Text
                    style={[
                      singleAnnouncementStyles.detailValue,
                      { color: colors.primary },
                      announcementCampuses.length > 1 && { fontWeight: 'bold' }
                    ]}
                  >
                    {campusDisplayText}
                  </Text>
                  {announcementCampuses.length > 1 && (
                    <Text style={[singleAnnouncementStyles.campusSubtitle, { color: colors.subtitle }]}>
                      ({announcementCampuses.length} campus)
                    </Text>
                  )}
                </View>
              </View>

              <View
                style={[
                  singleAnnouncementStyles.detailRow,
                  { borderBottomColor: colors.border },
                ]}
              >
                <Text
                  style={[
                    singleAnnouncementStyles.detailLabel,
                    { color: colors.subtitle },
                  ]}
                >
                  Estado:
                </Text>
                <TouchableOpacity
                  onPress={handleLikeToggle}
                  style={singleAnnouncementStyles.likeButton}
                >
                  <Ionicons
                    name={liked ? "heart" : "heart-outline"}
                    size={24}
                    color={liked ? colors.accent : colors.subtitle}
                  />
                  <Text
                    style={[
                      singleAnnouncementStyles.detailValue,
                      { color: colors.text, marginLeft: 8 },
                    ]}
                  >
                    {liked ? "Guardado" : "Guardar"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Map Section for Announcements */}
            <View style={singleAnnouncementStyles.section}>
              <Text
                style={[singleAnnouncementStyles.sectionTitle, { color: colors.text }]}
              >
                Ubicación del Anuncio
              </Text>
              {announcementCampuses.length > 1 && (
                <Text style={[singleAnnouncementStyles.sectionContent, { 
                  color: colors.primary, 
                  marginBottom: 8,
                  fontWeight: '600',
                  fontSize: 14 
                }]}>
                  📍 Este anuncio aplica para {announcementCampuses.length} campus
                </Text>
              )}
              <View style={singleAnnouncementStyles.mapContainer}>
                <MapView
                  style={singleAnnouncementStyles.smallMap}
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
                      description="Ubicación del anuncio"
                    />
                  ))}
                </MapView>
                
                <TouchableOpacity
                  style={[singleAnnouncementStyles.expandButton, { backgroundColor: colors.primary }]}
                  onPress={() => setShowMapModal(true)}
                >
                  <Ionicons name="expand" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Optional: Content section if you have content for announcements */}
            {content && (
              <View style={singleAnnouncementStyles.section}>
                <Text
                  style={[singleAnnouncementStyles.sectionTitle, { color: colors.text }]}
                >
                  Contenido Adicional
                </Text>
                <Text
                  style={[singleAnnouncementStyles.sectionContent, { color: colors.text }]}
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
        place="Ubicación del anuncio"
        isMultiCampus={announcementCampuses.length > 1}
      />
    </SafeAreaView>
  );
}