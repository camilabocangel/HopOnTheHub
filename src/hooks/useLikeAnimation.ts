import { useRef } from "react";
import { Animated } from "react-native";

type LikeAnimationOptions = {
  duration?: number;
  scale?: number;
};

export const useLikeAnimation = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  const animateLike = (isLiked: boolean, options: LikeAnimationOptions = {}): Promise<void> => {
    const { duration = 400, scale = 1.2 } = options;

    scaleAnim.setValue(1);
    bounceAnim.setValue(1);

    const scaleAnimation = Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: scale,
        duration: duration / 2,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: duration / 2,
        useNativeDriver: true,
      }),
    ]);

    const bounceAnimation = isLiked 
      ? Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 1.3,
            duration: duration / 3,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0.9,
            duration: duration / 3,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: duration / 3,
            useNativeDriver: true,
          }),
        ])
      : null;

    return new Promise<void>((resolve) => {
      if (bounceAnimation) {
        Animated.parallel([scaleAnimation, bounceAnimation]).start(() => resolve());
      } else {
        scaleAnimation.start(() => resolve());
      }
    });
  };

  const animatePress = (): Promise<void> => {
    return new Promise<void>((resolve) => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => resolve());
    });
  };

  return {
    scaleAnim,
    bounceAnim,
    animateLike,
    animatePress,
    transform: [
      { scale: scaleAnim },
      { scale: bounceAnim },
    ],
  };
};