import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/hooks/useThemeColors';
import { getMapRegionForCampuses } from '@/utils/campusUtils';
import { useMarkerAnimation } from '@/hooks/useMarkerAnimation';
import { AnimatedMarker } from './AnimatedMarker';

interface CampusCoordinate {
  latitude: number;
  longitude: number;
  title: string;
}

interface MapModalProps {
  visible: boolean;
  onClose: () => void;
  campuses: CampusCoordinate[];
  place: string;
  isMultiCampus?: boolean;
}

export default function MapModal({ 
  visible, 
  onClose, 
  campuses, 
  place, 
  isMultiCampus = false 
}: MapModalProps) {
  const { colors } = useThemeColors();
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  
  const { 
    opacities, 
    scales, 
    animateMarkersIn, 
    highlightMarker, 
    resetHighlights 
  } = useMarkerAnimation(campuses.length);

  const mapRegion = getMapRegionForCampuses(
    campuses.map(c => c.title.toLowerCase() as any)
  );

  useEffect(() => {
    if (visible) {
      setSelectedMarker(null);
      resetHighlights();
      
      setTimeout(() => {
        animateMarkersIn({ duration: 600, delay: 300 });
      }, 100);
    }
  }, [visible]);

  const handleMarkerPress = (index: number) => {
    setSelectedMarker(index);
    highlightMarker(index);
  };

  const handleMapPress = () => {
    setSelectedMarker(null);
    resetHighlights();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.placeTitle, { color: colors.text }]}>
              {place}
            </Text>
            <Text style={[styles.campusSubtitle, { color: colors.subtitle }]}>
              {isMultiCampus ? `${campuses.length} campus` : campuses[0]?.title}
            </Text>
            {selectedMarker !== null && (
              <Text style={[styles.selectedCampus, { color: colors.primary }]}>
                Seleccionado: {campuses[selectedMarker].title}
              </Text>
            )}
          </View>
        </View>
        
        <MapView
          style={styles.map}
          initialRegion={mapRegion}
          onPress={handleMapPress}
        >
          {campuses.map((campus, index) => (
            <AnimatedMarker
              key={index}
              coordinate={{
                latitude: campus.latitude,
                longitude: campus.longitude,
              }}
              title={campus.title}
              description={place}
              opacity={opacities[index]}
              scale={scales[index]}
              isHighlighted={selectedMarker === index}
              onPress={() => handleMarkerPress(index)}
            />
          ))}
        </MapView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
  },
  closeButton: {
    padding: 8,
    marginRight: 16,
  },
  placeTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  campusSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  selectedCampus: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  map: {
    flex: 1,
  },
});