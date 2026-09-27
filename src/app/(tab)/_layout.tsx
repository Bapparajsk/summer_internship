import { AnimatedHeader } from "@/components/header";
import { BottomTabBar } from "@/components/navigation/bottomTabBar/tabBar";
import { ScrollProvider } from "@/provider/scroll";
import { Tabs } from "expo-router";
import { useSharedValue } from "react-native-reanimated";

export default function TabsLayout() {

    const scrollY = useSharedValue(0);

    return (
        <ScrollProvider scrollY={scrollY}>
            <Tabs
                tabBar={(props) => <BottomTabBar {...props} />}
                screenOptions={{
                    animation: "shift",
                    header: () => (
                        <AnimatedHeader scrollY={scrollY} />
                    ),
                }}
            >
                <Tabs.Screen name="index" options={{ title: "Overview", }} />
                <Tabs.Screen name="explore" options={{ title: "Explore", }} />
                <Tabs.Screen name="progress" options={{ title: "Progress", }} />
                <Tabs.Screen name="profile" options={{ title: "Profile", }} />
            </Tabs>
        </ScrollProvider>
    );
}