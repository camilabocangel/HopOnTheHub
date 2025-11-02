// hooks/useMarkerAnimation.ts
import { useRef } from "react";
import { Animated } from "react-native";

type AnimationOptions = {
  duration?: number;
  delay?: number;
  easing?: (value: number) => number;
};

export const useMarkerAnimation = (markerCount: number) => {
  // Animaciones de opacidad para cada marcador
  const opacities = useRef(
    Array(markerCount).fill(0).map(() => new Animated.Value(0))
  ).current;

  // Animaciones de escala para realce
  const scales = useRef(
    Array(markerCount).fill(0).map(() => new Animated.Value(1))
  ).current;

  // Animación de aparición progresiva
  const animateMarkersIn = (opts: AnimationOptions = {}) => {
    const { duration = 500, delay = 0, easing } = opts;
    
    const animations = opacities.map((opacity, index) => 
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay: delay + (index * 100), // Escalonado: 100ms entre cada marcador
        easing,
        useNativeDriver: true,
      })
    );

    return new Promise<void>((resolve) => {
      Animated.stagger(100, animations).start(() => resolve());
    });
  };

  // Animación para realzar un marcador específico
  const highlightMarker = (index: number, opts: AnimationOptions = {}) => {
    const { duration = 300, easing } = opts;
    
    // Resetear todas las escalas a 1
    scales.forEach(scale => scale.setValue(1));
    
    // Realzar el marcador seleccionado
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

  // Quitar realce de todos los marcadores
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