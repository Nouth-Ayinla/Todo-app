import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../theme/colors';

interface TodoItemProps {
  todo: {
    _id: string;
    text: string;
    completed: boolean;
    order: number;
  };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <View
      style={[styles.container, { borderBottomColor: colors.border, backgroundColor: colors.cardBackground }]}
    >
      <TouchableOpacity
        style={[styles.checkbox, { borderColor: colors.border }]}
        onPress={() => onToggle(todo._id)}
        activeOpacity={0.7}
      >
        {todo.completed && (
          <LinearGradient
            colors={colors.checkboxBg}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.checkboxFilled}
          >
            <Text style={styles.checkmark}>✓</Text>
          </LinearGradient>
        )}
      </TouchableOpacity>

      <Text
        style={[
          styles.text,
          { color: todo.completed ? colors.completed : colors.text },
          todo.completed && styles.textCompleted,
        ]}
      >
        {todo.text}
      </Text>

      <TouchableOpacity onPress={() => onDelete(todo._id)} activeOpacity={0.7}>
        <Text style={[styles.deleteIcon, { color: colors.textMuted }]}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxFilled: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  text: {
    flex: 1,
    fontSize: 18,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
  },
  deleteIcon: {
    fontSize: 18,
    padding: 4,
  },
});
