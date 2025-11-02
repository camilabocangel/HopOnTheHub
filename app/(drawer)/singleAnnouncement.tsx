import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import singleAnnouncementStyles from "../../src/styles/singleAnnouncementStyles";
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
import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { useUser } from "@/hooks/useUser";
import { ScreenTransitionView } from "@/components/ScreenTransitionView";
import { useScreenTransition } from "@/hooks/useScreenTransition";
import { Animated } from 'react-native';
import { AnimatedLikeButton } from "@/components/AnimatedLikeButton";


export default function SingleAnnouncementScreen() {
  const { colors } = useThemeColors();
  const params = useLocalSearchParams();
  const [showMapModal, setShowMapModal] = useState(false);
  const { isAnnouncementLiked, toggleAnnouncementLikeStatus } = useLikes();
  const { id, description, date, campus, image, content } = params;
  const navigation = useNavigation();
  const screenTransition = useScreenTransition(0);
  const { user } = useUser();
  const isNormal = user ? user?.role === "normal" : false;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Anuncio",
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

  const announcementCampuses = useMemo((): CampusKey[] => {
    if (Array.isArray(campus)) {
      return convertToCampusKeys(campus);
    } else if (typeof campus === "string") {
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
    return ["la paz"];
  }, [campus]);

  const campusesCoordinates = useMemo(() => {
    return getCampusesCoordinates(announcementCampuses);
  }, [announcementCampuses]);

  const mapRegion = useMemo(() => {
    return getMapRegionForCampuses(announcementCampuses);
  }, [announcementCampuses]);

  const campusDisplayText = useMemo(() => {
    if (announcementCampuses.length === 3) return "Todos los campus";
    if (announcementCampuses.length === 2) {
      return announcementCampuses
        .map((campus) => campus.charAt(0).toUpperCase() + campus.slice(1))
        .join(" y ");
    }
    return (
      announcementCampuses[0].charAt(0).toUpperCase() +
      announcementCampuses[0].slice(1)
    );
  }, [announcementCampuses]);

  const announcementId = id as string;
  const liked = isAnnouncementLiked(announcementId);

  const handleLikeToggle = async () => {
    if (!announcementId) return false;

    const success = await toggleAnnouncementLikeStatus(announcementId);
    if (!success) {
      Alert.alert("Error", "No se pudo actualizar el like");
      return false;
    }
    return true;
  };

  return (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
    <ScreenTransitionView duration={500} delay={100}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={singleAnnouncementStyles.container}>
          {/* Imagen con animación de escala suave */}
          <Animated.View 
            style={[
              singleAnnouncementStyles.imageContainer,
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
          </Animated.View>

          <View style={singleAnnouncementStyles.content}>
            {/* Descripción con animación */}
            <Animated.Text
              style={[
                singleAnnouncementStyles.description,
                { color: colors.text },
                {
                  opacity: screenTransition.opacity,
                  transform: [{ translateY: screenTransition.translateY }]
                }
              ]}
            >
              {description as string}
            </Animated.Text>

            {/* Detalles con animación escalonada */}
            <View style={singleAnnouncementStyles.detailsContainer}>
              {[
                { label: "Fecha:", value: date as string },
                { 
                  label: "Campus:", 
                  value: campusDisplayText,
                  special: true,
                  hasSubtitle: announcementCampuses.length > 1 
                },
              ].map((detail, index) => (
                <Animated.View
                  key={detail.label}
                  style={[
                    singleAnnouncementStyles.detailRow,
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
                      singleAnnouncementStyles.detailLabel,
                      { color: colors.subtitle },
                    ]}
                  >
                    {detail.label}
                  </Text>
                  <View style={singleAnnouncementStyles.campusContainer}>
                    <Text
                      style={[
                        singleAnnouncementStyles.detailValue,
                        { 
                          color: detail.special ? colors.primary : colors.text,
                          fontWeight: detail.special ? "bold" : "normal"
                        },
                      ]}
                    >
                      {detail.value}
                    </Text>
                    {detail.hasSubtitle && (
                      <Text
                        style={[
                          singleAnnouncementStyles.campusSubtitle,
                          { color: colors.subtitle },
                        ]}
                      >
                        ({announcementCampuses.length} campus)
                      </Text>
                    )}
                  </View>
                </Animated.View>
              ))}

              {isNormal && (
                <Animated.View
                  style={[
                    singleAnnouncementStyles.detailRow,
                    { borderBottomColor: colors.border },
                    {
                      opacity: screenTransition.opacity,
                      transform: [{ translateY: screenTransition.translateY }]
                    }
                  ]}
                >
                  <Text
                    style={[
                      singleAnnouncementStyles.detailLabel,
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
                      style={singleAnnouncementStyles.likeButton}
                    />
                </Animated.View>
              )}
            </View>

            {/* Sección de ubicación con animación */}
            <Animated.View 
              style={[
                singleAnnouncementStyles.section,
                {
                  opacity: screenTransition.opacity,
                  transform: [{ translateY: screenTransition.translateY }]
                }
              ]}
            >
              <Text
                style={[
                  singleAnnouncementStyles.sectionTitle,
                  { color: colors.text },
                ]}
              >
                Ubicación del Anuncio
              </Text>
              {announcementCampuses.length > 1 && (
                <Text
                  style={[
                    singleAnnouncementStyles.sectionContent,
                    {
                      color: colors.primary,
                      marginBottom: 8,
                      fontWeight: "600",
                      fontSize: 14,
                    },
                  ]}
                >
                  📍 Este anuncio aplica para {announcementCampuses.length}{" "}
                  campus
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
                  style={[
                    singleAnnouncementStyles.expandButton,
                    { backgroundColor: colors.primary },
                  ]}
                  onPress={() => setShowMapModal(true)}
                >
                  <Ionicons name="expand" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </Animated.View>

            {/* Contenido adicional con animación */}
            {content && (
              <Animated.View 
                style={[
                  singleAnnouncementStyles.section,
                  {
                    opacity: screenTransition.opacity,
                    transform: [{ translateY: screenTransition.translateY }]
                  }
                ]}
              >
                <Text
                  style={[
                    singleAnnouncementStyles.sectionTitle,
                    { color: colors.text },
                  ]}
                >
                  Contenido Adicional
                </Text>
                <Text
                  style={[
                    singleAnnouncementStyles.sectionContent,
                    { color: colors.text },
                  ]}
                >
                  {content as string}
                </Text>
              </Animated.View>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenTransitionView>

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
