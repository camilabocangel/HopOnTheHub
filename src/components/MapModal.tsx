import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
  Platform,
  Linking,
} from 'react-native';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
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

interface RouteInfo {
  distance: number;
  duration: number;
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyBbtW_W8k3gT5uEIzqjKVNsQGI4P31mH5w'; 

export default function MapModal({ 
  visible, 
  onClose, 
  campuses, 
  place, 
  isMultiCampus = false 
}: MapModalProps) {
  const { colors } = useThemeColors();
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{latitude: number; longitude: number} | null>(null);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [showRoute, setShowRoute] = useState(false);
  
  const mapRef = useRef<MapView>(null);
  
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
      requestLocationPermission();
    }
  }, [visible]);

  const requestLocationPermission = async () => {
    setIsLoadingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permisos de ubicación',
          'Se necesitan permisos de ubicación para mostrar tu posición y calcular rutas.',
          [{ text: 'OK' }]
        );
        setIsLoadingLocation(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }, 1000);
      }
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
      Alert.alert('Error', 'No se pudo obtener la ubicación actual');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  useEffect(() => {
    if (visible) {
      setSelectedMarker(null);
      setShowRoute(false);
      setRouteInfo(null);
      resetHighlights();
      
      setTimeout(() => {
        animateMarkersIn({ duration: 600, delay: 300 });
      }, 100);
    }
  }, [visible]);

  const handleMarkerPress = (index: number) => {
    setSelectedMarker(index);
    highlightMarker(index);
    setShowRoute(false);
    setRouteInfo(null);
  };

  const handleMapPress = () => {
    setSelectedMarker(null);
    resetHighlights();
    setShowRoute(false);
    setRouteInfo(null);
  };

  const handleShowRoute = () => {
    if (selectedMarker === null || !userLocation) return;
    
    setIsLoadingRoute(true);
    setShowRoute(true);
    
    
  };

  const handleRouteReady = (result: any) => {
    setIsLoadingRoute(false);
    setRouteInfo({
      distance: result.distance,
      duration: result.duration,
    });

    if (mapRef.current) {
      mapRef.current.fitToCoordinates(result.coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  const handleRouteError = (error: any) => {
    setIsLoadingRoute(false);
    console.error('Error al calcular la ruta:', error);
    Alert.alert('Error', 'No se pudo calcular la ruta');
  };

  const handleOpenInMaps = () => {
    if (selectedMarker === null) return;

    const destination = campuses[selectedMarker];
    const url = Platform.select({
      ios: `maps://app?daddr=${destination.latitude},${destination.longitude}`,
      android: `google.navigation:q=${destination.latitude},${destination.longitude}`,
    });

    Linking.openURL(url!).catch(() => {
      const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}`;
      Linking.openURL(webUrl);
    });
  };

  const getDestination = () => {
    if (selectedMarker === null) return null;
    return campuses[selectedMarker];
  };

  const destination = getDestination();

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
          <View style={styles.headerContent}>
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

        <View style={[styles.controls, { backgroundColor: colors.surface }]}>
          <TouchableOpacity 
            style={[styles.controlButton, { backgroundColor: colors.primary }]}
            onPress={requestLocationPermission}
            disabled={isLoadingLocation}
          >
            {isLoadingLocation ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons name="locate" size={20} color="#fff" />
            )}
            <Text style={styles.controlButtonText}>Mi ubicación</Text>
          </TouchableOpacity>

          {selectedMarker !== null && userLocation && (
            <TouchableOpacity 
              style={[styles.controlButton, { backgroundColor: colors.primary }]}
              onPress={handleShowRoute}
              disabled={isLoadingRoute}
            >
              {isLoadingRoute ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Ionicons name="navigate" size={20} color="#fff" />
              )}
              <Text style={styles.controlButtonText}>Cómo llegar</Text>
            </TouchableOpacity>
          )}

          {selectedMarker !== null && (
            <TouchableOpacity 
              style={[styles.controlButton, { backgroundColor: colors.subtitle }]}
              onPress={handleOpenInMaps}
            >
              <Ionicons name="open" size={20} color="#fff" />
              <Text style={styles.controlButtonText}>Abrir en Maps</Text>
            </TouchableOpacity>
          )}
        </View>

        {routeInfo && (
          <View style={[styles.routeInfo, { backgroundColor: colors.surface }]}>
            <Text style={[styles.routeText, { color: colors.text }]}>
              Distancia: {(routeInfo.distance / 1000).toFixed(1)} km
            </Text>
            <Text style={[styles.routeText, { color: colors.text }]}>
              Tiempo: {Math.ceil(routeInfo.duration)} min
            </Text>
          </View>
        )}
        
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={mapRegion}
          onPress={handleMapPress}
          showsUserLocation={true}
          showsMyLocationButton={false}
        >
          {userLocation && (
            <Marker
              coordinate={userLocation}
              title="Tu ubicación"
              pinColor={colors.primary}
            />
          )}

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

          {showRoute && userLocation && destination && (
            <MapViewDirections
              origin={userLocation}
              destination={destination}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={4}
              strokeColor={colors.primary}
              onReady={handleRouteReady}
              onError={handleRouteError}
            />
          )}
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
  headerContent: {
    flex: 1,
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
  controls: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    flex: 1,
    justifyContent: 'center',
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  routeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  routeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  map: {
    flex: 1,
  },
});