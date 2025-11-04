import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/hooks/useThemeColors';
import { generalMapStyles } from '@/styles/generalMapStyles';
import { router } from 'expo-router';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  place: string;
  category: string;
  campus: any;
  description: string;
  image?: string;
  content?: string;
  status: string;
  createdBy?: string;
  createdAt?: any;
}

interface EventsPanelProps {
  events: Event[];
  selectedCampus: string | null;
  getCampusDisplayName: (campusKey: string) => string;
  getEventCampusDisplay: (event: Event) => string;
  onClose: () => void;
  onClosePanel: () => void;
}

export function EventsPanel({
  events,
  selectedCampus,
  getCampusDisplayName,
  getEventCampusDisplay,
  onClose,
  onClosePanel,
}: EventsPanelProps) {
  const { colors } = useThemeColors();

  const handleEventPress = (event: Event) => {
    onClose();
    router.push({
      pathname: "/singleEvent",
      params: {
        id: event.id,
        title: event.title,
        date: event.date,
        time: event.time,
        place: event.place,
        category: event.category,
        description: event.description,
        image: event.image || '',
        content: event.content || '',
        campus: event.campus,
        status: event.status,
        createdBy: event.createdBy || '',
        createdAt: event.createdAt ? event.createdAt.toString() : '',
      },
    });
  };

  return (
    <View style={[generalMapStyles.eventsContainer, { backgroundColor: colors.background }]}>
      <View style={generalMapStyles.eventsHeader}>
        <Text style={[generalMapStyles.eventsTitle, { color: colors.text }]}>
          {selectedCampus 
            ? `Eventos en ${getCampusDisplayName(selectedCampus)}` 
            : 'Todos los eventos'
          }
        </Text>
        <TouchableOpacity 
          onPress={onClosePanel}
          style={generalMapStyles.closePanelButton}
        >
          <Ionicons name="close" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={generalMapStyles.eventsList}>
        {events.map(event => (
          <TouchableOpacity
            key={event.id}
            style={[generalMapStyles.eventItem, { backgroundColor: colors.surface }]}
            onPress={() => handleEventPress(event)}
          >
            <View style={generalMapStyles.eventInfo}>
              <Text style={[generalMapStyles.eventTitle, { color: colors.text }]}>
                {event.title}
              </Text>
              <Text style={[generalMapStyles.eventDetails, { color: colors.subtitle }]}>
                {event.date} • {event.time} • {event.place}
              </Text>
              <View style={generalMapStyles.eventMeta}>
                <Text style={[generalMapStyles.eventCategory, { color: colors.primary }]}>
                  {event.category}
                </Text>
                <Text style={[generalMapStyles.eventCampus, { color: colors.subtitle }]}>
                  {getEventCampusDisplay(event)}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.subtitle} />
          </TouchableOpacity>
        ))}
        
        {events.length === 0 && (
          <View style={generalMapStyles.noEvents}>
            <Ionicons name="calendar-outline" size={48} color={colors.subtitle} />
            <Text style={[generalMapStyles.noEventsText, { color: colors.subtitle }]}>
              No hay eventos con los filtros seleccionados
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}