import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Section from '../components/Section';
import EventCard from '../components/EventCard';

const dummyEvents = [
  { id: '1', titulo: 'Fiesta de Bienvenida', categoria: 'social' },
  { id: '2', titulo: 'Conferencia IA', categoria: 'academico' },
  { id: '3', titulo: 'Torneo de Fútbol', categoria: 'deportes' },
];

export default function EventosScreen() {
  const { campus } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos en {campus}</Text>

      <Section title="Social">
        <FlatList
          horizontal
          data={dummyEvents.filter(e => e.categoria === 'social')}
          renderItem={({ item }) => <EventCard title={item.titulo} />}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </Section>

      <Section title="Académico">
        <FlatList
          horizontal
          data={dummyEvents.filter(e => e.categoria === 'academico')}
          renderItem={({ item }) => <EventCard title={item.titulo} />}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </Section>

      <Section title="Deportes">
        <FlatList
          horizontal
          data={dummyEvents.filter(e => e.categoria === 'deportes')}
          renderItem={({ item }) => <EventCard title={item.titulo} />}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
});
