# Snap Done - React Native Todo App with Convex

A beautiful, fully-featured todo application built with React Native, Expo, and Convex backend. Features real-time synchronization, drag-and-drop reordering, and dark/light theme support.

# Features

Full CRUD Operations

- Create new todos
- Mark todos as complete/incomplete
- Delete individual todos
- Clear all completed todos

Real-time Sync

- Powered by Convex backend
- Instant updates across devices
- Offline-first architecture

Drag & Drop

- Reorder todos with smooth animations
- Touch-optimized gestures

Theme Support

- Light and dark modes
- Persistent theme preference
- Smooth theme transitions

Filters

- View all todos
- Filter by active
- Filter by completed

Beautiful UI

- Pixel-perfect design
- Smooth animations
- Responsive layout

## Prerequisites

Before you begin, ensure you have:

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Convex CLI (`npm install -g convex`)
- iOS Simulator (for Mac) or Android Studio (for Android development)

## Installation

### 1. Clone or Extract the Project

```bash
cd Todo-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Convex Backend

First, create a Convex account at [convex.dev](https://www.convex.dev) if you haven't already.

Then initialize Convex:

```bash
npx convex dev
```

This will:

- Create a new Convex project
- Generate the `convex/_generated` folder
- Start the Convex development server
- Give you a deployment URL

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Update `.env` with your Convex URL (from step 3):

```
EXPO_PUBLIC_CONVEX_URL=https://your-deployment-name.convex.cloud
```

### 5. Start the Development Server

```bash
npm start
```

This will open the Expo developer tools. You can then:

- Press `i` to open iOS simulator
- Press `a` to open Android emulator
- Scan QR code with Expo Go app on your phone

## Project Structure

```
react-native-export/
├── App.tsx                          # Main app entry point
├── convex/                          # Convex backend
│   ├── schema.ts                   # Database schema
│   ├── todos.ts                    # Todo CRUD functions
│   └── _generated/                 # Auto-generated Convex files
├── src/
│   ├── components/                 # React components
│   │   ├── EmptyState.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── TodoFilters.tsx
│   │   ├── TodoInput.tsx
│   │   └── TodoItem.tsx
│   ├── contexts/                   # React contexts
│   │   └── ThemeContext.tsx
│   ├── screens/                    # Screen components
│   │   └── HomeScreen.tsx
│   └── theme/                      # Theme configuration
│       └── colors.ts
├── assets/                         # Images and icons
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
└── tsconfig.json                   # TypeScript configuration
```

# Convex Backend

# Database Schema

The app uses two tables:

todos

- `text` (string): Todo text content
- `completed` (boolean): Completion status
- `order` (number): Position in list
- `createdAt` (number): Creation timestamp
- `updatedAt` (number): Last update timestamp

settings

- `key` (string): Setting identifier
- `value` (string): Setting value

# Available Functions

# Queries

- `getTodos`: Fetch all todos ordered by position

# Mutations

- `createTodo({ text })`: Create a new todo
- `toggleTodo({ id })`: Toggle completion status
- `updateTodo({ id, text })`: Update todo text
- `deleteTodo({ id })`: Delete a todo
- `clearCompleted()`: Delete all completed todos
- `reorderTodos({ updates })`: Update todo positions

# Building for Production

# Android APK

1. Install EAS CLI:

```bash
npm install -g eas-cli
```

2. Login to Expo:

```bash
eas login
```

3. Configure build:

```bash
eas build:configure
```

4. Build APK:

```bash
eas build --platform android --profile preview
```

#  iOS App

```bash
eas build --platform ios
```

Note: iOS builds require an Apple Developer account.

# Deployment

# Deploy Convex Backend

To deploy your Convex backend to production:

```bash
npx convex deploy
```

Update your `.env` file with the production URL.

# Deploy Mobile App

Use Expo Application Services (EAS):

```bash
# For Android
eas build --platform android --profile production

# For iOS
eas build --platform ios --profile production
```

# Troubleshooting

# Convex Connection Issues

If you see "Cannot connect to Convex":

1. Ensure `npx convex dev` is running
2. Check your `.env` file has the correct URL
3. Restart the Expo server

#  Metro Bundler Issues

Clear cache and restart:

```bash
expo start -c
```

# Android Build Errors

1. Clear build cache:

```bash
cd android && ./gradlew clean
```

2. Reinstall dependencies:

```bash
rm -rf node_modules
npm install
```

# iOS Build Errors

1. Clear derived data
2. Run `pod install` in iOS directory
3. Clean build folder in Xcode



# Debugging

- Use `console.log()` for debugging
- Check Convex dashboard for backend logs
- Use React Native Debugger for advanced debugging


