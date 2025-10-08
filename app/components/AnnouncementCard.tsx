import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AnnouncementCardProps } from "../data/announcements";
import { useThemeColors } from "../hooks/useThemeColors";
import useLikedAnnouncements from "../hooks/useLikedAnnouncements";
import announcementCardStyles from "../styles/announcementCardStyles";

export default function AnnouncementCard({
  id,
  image,
  description,
  date,
  campus,
  onLikeToggle,
}: AnnouncementCardProps) {
  const { colors } = useThemeColors();
  const { isLiked } = useLikedAnnouncements();

  const liked = isLiked(id);

  const handlePress = () => {
    console.log("Navigating to singleAnnouncement with id:", id);

    if (!id) {
      console.error("Announcement ID is undefined");
      return;
    }

    router.push({
      pathname: "/singleAnnouncement",
      params: {
        id: id.toString(),
        description,
        date,
        campus: JSON.stringify(campus),
        image,
      },
    });
  };

  return (
    <TouchableOpacity
      style={[announcementCardStyles.card, { backgroundColor: colors.surface }]}
      onPress={handlePress}
    >
      <View style={announcementCardStyles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={announcementCardStyles.image} />
        ) : (
          <View
            style={[
              announcementCardStyles.placeholderImage,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text style={announcementCardStyles.placeholderText}>Anuncio</Text>
          </View>
        )}
      </View>

      <View style={announcementCardStyles.content}>
        <Text style={[announcementCardStyles.date, { color: colors.subtitle }]}>
          📅 {date}
        </Text>

        <Text
          style={[announcementCardStyles.description, { color: colors.text }]}
          numberOfLines={3}
        >
          {description}
        </Text>

        <View style={announcementCardStyles.footer}>
          <View style={announcementCardStyles.campusContainer}>
            {campus.slice(0, 2).map((camp, index) => (
              <View
                key={index}
                style={[
                  announcementCardStyles.campusTag,
                  { backgroundColor: colors.muted },
                ]}
              >
                <Text
                  style={[
                    announcementCardStyles.campusText,
                    { color: colors.text },
                  ]}
                >
                  {camp}
                </Text>
              </View>
            ))}
            {campus.length > 2 && (
              <Text
                style={[
                  announcementCardStyles.moreCampuses,
                  { color: colors.subtitle },
                ]}
              >
                +{campus.length - 2}
              </Text>
            )}
          </View>

          <View
            style={announcementCardStyles.likeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={20}
              color={liked ? colors.accent : colors.subtitle}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
