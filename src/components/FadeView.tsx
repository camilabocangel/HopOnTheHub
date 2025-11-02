import React from 'react';
import { Animated, ViewStyle } from 'react-native';

interface FadeViewProps {
  opacity: Animated.Value;
  transform?: any[];
  styles?: ViewStyle;
  children: React.ReactNode;
}

export const FadeView: React.FC<FadeViewProps> = ({ 
  opacity, 
  transform = [], 
  styles, 
  children 
}) => {
  return (
    <Animated.View 
      style={[
        { 
          opacity,
          transform: [...transform]
        }, 
        styles
      ]}
    >
      {children}
    </Animated.View>
  );
};