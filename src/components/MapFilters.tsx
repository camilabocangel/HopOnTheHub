import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/hooks/useThemeColors';
import { generalMapStyles } from '@/styles/generalMapStyles';

interface MapFiltersProps {
  selectedCampus: string | null;
  selectedCategory: string | null;
  selectedDate: string | null;
  categories: string[];
  dates: string[];
  onCampusPress: (campus: string) => void;
  onCategoryPress: (category: string) => void;
  onDatePress: (date: string) => void;
  onClearFilters: () => void;
}

const CAMPUS_COORDINATES = {
  'la paz': { title: 'La Paz' },
  'cochabamba': { title: 'Cochabamba' },
  'santa cruz': { title: 'Santa Cruz' },
};

export function MapFilters({
  selectedCampus,
  selectedCategory,
  selectedDate,
  categories,
  dates,
  onCampusPress,
  onCategoryPress,
  onDatePress,
  onClearFilters,
}: MapFiltersProps) {
  const { colors } = useThemeColors();

  return (
    <View style={[generalMapStyles.filtersContainer, { backgroundColor: colors.surface }]}>
      <View style={generalMapStyles.filterRow}>
        <Text style={[generalMapStyles.filterLabel, { color: colors.text }]}>Campus:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={generalMapStyles.filterOptions}>
          {Object.entries(CAMPUS_COORDINATES).map(([key, campus]) => (
            <TouchableOpacity
              key={key}
              style={[
                generalMapStyles.filterButton,
                { backgroundColor: colors.primary },
                selectedCampus === key && { backgroundColor: colors.accent }
              ]}
              onPress={() => onCampusPress(key)}
            >
              <Text style={generalMapStyles.filterButtonText}>
                {campus.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {categories.length > 0 && (
        <View style={generalMapStyles.filterRow}>
          <Text style={[generalMapStyles.filterLabel, { color: colors.text }]}>Categoría:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={generalMapStyles.filterOptions}>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  generalMapStyles.filterButton,
                  { backgroundColor: colors.primary },
                  selectedCategory === category && { backgroundColor: colors.accent }
                ]}
                onPress={() => onCategoryPress(category)}
              >
                <Text style={generalMapStyles.filterButtonText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {dates.length > 0 && (
        <View style={generalMapStyles.filterRow}>
          <Text style={[generalMapStyles.filterLabel, { color: colors.text }]}>Fecha:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={generalMapStyles.filterOptions}>
            {dates.map(date => (
              <TouchableOpacity
                key={date}
                style={[
                  generalMapStyles.filterButton,
                  { backgroundColor: colors.primary },
                  selectedDate === date && { backgroundColor: colors.accent }
                ]}
                onPress={() => onDatePress(date)}
              >
                <Text style={generalMapStyles.filterButtonText}>{date}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {(selectedCampus || selectedCategory || selectedDate) && (
        <View style={[generalMapStyles.filterRow, { justifyContent: 'flex-end' }]}>
          <TouchableOpacity
            style={[generalMapStyles.clearButton, { backgroundColor: colors.subtitle }]}
            onPress={onClearFilters}
          >
            <Ionicons name="close" size={16} color="#fff" />
            <Text style={generalMapStyles.clearButtonText}>Limpiar filtros</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}