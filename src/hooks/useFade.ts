import { useRef } from "react";
import { Animated, Easing } from "react-native";

type FadeOptions = {
  to?: number;
  duration?: number;
  delay?: number;
  easing?: (value: number) => number;
};

export const useFade = (initial: number = 0, distance: number = 50, direction: string = 'up') => {
  const opacity = useRef(new Animated.Value(initial)).current;
  const translate = useRef(new Animated.Value(distance)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  const run = (toValue: number = 1, opts: FadeOptions = {}) => {
    return new Promise<void>((resolve) => {
      const config = {
        toValue,
        duration: opts.duration || 400,
        delay: opts.delay || 0,
        easing: opts.easing || Easing.out(Easing.cubic),
        useNativeDriver: true,
      };


      Animated.parallel([
        Animated.timing(opacity, config),
        Animated.timing(translate, {
          ...config,
          toValue: toValue === 1 ? 0 : distance,
        }),
        Animated.timing(scale, { ...config, toValue: toValue === 1 ? 1 : 0.95 }),

      ]).start(() => resolve());
    });
  };

  const fadeIn = (opts?: FadeOptions) => run(1, opts);
  const fadeOut = (opts?: FadeOptions) => run(0, opts);

  const transform = [
  ...(direction === 'up' || direction === 'down' ? [{ translateY: translate }] : []),
  { scale },
];


  return {
    fadeIn,
    fadeOut,
    opacity,
    transform,
  };
};