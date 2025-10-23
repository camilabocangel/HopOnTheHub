import React from "react";
import { TouchableOpacity, View, Text, Image, Alert } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "../hooks/useThemeColors";
import { useLikes } from "../hooks/useLikes";
import announcementCardStyles from "../styles/announcementCardStyles";
import { AnnouncementCardProps } from "@/types/types";

export default function AnnouncementCard({
  id,
  image,
  description,
  date,
  campus,
}: AnnouncementCardProps) {
  const { colors } = useThemeColors();
  const { isAnnouncementLiked, toggleAnnouncementLikeStatus } = useLikes();

  const styles = announcementCardStyles;
  const liked = isAnnouncementLiked(id);

  const handlePress = () => {
    router.push({
      pathname: "/singleAnnouncement",
      params: {
        id,
        description,
        date,
        campus: Array.isArray(campus) ? campus.join(', ') : campus, // Updated this line
        image,
      },
    });
  };

  const handleLikePress = async () => {
    if (!id) return;
    
    const success = await toggleAnnouncementLikeStatus(id);
    if (!success) {
      Alert.alert("Error", "No se pudo actualizar el like");
    }
  };

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
            <Text style={styles.placeholderText}>Anuncio</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={[styles.date, { color: colors.subtitle }]}>📅 {date}</Text>

        <Text
          style={[styles.description, { color: colors.text }]}
          numberOfLines={3}
        >
          {description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.campusContainer}>
            {campus.map((camp, index) => (
              <View
                key={index}
                style={[styles.campusTag, { backgroundColor: colors.muted }]}
              >
                <Text style={[styles.campusText, { color: colors.text }]}>
                  {camp}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            onPress={handleLikePress}
            style={styles.likeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={20}
              color={liked ? colors.accent : colors.subtitle}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}