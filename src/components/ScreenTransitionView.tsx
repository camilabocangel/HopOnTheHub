import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface ScreenTransitionViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  duration?: number;
  delay?: number;
}

export const ScreenTransitionView: React.FC<ScreenTransitionViewProps> = ({ 
  children, 
  style,
  duration = 400,
  delay = 0
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View 
      style={[
        { 
          flex: 1,
          opacity,
          transform: [{ translateY }]
        }, 
        style
      ]}
    >
      {children}
    </Animated.View>
  );
};