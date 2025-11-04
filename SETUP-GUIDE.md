# Complete Setup Guide for Snap Done

This guide will walk you through setting up the React Native Todo app from scratch.

## Step-by-Step Setup

### Step 1: Verify Prerequisites

Check you have the required software:

```bash
# Check Node.js version (should be 16+)
node --version

# Check npm version
npm --version
```

If you don't have Node.js, download it from [nodejs.org](https://nodejs.org/)

### Step 2: Install Global Tools

```bash
# Install Expo CLI
npm install -g expo-cli

# Install Convex CLI
npm install -g convex

# Install EAS CLI (for building)
npm install -g eas-cli
```

### Step 3: Project Setup

```bash
# Navigate to the project folder
cd react-native-export

# Install all dependencies
npm install
```

This will install ~200MB of dependencies. This is normal for React Native projects.

### Step 4: Set Up Convex Backend

This is the most important step!

1. **Create Convex Account**
   - Go to [convex.dev](https://www.convex.dev)
   - Sign up with GitHub or Google

2. **Initialize Convex**

   ```bash
   npx convex dev
   ```

3. **Follow the prompts**
   - Login to your Convex account
   - Create a new project (name it "snap-done")
   - The CLI will generate files in `convex/_generated/`

4. **Copy the Convex URL**
   - After setup completes, you'll see a URL like:
   - `https://happy-animal-123.convex.cloud`
   - Copy this URL!

### Step 5: Configure Environment

1. **Create .env file**

   ```bash
   cp .env.example .env
   ```

2. **Edit .env file**
   Open `.env` and paste your Convex URL:
   ```
   EXPO_PUBLIC_CONVEX_URL=https://your-url-here.convex.cloud
   ```

### Step 6: Add Background Images

You need to add background images for the header:

1. Download mobile and desktop backgrounds (or use any images)
2. Place them in `assets/`:
   - `assets/bg-mobile.jpg`
   - `assets/bg-desktop.jpg`

Or use solid colors by updating the `HomeScreen.tsx` component.

### Step 7: Start Development

1. **Keep Convex running** (in one terminal):

   ```bash
   npx convex dev
   ```

2. **Start Expo** (in another terminal):

   ```bash
   npm start
   ```

3. **Choose your platform**:
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code for Expo Go on physical device

### Step 8: Verify Everything Works

Test these features:

- [ ] App loads without errors
- [ ] Can create new todos
- [ ] Can toggle todo completion
- [ ] Can delete todos
- [ ] Can filter todos (All/Active/Completed)
- [ ] Can drag and drop to reorder
- [ ] Can switch between light/dark theme
- [ ] Theme persists after app restart

## Common Setup Issues

### Issue: "Cannot find module 'convex/react'"

**Solution**: Run `npm install` again and make sure Convex CLI is installed:

```bash
npm install -g convex
npx convex dev
```

### Issue: "EXPO_PUBLIC_CONVEX_URL is not defined"

**Solution**:

1. Make sure you created `.env` file
2. Make sure the URL starts with `https://`
3. Restart Expo server after changing `.env`

### Issue: Metro bundler won't start

**Solution**: Clear cache and restart:

```bash
expo start -c
```

### Issue: Android emulator not detected

**Solution**:

1. Open Android Studio
2. Start an emulator from AVD Manager
3. Wait for it to fully boot
4. Then press `a` in Expo CLI

### Issue: iOS simulator not opening

**Solution** (Mac only):

1. Open Xcode
2. Go to Xcode > Open Developer Tool > Simulator
3. Once simulator is open, press `i` in Expo CLI

### Issue: "Unable to resolve module" errors

**Solution**:

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Clear watchman (if on Mac)
watchman watch-del-all

# Start with clean cache
expo start -c
```

## Development Workflow

### Recommended: Two Terminal Windows

**Terminal 1** - Convex Backend:

```bash
npx convex dev
```

Keep this running. It watches for changes to `convex/` folder.

**Terminal 2** - Expo:

```bash
npm start
```

This serves your React Native app.

### Making Changes

1. **Backend changes** (`convex/` folder):
   - Edit `convex/todos.ts` or `convex/schema.ts`
   - Convex will automatically redeploy
   - Your app will reconnect automatically

2. **Frontend changes** (everything else):
   - Edit any `.tsx` file
   - Expo will hot reload automatically
   - Changes appear instantly

### Testing on Physical Device

1. Install Expo Go app from App/Play Store
2. Make sure phone and computer are on same WiFi
3. Scan QR code from Expo CLI
4. App will load on your phone

## Building Production APK

Once your app works perfectly:

### Android APK

```bash
# Configure EAS
eas build:configure

# Build APK for testing
eas build --platform android --profile preview

# Build AAB for Play Store
eas build --platform android --profile production
```

### iOS App

```bash
# Build for TestFlight
eas build --platform ios --profile production
```
