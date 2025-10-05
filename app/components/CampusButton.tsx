import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = { label: string; onPress: () => void };

export default function CampusButton({ label, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
  },
  text: { color: 'white', fontWeight: '600' },
});
