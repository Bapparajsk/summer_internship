import { Stack } from "expo-router";

export default function QuizLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="waiting_room"/>
            <Stack.Screen name="completion_waiting_room"/>
            <Stack.Screen name="game" />
        </Stack>
    );
}