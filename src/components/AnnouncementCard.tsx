import React, { useEffect } from "react";
import { TouchableOpacity, View, Text, Image, Alert } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "../hooks/useThemeColors";
import { useLikes } from "../hooks/useLikes";
import { useUser } from "../hooks/useUser";
import announcementCardStyles from "../styles/announcementCardStyles";
import { AnnouncementCardProps } from "@/types/types";
import { useFade } from "../hooks/useFade";
import { FadeView } from "./FadeView";
import { AnimatedLikeButton } from "./AnimatedLikeButton";

export default function AnnouncementCard({
  id,
  image,
  description,
  date,
  campus,
  status,
  isPending = false,
  isRejected = false,
  isHidden = false,
  index = 0,
  creatorPushToken,
}: AnnouncementCardProps) {
  const { colors } = useThemeColors();
  const { isAnnouncementLiked, toggleAnnouncementLikeStatus } = useLikes();
  const { user } = useUser();
  const styles = announcementCardStyles;
  const fadeAnim = useFade(0, 100, "up");
  const liked = isAnnouncementLiked(id);
  const isNormal = user ? user?.role === "normal" : false;

  useEffect(() => {
    const delay = index * 120;
    fadeAnim.fadeIn({ duration: 600, delay });
  }, []);

  const handlePress = () => {
    fadeAnim.fadeOut({ duration: 200 });
    setTimeout(() => {
      router.push({
        pathname: "/singleAnnouncement",
        params: {
          id,
          description,
          date,
          campus: Array.isArray(campus) ? JSON.stringify(campus) : campus,
          image,
          status,
          creatorPushToken: creatorPushToken,
        },
      });
    }, 150);
  };

  const handleLikePress = async () => {
    if (!id) return false;

    const success = await toggleAnnouncementLikeStatus(id);
    if (!success) {
      Alert.alert("Error", "No se pudo actualizar el like");
      return false;
    }
    return true;
  };

  const getStatusBadge = () => {
    if (isPending) {
      return (
        <View style={styles.pendingBadge}>
          <Text style={styles.pendingText}>Pendiente</Text>
        </View>
      );
    }

    if (isRejected) {
      return (
        <View style={styles.rejectedBadge}>
          <Text style={styles.rejectedText}>Rechazado</Text>
        </View>
      );
    }

    if (isHidden) {
      return (
        <View style={styles.hiddenBadge}>
          <Text style={styles.hiddenText}>Oculto</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <FadeView
      opacity={fadeAnim.opacity}
      transform={fadeAnim.transform}
      styles={{ marginBottom: 16 }}
    >
      <TouchableOpacity
        style={[styles.card, { backgroundColor: colors.surface }]}
        onPress={handlePress}
      >
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View
              style={[
                styles.placeholderImage,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text style={styles.placeholderText}>Anuncio</Text>
            </View>
          )}

          {isNormal && (
            <AnimatedLikeButton
              isLiked={liked}
              onPress={handleLikePress}
              size={20}
              color="#555"
              likedColor={colors.accent}
              style={styles.likeButtonOverlay}
            />
          )}

          {getStatusBadge()}
        </View>

        <View style={styles.content}>
          <Text style={[styles.date, { color: colors.subtitle }]}>
            📅 {date}
          </Text>

          <Text
            style={[styles.description, { color: colors.text }]}
            numberOfLines={3}
          >
            {description}
          </Text>

          <View style={styles.footer}>
            <View style={styles.campusContainer}>
              {(Array.isArray(campus) ? campus : [campus]).map(
                (camp, index) => (
                  <View
                    key={index}
                    style={[
                      styles.campusTag,
                      { backgroundColor: colors.muted },
                    ]}
                  >
                    <Text style={[styles.campusText, { color: colors.text }]}>
                      {camp}
                    </Text>
                  </View>
                )
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </FadeView>
  );
}
