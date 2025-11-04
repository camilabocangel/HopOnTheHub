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
import { AnimatedLikeButton } from "@/components/AnimatedLikeButton";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { notifyAnnouncementStatusChange } from "@/services/notificationService";

export default function SingleAnnouncementScreen() {
  const { colors } = useThemeColors();
  const params = useLocalSearchParams();
  const router = useRouter();
  const [showMapModal, setShowMapModal] = useState(false);
  const { isAnnouncementLiked, toggleAnnouncementLikeStatus } = useLikes();
  const {
    id,
    description,
    date,
    campus,
    image,
    content,
    status,
    creatorPushToken,
  } = params;
  const navigation = useNavigation();
  const screenTransition = useScreenTransition(0);
  const { user } = useUser();
  const isNormal = user ? user?.role === "normal" : false;
  const isAdmin = user?.role === "admin";

  const eventCreatorPushToken = Array.isArray(creatorPushToken)
    ? creatorPushToken[0]
    : creatorPushToken;

  const [actionLoading, setActionLoading] = useState<{
    approve?: boolean;
    reject?: boolean;
    hide?: boolean;
    show?: boolean;
  }>({});

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

  const announcementId = Array.isArray(id) ? id[0] : id;
  const announcementDescription = Array.isArray(description)
    ? description[0]
    : description;
  const announcementDate = Array.isArray(date) ? date[0] : date;
  const announcementImage = Array.isArray(image) ? image[0] : image;
  const announcementContent = Array.isArray(content) ? content[0] : content;
  const announcementStatus = Array.isArray(status) ? status[0] : status;
  const announcementCampus = Array.isArray(campus) ? campus[0] : campus;

  const announcementCampuses = useMemo((): CampusKey[] => {
    if (Array.isArray(announcementCampus)) {
      return convertToCampusKeys(announcementCampus);
    } else if (typeof announcementCampus === "string") {
      try {
        const parsedCampus = JSON.parse(announcementCampus);
        if (Array.isArray(parsedCampus)) {
          return convertToCampusKeys(parsedCampus);
        }
        return parseCampuses(parsedCampus);
      } catch {
        return parseCampuses(announcementCampus);
      }
    }
    return ["la paz"];
  }, [announcementCampus]);

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

  const liked = isAnnouncementLiked(announcementId || "");

  const handleLikeToggle = async () => {
    if (!announcementId) return false;

    const success = await toggleAnnouncementLikeStatus(announcementId);
    if (!success) {
      Alert.alert("Error", "No se pudo actualizar el like");
      return false;
    }
    return true;
  };

  const handleApproveAnnouncement = async () => {
    if (!announcementId) return;

    setActionLoading({ approve: true });
    try {
      const announcementRef = doc(
        db,
        "announcements",
        `announcement-${announcementId}`
      );
      await updateDoc(announcementRef, {
        status: "accepted",
        updatedAt: new Date(),
      });

      await notifyAnnouncementStatusChange(
        announcementId,
        announcementDescription,
        "accepted",
        eventCreatorPushToken
      );

      Alert.alert("Éxito", "El anuncio ha sido aprobado");
      router.back();
    } catch (error) {
      console.error("Error approving announcement:", error);
      Alert.alert("Error", "No se pudo aprobar el anuncio");
    } finally {
      setActionLoading({});
    }
  };

  const handleRejectAnnouncement = async () => {
    if (!announcementId) return;

    setActionLoading({ reject: true });
    try {
      const announcementRef = doc(
        db,
        "announcements",
        `announcement-${announcementId}`
      );
      await updateDoc(announcementRef, {
        status: "rejected",
        updatedAt: new Date(),
      });

      await notifyAnnouncementStatusChange(
        announcementId,
        announcementDescription,
        "rejected",
        eventCreatorPushToken
      );

      Alert.alert("Éxito", "El anuncio ha sido rechazado");
      router.back();
    } catch (error) {
      console.error("Error rejecting announcement:", error);
      Alert.alert("Error", "No se pudo rechazar el anuncio");
    } finally {
      setActionLoading({});
    }
  };

  const handleHideAnnouncement = async () => {
    if (!announcementId) return;

    setActionLoading({ hide: true });
    try {
      const announcementRef = doc(
        db,
        "announcements",
        `announcement-${announcementId}`
      );
      await updateDoc(announcementRef, {
        status: "hidden",
        updatedAt: new Date(),
      });

      await notifyAnnouncementStatusChange(
        announcementId,
        announcementDescription,
        "hidden",
        eventCreatorPushToken
      );

      Alert.alert("Éxito", "El anuncio ha sido ocultado");
      router.back();
    } catch (error) {
      console.error("Error hiding announcement:", error);
      Alert.alert("Error", "No se pudo ocultar el anuncio");
    } finally {
      setActionLoading({});
    }
  };

  const handleShowAnnouncement = async () => {
    if (!announcementId) return;

    setActionLoading({ show: true });
    try {
      const announcementRef = doc(db, "announcements", announcementId);
      await updateDoc(announcementRef, {
        status: "accepted",
        updatedAt: new Date(),
      });

      await notifyAnnouncementStatusChange(
        announcementId,
        announcementDescription,
        "accepted",
        eventCreatorPushToken
      );

      Alert.alert("Éxito", "El anuncio será mostrado de nuevo");
      router.back();
    } catch (error) {
      console.error("Error showing announcement:", error);
      Alert.alert("Error", "No se pudo mostrar el anuncio");
    } finally {
      setActionLoading({});
    }
  };

  if (!announcementId) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={singleAnnouncementStyles.container}>
          <Text
            style={[singleAnnouncementStyles.title, { color: colors.text }]}
          >
            Error: Anuncio no encontrado
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenTransitionView duration={500} delay={100}>
        <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
          <View style={singleAnnouncementStyles.container}>
            <Animated.View
              style={[
                singleAnnouncementStyles.imageContainer,
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
              {announcementImage ? (
                <Image
                  source={{ uri: announcementImage }}
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
              <Animated.Text
                style={[
                  singleAnnouncementStyles.description,
                  { color: colors.text },
                  {
                    opacity: screenTransition.opacity,
                    transform: [{ translateY: screenTransition.translateY }],
                  },
                ]}
              >
                {announcementDescription}
              </Animated.Text>

              <View style={singleAnnouncementStyles.detailsContainer}>
                {[
                  { label: "Fecha:", value: announcementDate },
                  {
                    label: "Campus:",
                    value: campusDisplayText,
                    special: true,
                    hasSubtitle: announcementCampuses.length > 1,
                  },
                ].map((detail, index) => (
                  <Animated.View
                    key={detail.label}
                    style={[
                      singleAnnouncementStyles.detailRow,
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
                            color: detail.special
                              ? colors.primary
                              : colors.text,
                            fontWeight: detail.special ? "bold" : "normal",
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
                        transform: [
                          { translateY: screenTransition.translateY },
                        ],
                      },
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

              <Animated.View
                style={[
                  singleAnnouncementStyles.section,
                  {
                    opacity: screenTransition.opacity,
                    transform: [{ translateY: screenTransition.translateY }],
                  },
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

              {announcementContent && (
                <Animated.View
                  style={[
                    singleAnnouncementStyles.section,
                    {
                      opacity: screenTransition.opacity,
                      transform: [{ translateY: screenTransition.translateY }],
                    },
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
                    {announcementContent}
                  </Text>
                </Animated.View>
              )}
            </View>
            {isAdmin && (
              <Animated.View
                style={[
                  singleAnnouncementStyles.adminActions,
                  {
                    opacity: screenTransition.opacity,
                    transform: [{ translateY: screenTransition.translateY }],
                  },
                ]}
              >
                {announcementStatus === "pending" && (
                  <>
                    <TouchableOpacity
                      style={[
                        singleAnnouncementStyles.actionButton,
                        { backgroundColor: "#4CAF50" },
                        actionLoading.approve &&
                          singleAnnouncementStyles.actionButtonDisabled,
                      ]}
                      onPress={handleApproveAnnouncement}
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
                          <Text style={singleAnnouncementStyles.buttonText}>
                            Aprobar Anuncio
                          </Text>
                        </>
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        singleAnnouncementStyles.actionButton,
                        { backgroundColor: "#f44336" },
                        actionLoading.reject &&
                          singleAnnouncementStyles.actionButtonDisabled,
                      ]}
                      onPress={handleRejectAnnouncement}
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
                          <Text style={singleAnnouncementStyles.buttonText}>
                            Rechazar Anuncio
                          </Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </>
                )}

                {announcementStatus === "accepted" && (
                  <TouchableOpacity
                    style={[
                      singleAnnouncementStyles.actionButton,
                      { backgroundColor: "#666" },
                      actionLoading.hide &&
                        singleAnnouncementStyles.actionButtonDisabled,
                    ]}
                    onPress={handleHideAnnouncement}
                    disabled={actionLoading.hide}
                  >
                    {actionLoading.hide ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      <>
                        <Ionicons name="eye-off" size={20} color="white" />
                        <Text style={singleAnnouncementStyles.buttonText}>
                          Ocultar Anuncio
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                )}

                {announcementStatus === "hidden" && (
                  <TouchableOpacity
                    style={[
                      singleAnnouncementStyles.actionButton,
                      { backgroundColor: "#4CAF50" },
                      actionLoading.show &&
                        singleAnnouncementStyles.actionButtonDisabled,
                    ]}
                    onPress={handleShowAnnouncement}
                    disabled={actionLoading.show}
                  >
                    {actionLoading.show ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      <>
                        <Ionicons name="eye" size={20} color="white" />
                        <Text style={singleAnnouncementStyles.buttonText}>
                          Mostrar Anuncio
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
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
        place="Ubicación del anuncio"
        isMultiCampus={announcementCampuses.length > 1}
      />
    </SafeAreaView>
  );
}
