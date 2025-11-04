import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
  FlatList,
} from "react-native";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useTheme } from "../contexts/ThemeContext";
import { lightTheme, darkTheme } from "../theme/colors";
import { TodoInput } from "../components/TodoInput";
import { TodoItem } from "../components/TodoItem";
import { TodoFilters, FilterType } from "../components/TodoFilters";
import { ThemeToggle } from "../components/ThemeToggle";
import { EmptyState } from "../components/EmptyState";

export const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;
  const [filter, setFilter] = useState<FilterType>("all");

  // Convex queries and mutations
  const todos = useQuery(api.todos.getTodos);
  const createTodo = useMutation(api.todos.createTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const clearCompleted = useMutation(api.todos.clearCompleted);
  const reorderTodos = useMutation(api.todos.reorderTodos);

  // Filter todos
  const filteredTodos = useMemo(() => {
    if (!todos) return [];

    console.log("Total todos:", todos.length);

    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  console.log("Filtered todos:", filteredTodos.length);

  // Calculate counts
  const activeCount = todos?.filter((t) => !t.completed).length || 0;
  const completedCount = todos?.filter((t) => t.completed).length || 0;

  const handleAddTodo = async (text: string) => {
    try {
      await createTodo({ text });
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleToggleTodo = async (id: string) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo({ id });
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleClearCompleted = async () => {
    try {
      await clearCompleted();
    } catch (error) {
      console.error("Error clearing completed:", error);
    }
  };

  const handleReorder = async ({
    fromIndex,
    toIndex,
  }: {
    fromIndex: number;
    toIndex: number;
  }) => {
    if (!todos) return;

    const reordered = [...todos];
    const [movedItem] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, movedItem);

    const updates = reordered.map((todo, index) => ({
      id: todo._id,
      order: index,
    }));

    try {
      await reorderTodos({ updates });
    } catch (error) {
      console.error("Error reordering todos:", error);
    }
  };

  if (todos === undefined) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />

      <ImageBackground
        source={require("../../assets/bg-mobile.jpg")}
        style={styles.headerBackground}
        imageStyle={styles.headerBackgroundImage}
      >
        <SafeAreaView>
          <View style={styles.header}>
            <Text style={styles.title}>TODO</Text>
            <ThemeToggle />
          </View>
        </SafeAreaView>
      </ImageBackground>

      <View style={styles.content}>
        <TodoInput onAdd={handleAddTodo} />

        <View
          style={[styles.todoCard, { backgroundColor: colors.cardBackground }]}
        >
          {filteredTodos.length === 0 ? (
            <EmptyState />
          ) : (
            <FlatList
              data={filteredTodos}
              renderItem={({ item }) => (
                <TodoItem
                  todo={item}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                />
              )}
              keyExtractor={(item) => item._id}
            />
          )}

          <View style={[styles.infoRow, { borderTopColor: colors.border }]}>
            <Text style={{ color: colors.textMuted, fontSize: 14 }}>
              {activeCount} {activeCount === 1 ? "item" : "items"} left
            </Text>
            <Text
              style={[
                styles.clearText,
                {
                  color: colors.textMuted,
                  opacity: completedCount === 0 ? 0.5 : 1,
                },
              ]}
              onPress={completedCount > 0 ? handleClearCompleted : undefined}
            >
              Clear Completed
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.filtersCard,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <TodoFilters activeFilter={filter} onFilterChange={setFilter} />
        </View>

        <Text style={[styles.hint, { color: colors.textMuted }]}>
          Drag and drop to reorder list
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerBackground: {
    paddingBottom: 80,
  },
  headerBackgroundImage: {
    resizeMode: "cover",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 15,
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: -60,
  },
  todoCard: {
    borderRadius: 5,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  clearText: {
    fontSize: 14,
  },
  filtersCard: {
    borderRadius: 5,
    marginTop: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  hint: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 14,
  },
});
