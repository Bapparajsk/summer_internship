import { AnimatedHeader } from "@/components/header";
import { BottomTabBar } from "@/components/navigation/bottomTabBar";
import { setActiveTab , TabName} from "@/store/scroll-store";
import { Tabs } from "expo-router";

const activeTabsNames: TabName[] = ["index", "explore", "progress", "profile"];

export default function TabsLayout() {

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

                    const routeName = routes[index]?.name as TabName;

                    if (activeTabsNames.includes(routeName)) {
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