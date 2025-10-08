import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useThemeColors } from "../hooks/useThemeColors";
import singleEventsStyles from "../styles/sinlgeEventStyles";

export default function SingleEventScreen() {
  const { colors } = useThemeColors();
  const params = useLocalSearchParams();

  const {
    id,
    title,
    date,
    time,
    place,
    category,
    description,
    image,
    content,
  } = params;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={singleEventsStyles.container}>

        <View style={singleEventsStyles.imageContainer}>
          {image ? (
            <Image
              source={{ uri: image as string }}
              style={singleEventsStyles.image}
              resizeMode="cover"
            />
          ) : (
            <View
              style={[
                singleEventsStyles.placeholderImage,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text style={singleEventsStyles.placeholderText}>
                {title as string}
              </Text>
            </View>
          )}
        </View>

        <View style={singleEventsStyles.content}>
          <Text style={[singleEventsStyles.title, { color: colors.text }]}>
            {title as string}
          </Text>

          <View style={singleEventsStyles.detailsContainer}>
            <View
              style={[
                singleEventsStyles.detailRow,
                { borderBottomColor: colors.border },
              ]}
            >
              <Text
                style={[
                  singleEventsStyles.detailLabel,
                  { color: colors.subtitle },
                ]}
              >
                Fecha:
              </Text>
              <Text
                style={[singleEventsStyles.detailValue, { color: colors.text }]}
              >
                {date as string}
              </Text>
            </View>

            <View
              style={[
                singleEventsStyles.detailRow,
                { borderBottomColor: colors.border },
              ]}
            >
              <Text
                style={[
                  singleEventsStyles.detailLabel,
                  { color: colors.subtitle },
                ]}
              >
                Hora:
              </Text>
              <Text
                style={[singleEventsStyles.detailValue, { color: colors.text }]}
              >
                {time as string}
              </Text>
            </View>

            <View
              style={[
                singleEventsStyles.detailRow,
                { borderBottomColor: colors.border },
              ]}
            >
              <Text
                style={[
                  singleEventsStyles.detailLabel,
                  { color: colors.subtitle },
                ]}
              >
                Lugar:
              </Text>
              <Text
                style={[singleEventsStyles.detailValue, { color: colors.text }]}
              >
                {place as string}
              </Text>
            </View>

            <View
              style={[
                singleEventsStyles.detailRow,
                { borderBottomColor: colors.border },
              ]}
            >
              <Text
                style={[
                  singleEventsStyles.detailLabel,
                  { color: colors.subtitle },
                ]}
              >
                Categoría:
              </Text>
              <Text
                style={[
                  singleEventsStyles.detailValue,
                  { color: colors.primary },
                ]}
              >
                {category as string}
              </Text>
            </View>
          </View>

          <View style={singleEventsStyles.section}>
            <Text
              style={[singleEventsStyles.sectionTitle, { color: colors.text }]}
            >
              Descripción
            </Text>
            <Text
              style={[
                singleEventsStyles.sectionContent,
                { color: colors.text },
              ]}
            >
              {description as string}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
