import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/hooks/useThemeColors';
import { getMapRegionForCampuses } from '@/utils/campusUtils';

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

  const mapRegion = getMapRegionForCampuses(
    campuses.map(c => c.title.toLowerCase() as any)
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
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
          </View>
        </View>
        
        <MapView
          style={styles.map}
          initialRegion={mapRegion}
        >
          {campuses.map((campus, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: campus.latitude,
                longitude: campus.longitude,
              }}
              title={campus.title}
              description={place}
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
  map: {
    flex: 1,
  },
});