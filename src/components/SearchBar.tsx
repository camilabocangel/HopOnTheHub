import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useThemeColors } from "../hooks/useThemeColors";

type SearchBarProps = {
  value: string;
  onChange: (t: string) => void;
  placeholder?: string;
  onClear?: () => void;
  style?: StyleProp<ViewStyle>;
  inputProps?: TextInputProps;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder,
  onClear,
  style,
  inputProps,
}) => {
  const { colors } = useThemeColors();

  const handleClear = () => {
    if (onClear) {
      onClear();
      return;
    }
    onChange("");
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.searchWrapper,
          { 
            backgroundColor: colors.surface,
            borderColor: value ? colors.primary : colors.border
          },
          style,
        ]}
      >
        <Ionicons
          name="search"
          size={18}
          color={value ? colors.primary : colors.subtitle}
          style={styles.icon}
        />
        <TextInput
          style={[styles.input, { color: colors.primary }]}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder ?? "Buscar..."}
          placeholderTextColor={colors.subtitle}
          returnKeyType="search"
          clearButtonMode="never"
          {...inputProps}
        />
      </View>

      {value.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClear}
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
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 3,
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
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
});