
import React, { useEffect } from "react";
import { TouchableOpacity, View, Text, Image, Alert } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "../hooks/useThemeColors";
import { useLikes } from "../hooks/useLikes";
import { useUser } from "../hooks/useUser";
import announcementCardStyles from "../styles/announcementCardStyles";
import { AnnouncementCardProps } from "@/types/types";
import { useFade } from '../hooks/useFade';
import { FadeView } from './FadeView';

export default function AnnouncementCard({
  id ,
  image,
  description,
  date,
  campus,
  status,
  isPending,
  index=0,
}: AnnouncementCardProps) {
  const { colors } = useThemeColors();
  const { isAnnouncementLiked, toggleAnnouncementLikeStatus } = useLikes();
  const { user } = useUser();
  const styles = announcementCardStyles;
  const fadeAnim = useFade(0,100, 'up');
  const liked = isAnnouncementLiked(id);
  const isNormal = user ? user?.role === "normal" : false;

  useEffect(() => {
      const delay = index * 120; 
      fadeAnim.fadeIn({ duration: 600, delay });
    }, []);
  const handlePress = () => {
    fadeAnim.fadeOut({duration: 200});
    setTimeout(()=>{
      router.push({
      pathname: "/singleAnnouncement",
      params: {
        id,
        description,
        date,
        campus: Array.isArray(campus) ? campus.join(', ') : campus, 
        image,
      },
    });
    }, 150);
  };

  const handleLikePress = async () => {
    if (!id) return;
    
    const success = await toggleAnnouncementLikeStatus(id);
    if (!success) {
      Alert.alert("Error", "No se pudo actualizar el like");
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
            <Text style={styles.placeholderText}>Anuncio</Text>
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

          
        </View>
      </View>
    </TouchableOpacity>
    </FadeView>
  );
}