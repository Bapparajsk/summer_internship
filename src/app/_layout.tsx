
import { useEffect, useState } from "react";
import { DarkTheme, Stack, ThemeProvider } from "expo-router";
import {
  HeroUINativeProvider,
  HeroUINativeConfig,
  ToastProvider,
} from "heroui-native";
import type { JSX } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Uniwind } from "uniwind";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { StatusBar } from "react-native";

import "../global.css";
import FontProvider from "@/provider/font";
import { useOnboardingStore } from "@/store/onboarding.store";

Uniwind.setTheme("dark");

const heroUiConfig: HeroUINativeConfig = {
  devInfo: { stylingPrinciples: false },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

export default function RootLayout(): JSX.Element | null {


  const [hydrated, setHydrated] = useState(
    useOnboardingStore.persist.hasHydrated()
  );

  useEffect(() => {
    const unsubscribe =
      useOnboardingStore.persist.onFinishHydration(() => {
        setHydrated(true);
      });

    return unsubscribe;
  }, []);

  if (!hydrated) return null;

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      tokenCache={tokenCache}
    >
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: "#000" }}
      >
        <KeyboardProvider>
          <StatusBar
            backgroundColor="#000000"
            networkActivityIndicatorVisible
            animated
            barStyle="light-content"
          />

          <HeroUINativeProvider config={heroUiConfig}>
            <ToastProvider maxVisibleToasts={4}>
              <ThemeProvider value={DarkTheme}>
                <FontProvider>
                  <Stack
                    screenOptions={{
                      headerShown: false,
                      animation: "fade_from_bottom",
                    }}
                  >
                    <Stack.Screen name="index" />
                    <Stack.Screen name="(auth)" />
                    <Stack.Screen name="(tab)" />
                    <Stack.Screen name="setting" />
                    <Stack.Screen name="quiz" />
                  </Stack>
                </FontProvider>
              </ThemeProvider>
            </ToastProvider>
          </HeroUINativeProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}
