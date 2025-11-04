import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../theme/colors';

export type FilterType = 'all' | 'active' | 'completed';

interface TodoFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={styles.container}>
      {(['all', 'active', 'completed'] as FilterType[]).map((filter) => (
        <TouchableOpacity
          key={filter}
          onPress={() => onFilterChange(filter)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.filterText,
              { color: activeFilter === filter ? colors.primary : colors.textMuted },
              activeFilter === filter && styles.filterTextActive,
            ]}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 16,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  filterTextActive: {
    fontWeight: 'bold',
  },
});
