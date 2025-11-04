import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// GET all todos ordered by position
export const getTodos = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("todos")
      .withIndex("by_order")
      .order("asc")
      .collect();
  },
});

// CREATE new todo
export const createTodo = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const todos = await ctx.db.query("todos").collect();
    const maxOrder = todos.reduce((max, todo) => Math.max(max, todo.order), -1);
    
    return await ctx.db.insert("todos", {
      text: args.text,
      completed: false,
      order: maxOrder + 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// UPDATE todo completion status
export const toggleTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new Error("Todo not found");
    
    await ctx.db.patch(args.id, {
      completed: !todo.completed,
      updatedAt: Date.now(),
    });
  },
});

// UPDATE todo text
export const updateTodo = mutation({
  args: { 
    id: v.id("todos"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      text: args.text,
      updatedAt: Date.now(),
    });
  },
});

// DELETE todo
export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// CLEAR all completed todos
export const clearCompleted = mutation({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();
    const completedTodos = todos.filter(todo => todo.completed);
    
    for (const todo of completedTodos) {
      await ctx.db.delete(todo._id);
    }
  },
});

// REORDER todos
export const reorderTodos = mutation({
  args: { 
    updates: v.array(v.object({
      id: v.id("todos"),
      order: v.number(),
    }))
  },
  handler: async (ctx, args) => {
    for (const update of args.updates) {
      await ctx.db.patch(update.id, {
        order: update.order,
        updatedAt: Date.now(),
      });
    }
  },
});
