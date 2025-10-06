import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import announcementCardStyles from "../styles/announcementCardStyles";
import { useThemeColors } from "../hooks/useThemeColors";
import { AnnouncementCardProps } from "../data/announcements";

const AnnouncementCard = ({
  id,
  image,
  description,
  date,
  campus,
  liked,
  onLikeToggle,
}: AnnouncementCardProps) => {
  const { colors } = useThemeColors();
  const [isLiked, setIsLiked] = useState(liked);

  const handleLikePress = () => {
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);
    onLikeToggle(id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <View style={[announcementCardStyles.card]}>
      {image ? (
        <Image 
          source={{ uri: image }} 
          style={announcementCardStyles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={[announcementCardStyles.image, announcementCardStyles.placeholderImage]}>
          <Ionicons name="megaphone" size={32} color={colors.text} />
        </View>
      )}
      
      <View style={announcementCardStyles.content}>
        <Text style={[announcementCardStyles.description, { color: colors.text }]}>
          {description}
        </Text>
        
        <View style={announcementCardStyles.footer}>
          <View style={announcementCardStyles.info}>
            <Text style={[announcementCardStyles.date]}>
              {formatDate(date)}
            </Text>
            <Text style={[announcementCardStyles.campus]}>
              {campus.join(", ")}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={announcementCardStyles.likeButton}
            onPress={handleLikePress}
          >
            <Ionicons 
              name={isLiked ? "heart" : "heart-outline"} 
              size={24} 
              color={isLiked ? "#ff3b30" : "#4d4d4dff"} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AnnouncementCard;