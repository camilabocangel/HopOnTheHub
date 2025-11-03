// components/GeneralMapModal.tsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/hooks/useThemeColors';
import { getMapRegionForCampuses } from '@/utils/campusUtils';
import { useEvents } from '@/hooks/useEvents';
import { useUser } from '@/hooks/useUser';
import * as Location from 'expo-location';

// Componentes modulares
import { generalMapStyles } from '@/styles/generalMapStyles';
import { MapHeader } from './MapHeader';
import { MapFilters } from './MapFilters';
import { EventsPanel } from './EventsPanel';

interface GeneralMapModalProps {
  visible: boolean;
  onClose: () => void;
}

const CAMPUS_COORDINATES = {
  'la paz': { latitude: -16.57491, longitude: -68.12711, title: 'La Paz' },
  'cochabamba': { latitude: -17.23180, longitude: -66.22568, title: 'Cochabamba' },
  'santa cruz': { latitude: -17.81922, longitude: -63.23354, title: 'Santa Cruz' },
};

export default function GeneralMapModal({ visible, onClose }: GeneralMapModalProps) {
  const { colors } = useThemeColors();
  const { user } = useUser();
  const [selectedCampus, setSelectedCampus] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{latitude: number; longitude: number} | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showEventsPanel, setShowEventsPanel] = useState(false);
  
  const mapRef = useRef<MapView>(null);
  const { events: allEvents, loading: eventsLoading } = useEvents();

  // Función para normalizar el campus
  const normalizeCampus = (campus: any): string => {
    if (Array.isArray(campus)) return campus[0] || 'la paz';
    if (typeof campus === 'string') return campus;
    return 'la paz';
  };

  // Función para obtener el campus key normalizado
  const getCampusKey = (campus: any): keyof typeof CAMPUS_COORDINATES => {
    const normalized = normalizeCampus(campus).toLowerCase();
    if (normalized.includes('la paz') || normalized === 'lapaz') return 'la paz';
    if (normalized.includes('cochabamba') || normalized.includes('cocha')) return 'cochabamba';
    if (normalized.includes('santa cruz') || normalized.includes('santacruz')) return 'santa cruz';
    return 'la paz';
  };

  // Filtrar eventos aceptados y mapear coordenadas
  const eventsWithCoordinates = useMemo(() => {
    return allEvents
      .filter(event => event.status === 'accepted')
      .map(event => {
        const campusKey = getCampusKey(event.campus);
        const campusCoords = CAMPUS_COORDINATES[campusKey];
        return {
          ...event,
          campusKey,
          latitude: campusCoords.latitude,
          longitude: campusCoords.longitude,
          campusTitle: campusCoords.title
        };
      });
  }, [allEvents]);

  // Obtener categorías y fechas únicas
  const categories = useMemo(() => {
    return Array.from(new Set(eventsWithCoordinates.map(event => event.category))).filter(Boolean);
  }, [eventsWithCoordinates]);

  const dates = useMemo(() => {
    return Array.from(new Set(eventsWithCoordinates.map(event => event.date))).filter(Boolean);
  }, [eventsWithCoordinates]);

  // Filtrar eventos
  const filteredEvents = useMemo(() => {
    return eventsWithCoordinates.filter(event => {
      if (selectedCampus && event.campusKey !== selectedCampus) return false;
      if (selectedCategory && event.category !== selectedCategory) return false;
      if (selectedDate && event.date !== selectedDate) return false;
      return true;
    });
  }, [eventsWithCoordinates, selectedCampus, selectedCategory, selectedDate]);

  // Agrupar eventos por campus para los marcadores
  const campusEvents = useMemo(() => {
    return Object.entries(CAMPUS_COORDINATES).map(([campusName, coords]) => {
      const campusEventsCount = filteredEvents.filter(event => event.campusKey === campusName).length;
      return { ...coords, eventCount: campusEventsCount };
    });
  }, [filteredEvents]);

  const mapRegion = getMapRegionForCampuses(['la paz', 'cochabamba', 'santa cruz']);

  useEffect(() => {
    if (visible) requestLocationPermission();
  }, [visible]);

  const requestLocationPermission = async () => {
    setIsLoadingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setIsLoadingLocation(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleCampusPress = (campus: string) => {
    setSelectedCampus(selectedCampus === campus ? null : campus);
    if (selectedCampus !== campus) setShowEventsPanel(true);
  };

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleDatePress = (date: string) => {
    setSelectedDate(selectedDate === date ? null : date);
  };

  const clearFilters = () => {
    setSelectedCampus(null);
    setSelectedCategory(null);
    setSelectedDate(null);
  };

  const handleMarkerPress = (campusName: string) => {
    setSelectedCampus(campusName);
    setShowEventsPanel(true);
  };

  const getCampusDisplayName = (campusKey: string) => {
    return CAMPUS_COORDINATES[campusKey as keyof typeof CAMPUS_COORDINATES]?.title || campusKey;
  };

  const getEventCampusDisplay = (event: any) => {
    const campus = event.campus;
    if (Array.isArray(campus)) {
      if (campus.length === 3) return 'Todos los campus';
      if (campus.length === 2) return campus.map(c => getCampusDisplayName(getCampusKey(c))).join(' y ');
      return getCampusDisplayName(getCampusKey(campus[0]));
    }
    return getCampusDisplayName(getCampusKey(campus));
  };

  if (eventsLoading) {
    return (
      <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
        <View style={[generalMapStyles.modalContainer, { backgroundColor: colors.background }]}>
          <View style={generalMapStyles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[generalMapStyles.loadingText, { color: colors.text }]}>
              Cargando eventos...
            </Text>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={[generalMapStyles.modalContainer, { backgroundColor: colors.background }]}>
        
        <MapHeader
          eventCount={filteredEvents.length}
          onClose={onClose}
          onTogglePanel={() => setShowEventsPanel(!showEventsPanel)}
          showEventsPanel={showEventsPanel}
        />

        <MapFilters
          selectedCampus={selectedCampus}
          selectedCategory={selectedCategory}
          selectedDate={selectedDate}
          categories={categories}
          dates={dates}
          onCampusPress={handleCampusPress}
          onCategoryPress={handleCategoryPress}
          onDatePress={handleDatePress}
          onClearFilters={clearFilters}
        />

        <View style={generalMapStyles.content}>
          {/* Mapa */}
          <View style={[
            generalMapStyles.mapContainer, 
            showEventsPanel && generalMapStyles.mapWithPanel
          ]}>
            <MapView
              ref={mapRef}
              style={generalMapStyles.map}
              initialRegion={mapRegion}
              showsUserLocation={true}
              showsMyLocationButton={false}
            >
              {userLocation && (
                <Marker coordinate={userLocation} title="Tu ubicación" pinColor={colors.primary} />
              )}
              {campusEvents.map((campus) => (
                <Marker
                  key={campus.title}
                  coordinate={{ latitude: campus.latitude, longitude: campus.longitude }}
                  title={campus.title}
                  description={`${campus.eventCount} eventos`}
                  onPress={() => handleMarkerPress(campus.title.toLowerCase())}
                  pinColor="red"
                />
              ))}
            </MapView>

            <TouchableOpacity 
              style={[generalMapStyles.locationButton, { backgroundColor: colors.primary }]}
              onPress={requestLocationPermission}
              disabled={isLoadingLocation}
            >
              {isLoadingLocation ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Ionicons name="locate" size={20} color="#fff" />
              )}
            </TouchableOpacity>
          </View>

          {/* Panel de eventos */}
          {showEventsPanel && (
            <EventsPanel
              events={filteredEvents}
              selectedCampus={selectedCampus}
              getCampusDisplayName={getCampusDisplayName}
              getEventCampusDisplay={getEventCampusDisplay}
              onClose={onClose}
              onClosePanel={() => setShowEventsPanel(false)}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}