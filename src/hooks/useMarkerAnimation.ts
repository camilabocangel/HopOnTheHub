import { useRef } from "react";
import { Animated } from "react-native";

type AnimationOptions = {
  duration?: number;
  delay?: number;
  easing?: (value: number) => number;
};

export const useMarkerAnimation = (markerCount: number) => {
  const opacities = useRef(
    Array(markerCount).fill(0).map(() => new Animated.Value(0))
  ).current;

  const scales = useRef(
    Array(markerCount).fill(0).map(() => new Animated.Value(1))
  ).current;

  const animateMarkersIn = (opts: AnimationOptions = {}) => {
    const { duration = 500, delay = 0, easing } = opts;
    
    const animations = opacities.map((opacity, index) => 
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay: delay + (index * 100),
        easing,
        useNativeDriver: true,
      })
    );

    return new Promise<void>((resolve) => {
      Animated.stagger(100, animations).start(() => resolve());
    });
  };

  const highlightMarker = (index: number, opts: AnimationOptions = {}) => {
    const { duration = 300, easing } = opts;
    
    scales.forEach(scale => scale.setValue(1));
    
    Animated.sequence([
      Animated.timing(scales[index], {
        toValue: 1.3,
        duration: duration / 2,
        easing,
        useNativeDriver: true,
      }),
      Animated.timing(scales[index], {
        toValue: 1.2,
        duration: duration / 2,
        easing,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const resetHighlights = () => {
    scales.forEach(scale => {
      Animated.timing(scale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  return {
    opacities,
    scales,
    animateMarkersIn,
    highlightMarker,
    resetHighlights,
  };
};