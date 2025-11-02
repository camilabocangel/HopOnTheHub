import React from "react";
import { TouchableOpacity, View, Text, Image, Alert } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "../hooks/useThemeColors";
import { useLikes } from "../hooks/useLikes";
import { useUser } from "../hooks/useUser";
import eventCardStyles from "../styles/eventCardStyles";
import { EventCardProps } from "@/types/types";

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
  createdBy,
  createdAt,
}: EventCardProps) {
  const { colors } = useThemeColors();
  const { isEventLiked, toggleEventLikeStatus } = useLikes();
  const { user } = useUser();
  const styles = eventCardStyles;

  const handlePress = () => {
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
        createdBy: createdBy || "", // Pasar createdBy
        createdAt: createdAt ? createdAt.toString() : "", // Pasar createdAt
      },
    });
  };

  const handleLikePress = async () => {
    if (!id) return;

    const success = await toggleEventLikeStatus(id);
    if (!success) {
      Alert.alert("Error", "No se pudo actualizar el like");
    }
  };

  const liked = isEventLiked(id);
  const isNormal = user ? user?.role === "normal" : false;

  return (
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
          <TouchableOpacity
            onPress={handleLikePress}
            style={styles.likeButtonOverlay}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={20}
              color={liked ? colors.accent : "#555"} 
            />
          </TouchableOpacity>
        )}

        {isPending && (
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingText}>Pendiente</Text>
          </View>
        )}

        {isRejected && (
          <View style={styles.rejectedBadge}>
            <Text style={styles.rejectedText}>Rechazado</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={[styles.category, { color: colors.primary }]}>
          {category}
        </Text>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

        <Text style={[styles.date, { color: colors.subtitle }]}>📅 {date}</Text>
        <Text style={[styles.time, { color: colors.subtitle }]}>⏰ {time}</Text>
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
  );
}