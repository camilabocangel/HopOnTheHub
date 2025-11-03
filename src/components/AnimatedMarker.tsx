import React from 'react';
import { Animated } from 'react-native';
import { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/hooks/useThemeColors';

interface AnimatedMarkerProps {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description: string;
  opacity: Animated.Value;
  scale: Animated.Value;
  isHighlighted?: boolean;
  onPress?: () => void;
}

export const AnimatedMarker: React.FC<AnimatedMarkerProps> = ({
  coordinate,
  title,
  description,
  opacity,
  scale,
  isHighlighted = false,
  onPress,
}) => {
  const { colors } = useThemeColors();

  const transform = [
    { scale },
    { translateY: scale.interpolate({
        inputRange: [1, 1.3],
        outputRange: [0, -5]
      }) 
    }
  ];

  return (
    <Marker
      coordinate={coordinate}
      title={title}
      description={description}
      onPress={onPress}
    >
      <Animated.View style={{ opacity, transform }}>
        <Ionicons 
          name="location" 
          size={isHighlighted ? 32 : 24} 
          color={isHighlighted ? colors.primary : colors.primary} 
        />
      </Animated.View>
    </Marker>
  );
};