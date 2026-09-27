import { BottomTabBar } from "@/components/navigation/bottomTabBar/tabBar";
import { Tabs } from "expo-router";

export default function TabsLayout() {

    return (
        <Tabs
            tabBar={(props) => <BottomTabBar {...props} />}
            screenOptions={{ headerShown: false, animation: "shift" }}
        >
            <Tabs.Screen name="index" options={{ title: "Overview", }} />
            <Tabs.Screen name="explore" options={{ title: "Explore", }} />
            <Tabs.Screen name="progress" options={{ title: "Progress", }} />
            <Tabs.Screen name="profile" options={{ title: "Profile", }} />
        </Tabs>
    );
} 