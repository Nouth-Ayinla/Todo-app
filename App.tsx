import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { ErrorBoundary } from './src/components/ErrorBoundary';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function App() {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ConvexProvider client={convex}>
          <ThemeProvider>
            <HomeScreen />
          </ThemeProvider>
        </ConvexProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
