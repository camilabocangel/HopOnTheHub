// components/EventCard.tsx - actualiza las props y el handlePress
import React, { useEffect } from "react";
import { TouchableOpacity, View, Text, Image, Alert } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "../hooks/useThemeColors";
import { useLikes } from "../hooks/useLikes";
import { useUser } from "../hooks/useUser";
import eventCardStyles from "../styles/eventCardStyles";
import { EventCardProps } from "@/types/types";
import { useFade } from "../hooks/useFade";
import { FadeView } from "./FadeView";
import { AnimatedLikeButton } from "./AnimatedLikeButton";

interface FirebaseTimestamp {
  seconds: number;
  nanoseconds?: number;
}

export default function EventCard({
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
  isPending,
  isRejected = false,
  status,
  index = 0,
  createdBy,
  createdAt,
  creatorPushToken, // AGREGAR ESTA PROP
}: EventCardProps) {
  const { colors } = useThemeColors();
  const { isEventLiked, toggleEventLikeStatus } = useLikes();
  const { user } = useUser();
  const styles = eventCardStyles;
  const fadeAnim = useFade(0, 100, "up");

  const liked = isEventLiked(id);
  const isNormal = user ? user?.role === "normal" : false;

  useEffect(() => {
    const delay = index * 120;
    fadeAnim.fadeIn({ duration: 600, delay });
  }, []);

  const formatCreatedAtForParams = (): string => {
    if (!createdAt) return "";

    if (typeof createdAt === "object" && createdAt !== null) {
      if (
        "seconds" in createdAt &&
        typeof (createdAt as any).seconds === "number"
      ) {
        const timestamp = createdAt as FirebaseTimestamp;
        const result = JSON.stringify({
          seconds: timestamp.seconds,
          nanoseconds: timestamp.nanoseconds || 0,
        });

        return result;
      }
    }

    if (typeof createdAt === "string" && createdAt.includes("seconds")) {
      return createdAt;
    }

    return String(createdAt);
  };

  const handlePress = () => {
    fadeAnim.fadeOut({ duration: 200 });

    const formattedCreatedAt = formatCreatedAtForParams();
    setTimeout(() => {
      router.push({
        pathname: "/singleEvent",
        params: {
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
          createdBy: createdBy || "",
          createdAt: formattedCreatedAt,
          creatorPushToken: creatorPushToken || "", // PASAR EL TOKEN
        },
      });
    }, 150);
  };

  const handleLikePress = async (): Promise<boolean> => {
    if (!id) return false;

    try {
      const success = await toggleEventLikeStatus(id);
      if (!success) {
        Alert.alert("Error", "No se pudo actualizar el like");
        return false;
      }
      return true;
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el like");
      return false;
    }
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
              <Text style={styles.placeholderText}>Evento</Text>
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

          {isPending && (
            <View style={styles.pendingBadge}>
              <Text style={styles.pendingText}>Pendiente</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text style={[styles.category, { color: colors.primary }]}>
            {category}
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          {isRejected && (
            <View style={styles.rejectedBadge}>
              <Text style={styles.rejectedText}>Rechazado</Text>
            </View>
          )}
          <Text style={[styles.date, { color: colors.subtitle }]}>
            📅 {date}
          </Text>
          <Text style={[styles.time, { color: colors.subtitle }]}>
            ⏰ {time}
          </Text>
          <Text style={[styles.place, { color: colors.subtitle }]}>
            📍 {place}
          </Text>

          <Text
            style={[styles.description, { color: colors.subtitle }]}
            numberOfLines={2}
          >
            {description}
          </Text>
        </View>
      </TouchableOpacity>
    </FadeView>
  );
}