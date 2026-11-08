import { Stack } from "expo-router";

export default function SettingLayout() {
    return (
        <Stack screenOptions={{ 
            headerShown: false, 
            animation: "ios_from_right"
        }}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="editProfile" options={{ animation: "fade_from_bottom" }} />
            <Stack.Screen name="changePassword" />
        </Stack>
    );
}