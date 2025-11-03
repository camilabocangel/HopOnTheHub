// components/MapHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/hooks/useThemeColors';
import { generalMapStyles } from '@/styles/generalMapStyles';

interface MapHeaderProps {
  eventCount: number;
  onClose: () => void;
  onTogglePanel: () => void;
  showEventsPanel: boolean;
}

export function MapHeader({ 
  eventCount, 
  onClose, 
  onTogglePanel, 
  showEventsPanel 
}: MapHeaderProps) {
  const { colors } = useThemeColors();

  return (
    <View style={generalMapStyles.header}>
      <TouchableOpacity onPress={onClose} style={generalMapStyles.closeButton}>
        <Ionicons name="close" size={24} color={colors.text} />
      </TouchableOpacity>
      <View style={generalMapStyles.headerContent}>
        <Text style={[generalMapStyles.title, { color: colors.text }]}>
          Mapa de Eventos
        </Text>
        <Text style={[generalMapStyles.subtitle, { color: colors.subtitle }]}>
          {eventCount} eventos encontrados
        </Text>
      </View>
      <TouchableOpacity 
        style={[generalMapStyles.togglePanelButton, { backgroundColor: colors.primary }]}
        onPress={onTogglePanel}
      >
        <Ionicons 
          name={showEventsPanel ? "list" : "list-outline"} 
          size={20} 
          color="#fff" 
        />
      </TouchableOpacity>
    </View>
  );
}