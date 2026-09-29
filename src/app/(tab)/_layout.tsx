import { AnimatedHeader } from "@/components/header";
import { BottomTabBar } from "@/components/navigation/bottomTabBar/tabBar";
import { useScrollStore } from "@/store/scroll-store";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    const setActiveTab = useScrollStore(
        (state) => state.setActiveTab
    );

    return (
        <Tabs
            tabBar={(props) => <BottomTabBar {...props} />}
            screenOptions={{
                animation: "shift",

                header: () => (
                    <AnimatedHeader />
                ),
            }}
            screenListeners={{
                state: (event) => {
                    const routes = event.data.state.routes;
                    const index = event.data.state.index;

                    const routeName = routes[index]?.name;

                    if (
                        routeName === "index" ||
                        routeName === "explore" ||
                        routeName === "progress" ||
                        routeName === "profile"
                    ) {
                        setActiveTab(routeName);
                    }
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Overview",
                }}
            />

            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                }}
            />

            <Tabs.Screen
                name="progress"
                options={{
                    title: "Progress",
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                }}
            />
        </Tabs>
    );
}