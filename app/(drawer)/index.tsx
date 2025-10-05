import React from 'react';
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useThemeColors } from '../hooks/useThemeColors';
import Section from '../components/Section';
import CampusButton from '../components/CampusButton';

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const { colors } = useThemeColors();
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.hero, {height: height - 10}]}>
        <Image source={require('../../assets/upb.jpg')} style={styles.heroImage} resizeMode="cover" />
        <Ionicons name="chevron-down" size={32} color="white" style={styles.downIcon} />
      </View>

      {/* Hoy en tu horario */}
      <Section title="Hoy en tu horario">
        <Text style={{ color: colors.text }}>Aquí irá el horario de hoy</Text>
      </Section>

      {/* Campus */}
      <Section title="Campus">
        <View style={styles.row}>
          <CampusButton label="La Paz" onPress={() => router.push('/(drawer)/eventos?campus=LaPaz')} />
          <CampusButton label="Cochabamba" onPress={() => router.push('/(drawer)/eventos?campus=Cochabamba')} />
          <CampusButton label="Santa Cruz" onPress={() => router.push('/(drawer)/eventos?campus=SantaCruz')} />
        </View>
      </Section>

      {/* Horario */}
      <Section title="Horario">
        <Text style={{ color: colors.text }}>Aquí van las carreras...</Text>
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 250,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  downIcon: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
});
