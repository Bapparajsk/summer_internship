import { DarkTheme, Stack, ThemeProvider } from "expo-router";
import { HeroUINativeProvider, HeroUINativeConfig } from "heroui-native";
import type { JSX } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Uniwind } from "uniwind";
import { ClerkProvider } from '@clerk/expo'
import { tokenCache } from '@clerk/expo/token-cache'
import { KeyboardProvider } from 'react-native-keyboard-controller';


import "../global.css";
import FontProvider from "@/provider/font";
import { StatusBar } from "react-native";

Uniwind.setTheme("dark");

const heroUiConfig: HeroUINativeConfig = {
  devInfo: { stylingPrinciples: false },
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

export default function RootLayout(): JSX.Element {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
          <StatusBar backgroundColor={"#000000"} networkActivityIndicatorVisible animated barStyle={"light-content"}/>
          <HeroUINativeProvider config={heroUiConfig}>
            <ThemeProvider value={DarkTheme}>
              <FontProvider>
                <Stack screenOptions={{ headerShown: false }} >
                  <Stack.Screen name="(auth)" />
                  <Stack.Screen name="(tab)" />
                  <Stack.Screen name="onboarding" />
                </Stack>
              </FontProvider>
            </ThemeProvider>
          </HeroUINativeProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}
