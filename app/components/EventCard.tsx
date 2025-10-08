import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import eventCardStyles from "../styles/eventCardStyles";
import { EventCardProps } from "../data/events";

const EventCard = ({
  title,
  date,
  time,
  place,
  category,
  description,
  image,
}: EventCardProps) => {
  return (
    <TouchableOpacity style={eventCardStyles.card}>
      {image ? (
        <Image source={{uri:image}} style={eventCardStyles.image} />
      ) : (
        <View style={[eventCardStyles.image, eventCardStyles.placeholderImage]}>
          <Text style={eventCardStyles.placeholderText}>UPB</Text>
        </View>
      )}

      <View style={eventCardStyles.content}>
        <Text style={eventCardStyles.category}>{category}</Text>
        <Text style={eventCardStyles.title} numberOfLines={2}>
          {title}
        </Text>

        <View style={eventCardStyles.details}>
          <Text style={eventCardStyles.detailText}>📅 {date}</Text>
          <Text style={eventCardStyles.detailText}>🕒 {time}</Text>
          <Text style={eventCardStyles.detailText} numberOfLines={1}>
            📍 {place}
          </Text>
        </View>

        {description && (
          <Text style={eventCardStyles.description} numberOfLines={2}>
            {description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
