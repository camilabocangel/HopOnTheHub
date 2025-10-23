import React from "react";
import { TouchableOpacity, View, Text, Image, Alert } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "../hooks/useThemeColors";
import { useLikes } from "../hooks/useLikes";
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
}: EventCardProps) {
  const { colors } = useThemeColors();
  const { isEventLiked, toggleEventLikeStatus } = useLikes();

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
        campus:campus||"la paz"
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

  return (
    <TouchableOpacity
      style={[eventCardStyles.card, { backgroundColor: colors.surface }]}
      onPress={handlePress}
    >
      <View style={eventCardStyles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={eventCardStyles.image} />
        ) : (
          <View
            style={[
              eventCardStyles.placeholderImage,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text style={eventCardStyles.placeholderText}>Evento</Text>
          </View>
        )}
      </View>

      <View style={eventCardStyles.content}>
        <Text style={[eventCardStyles.category, { color: colors.primary }]}>
          {category}
        </Text>
        <Text style={[eventCardStyles.title, { color: colors.text }]}>
          {title}
        </Text>

        <Text style={[eventCardStyles.date, { color: colors.subtitle }]}>
          📅 {date}
        </Text>
        <Text style={[eventCardStyles.time, { color: colors.subtitle }]}>
          ⏰ {time}
        </Text>
        <Text style={[eventCardStyles.place, { color: colors.subtitle }]}>
          📍 {place}
        </Text>

        <Text
          style={[eventCardStyles.description, { color: colors.subtitle }]}
          numberOfLines={2}
        >
          {description}
        </Text>

        <TouchableOpacity
          onPress={handleLikePress}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: 5,
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={20}
            color={liked ? colors.accent : colors.subtitle}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
