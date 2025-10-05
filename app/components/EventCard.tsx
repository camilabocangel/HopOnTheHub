import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

type Props = { title: string };

export default function EventCard({ title }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  card: {
    width: width * 0.6,
    height: 120,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { fontWeight: '600' },
});
