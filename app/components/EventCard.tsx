import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { router } from "expo-router";
import { EventCardProps } from "../data/events";
import { useThemeColors } from "../hooks/useThemeColors";
import eventCardStyles from "../styles/eventCardStyles";

export default function EventCard({
  id,
  title,
  date,
  time,
  place,
  category,
  description,
  image,
}: EventCardProps) {
  const { colors } = useThemeColors();

  const handlePress = () => {
    router.push({
      pathname: "/singleEvent",
      params: {
        id: id.toString(),
        title,
        date,
        time,
        place,
        category,
        description,
        image,
      },
    });
  };

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
      </View>
    </TouchableOpacity>
  );
}
