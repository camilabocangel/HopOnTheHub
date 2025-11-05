import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useThemeColors } from "../hooks/useThemeColors";

export type DateFilterType = "today" | "week" | "month" | null;

interface DateFilterProps {
  selectedFilter: DateFilterType;
  onFilterChange: (filter: DateFilterType) => void;
}

export const DateFilter: React.FC<DateFilterProps> = ({
  selectedFilter,
  onFilterChange,
}) => {
  const { colors } = useThemeColors();

  const handleFilterPress = () => {
    switch (selectedFilter) {
      case null:
        onFilterChange("today");
        break;
      case "today":
        onFilterChange("week");
        break;
      case "week":
        onFilterChange("month");
        break;
      case "month":
        onFilterChange("today");
        break;
    }
  };

  const handleClearFilter = () => {
    onFilterChange(null);
  };

  const getFilterLabel = () => {
    switch (selectedFilter) {
      case "today":
        return "Hoy";
      case "week":
        return "Esta semana";
      case "month":
        return "Este mes";
      default:
        return "Filtrar por fecha";
    }
  };

  const getFilterIcon = () => {
    switch (selectedFilter) {
      case "today":
        return "today";
      case "week":
        return "calendar";
      case "month":
        return "calendar-outline";
      default:
        return "calendar-clear";
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.filterButton,
          {
            backgroundColor: colors.surface,
            borderColor: selectedFilter ? colors.primary : colors.border,
          },
        ]}
        onPress={handleFilterPress}
      >
        <Ionicons
          name={getFilterIcon()}
          size={18}
          color={selectedFilter ? colors.primary : colors.subtitle}
          style={styles.icon}
        />
        <Text
          style={[
            styles.filterText,
            {
              color: selectedFilter ? colors.primary : colors.text,
            },
          ]}
        >
          {getFilterLabel()}
        </Text>
      </TouchableOpacity>

      {selectedFilter && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearFilter}
          hitSlop={8}
        >
          <Ionicons name="close-circle" size={20} color={colors.subtitle} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  icon: {
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
});
