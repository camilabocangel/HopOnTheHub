import { useRef, useEffect } from "react";
import { Animated } from "react-native";

type ScreenTransitionOptions = {
  duration?: number;
  delay?: number;
  easing?: (value: number) => number;
};

export const useScreenTransition = (initialOpacity: number = 0) => {
  const opacity = useRef(new Animated.Value(initialOpacity)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  const runTransition = (toValue: number = 1, opts: ScreenTransitionOptions = {}) => {
    opacity.setValue(toValue === 1 ? 0 : 1);
    translateY.setValue(toValue === 1 ? 30 : 0);
    return new Promise<void>((resolve) => {
      const config = {
        toValue,
        duration: opts.duration || 400,
        delay: opts.delay || 0,
        easing: opts.easing,
        useNativeDriver: true,
      };

      Animated.parallel([
        Animated.timing(opacity, config),
        Animated.timing(translateY, {
          ...config,
          toValue: toValue === 1 ? 0 : 30,
        }),
      ]).start(() => resolve());
    });
  };

  const enter = (opts?: ScreenTransitionOptions) => runTransition(1, opts);
  const exit = (opts?: ScreenTransitionOptions) => runTransition(0, opts);

  return {
    opacity,
    translateY,
    enter,
    exit,
    style: {
      opacity,
      transform: [{ translateY }],
    },
  };
};