import { Stack } from "expo-router";

export default function QuizLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="waiting-room"/>
            <Stack.Screen name="game" />
        </Stack>
    );
}