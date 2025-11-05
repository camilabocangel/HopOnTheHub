import React, { useState } from 'react';
import { TouchableOpacity, Animated, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLikeAnimation } from '../hooks/useLikeAnimation';

interface AnimatedLikeButtonProps {
  isLiked: boolean;
  onPress: () => Promise<boolean> | void;
  size?: number;
  color?: string;
  likedColor?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const AnimatedLikeButton: React.FC<AnimatedLikeButtonProps> = ({
  isLiked,
  onPress,
  size = 24,
  color = "#555",
  likedColor = "#ff3b30",
  style,
  testID,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { transform, animateLike, animatePress } = useLikeAnimation();

  const handlePress = async () => {
    if (isAnimating) return;

    setIsAnimating(true);
    
    try {
      await animatePress();
      
      const result = await onPress();
      
      if (result !== false) {
        await animateLike(!isLiked, {
          duration: 500,
          scale: 1.4,
        });
      }
    } catch (error) {
      console.error('Error in like animation:', error);
    } finally {
      setIsAnimating(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isAnimating}
      hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
      style={style}
      testID={testID}
    >
      <Animated.View style={{ transform }}>
        <Ionicons
          name={isLiked ? "heart" : "heart-outline"}
          size={size}
          color={isLiked ? likedColor : color}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};