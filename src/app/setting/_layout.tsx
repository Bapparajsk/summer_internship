import { Stack } from "expo-router";

export default function SettingLayout() {
    return (
        <Stack screenOptions={{ 
            headerShown: false, 
            animation: "ios_from_right"
        }}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="edit_profile" options={{ animation: "fade_from_bottom" }} />
            <Stack.Screen name="change_password" />
        </Stack>
    );
}