import { SplashScreen, Stack } from 'expo-router';
import * as Font from "expo-font";
import { useEffect, useState } from 'react';
import { AuthProvider } from './authContext'; // Make sure this path is correct

const useFonts = async () => {
  await Font.loadAsync({
    "LeagueSpartan-ExtraLight": require("../assets/fonts/LeagueSpartan-ExtraLight.ttf"),
    "LeagueSpartan-SemiBold": require("../assets/fonts/LeagueSpartan-SemiBold.ttf"),
    "LeagueSpartan-Light": require("../assets/fonts/LeagueSpartan-Light.ttf"),
    "LeagueSpartan-Bold": require("../assets/fonts/LeagueSpartan-Bold.ttf"),
    "LeagueSpartan-Regular": require("../assets/fonts/LeagueSpartan-Regular.ttf")
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  useEffect(() => {
    const loadFontsAsync = async () => {
      await useFonts();
      setFontsLoaded(true);
    };

    loadFontsAsync();
  }, []);
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}