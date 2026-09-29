import { DarkTheme, Stack, ThemeProvider } from "expo-router";
import { HeroUINativeProvider } from "heroui-native";
import type { JSX } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Uniwind } from "uniwind";

import "../global.css";
import FontProvider from "@/provider/font";

Uniwind.setTheme("dark");

const heroUiConfig = {
  devInfo: { stylingPrinciples: false }
}


export default function RootLayout(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider config={heroUiConfig}>
        <ThemeProvider value={DarkTheme}>
          <FontProvider>
            <Stack screenOptions={{ headerShown: false }} >
              <Stack.Screen name="(tab)" />
              <Stack.Screen name="onboarding" />
            </Stack>
          </FontProvider>
        </ThemeProvider>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
