import { useAuth } from "@clerk/expo";
import { Stack, Redirect } from "expo-router";
import type { JSX } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout(): JSX.Element {

    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if(isSignedIn) {
        return <Redirect href="/(tab)" />
    }

    return (
        <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name="index" />
        </Stack>
    );
}