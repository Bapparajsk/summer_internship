import { Stack } from "expo-router";
import { HeroUINativeProvider } from "heroui-native";
import type { JSX } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Uniwind } from "uniwind";

import "../global.css";
import FontProvider from "@/provider/font";

Uniwind.setTheme("dark");

export default function RootLayout(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider config={{ devInfo: { stylingPrinciples: false } }}>
        <FontProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </FontProvider>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
