import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import useLikedAnnouncements from "../../src/hooks/useLikedAnnouncements";
import singleAnnouncementStyles from "../../src/styles/singleAnnouncementStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SingleAnnouncementScreen() {
  const { colors } = useThemeColors();
  const params = useLocalSearchParams();
  const { isLiked, toggleLike } = useLikedAnnouncements();

  const { id, description, date, campus, image, content } = params;

  const campusArray = campus ? JSON.parse(campus as string) : [];
  const announcementId = id ? parseInt(id as string) : 0;
  const liked = isLiked(announcementId);

  const handleLikeToggle = () => {
    if (announcementId) {
      toggleLike(announcementId);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={singleAnnouncementStyles.container}>
        <View style={singleAnnouncementStyles.imageContainer}>
          {image ? (
            <Image
              source={{ uri: image as string }}
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
        </View>

        <View style={singleAnnouncementStyles.content}>
          <Text
            style={[
              singleAnnouncementStyles.description,
              { color: colors.text },
            ]}
          >
            {description as string}
          </Text>

          <View style={singleAnnouncementStyles.detailsContainer}>
            <View
              style={[
                singleAnnouncementStyles.detailRow,
                { borderBottomColor: colors.border },
              ]}
            >
              <Text
                style={[
                  singleAnnouncementStyles.detailLabel,
                  { color: colors.subtitle },
                ]}
              >
                Fecha:
              </Text>
              <Text
                style={[
                  singleAnnouncementStyles.detailValue,
                  { color: colors.text },
                ]}
              >
                {date as string}
              </Text>
            </View>

            <View
              style={[
                singleAnnouncementStyles.detailRow,
                { borderBottomColor: colors.border },
              ]}
            >
              <Text
                style={[
                  singleAnnouncementStyles.detailLabel,
                  { color: colors.subtitle },
                ]}
              >
                Campus:
              </Text>
              <View style={singleAnnouncementStyles.campusContainer}>
                {campusArray.map((camp: string, index: number) => (
                  <View
                    key={index}
                    style={[
                      singleAnnouncementStyles.campusTag,
                      { backgroundColor: colors.primary },
                    ]}
                  >
                    <Text
                      style={[
                        singleAnnouncementStyles.campusText,
                        { color: "white" },
                      ]}
                    >
                      {camp}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View
              style={[
                singleAnnouncementStyles.detailRow,
                { borderBottomColor: colors.border },
              ]}
            >
              <Text
                style={[
                  singleAnnouncementStyles.detailLabel,
                  { color: colors.subtitle },
                ]}
              >
                Estado:
              </Text>
              <TouchableOpacity
                onPress={handleLikeToggle}
                style={singleAnnouncementStyles.likeButton}
              >
                <Ionicons
                  name={liked ? "heart" : "heart-outline"}
                  size={24}
                  color={liked ? colors.accent : colors.subtitle}
                />
                <Text
                  style={[
                    singleAnnouncementStyles.detailValue,
                    { color: colors.text, marginLeft: 8 },
                  ]}
                >
                  {liked ? "Like" : "Dislike"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
    
  );
}
