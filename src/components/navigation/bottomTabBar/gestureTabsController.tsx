import * as Haptics from "expo-haptics";
import { BottomTabBarProps } from "expo-router/build/react-navigation/bottom-tabs";
import { useEffect, useMemo } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import Tab from "./tab";
import { AnimatedView } from "./tabIndicator";

const TAB_WIDTH = 80;
const INDICATOR_OFFSET = 3;

export type GestureTabsControllerProps =
    Pick<
        BottomTabBarProps,
        "state" |
        "descriptors" |
        "navigation"
    >;

export const GestureTabsController = ({
    state,
    descriptors,
    navigation,
}: GestureTabsControllerProps) => {

    const routes = useMemo(() => state.routes, [state.routes]);

    const indicatorX = useSharedValue(state.index * TAB_WIDTH + INDICATOR_OFFSET);
    const startX = useSharedValue(0);
    const scale = useSharedValue(1);
    const hoveredIndex = useSharedValue(state.index);

    const gesture = Gesture.Pan()
        .activateAfterLongPress(200)
        .minDistance(10)
        .onStart(() => {

            startX.value = indicatorX.value;
            scale.value = withSpring(1.3, { damping: 18, stiffness: 220, mass: 0.5 });

            scheduleOnRN(Haptics.selectionAsync);
        })

        .onUpdate(event => {

            const maxX = (routes.length - 1) * TAB_WIDTH + INDICATOR_OFFSET;

            const nextX = Math.max(
                INDICATOR_OFFSET,
                Math.min(
                    startX.value +
                    event.translationX,
                    maxX
                )
            );

            indicatorX.value = nextX;

            const nextIndex =
                Math.max(
                    0,
                    Math.min(
                        routes.length - 1,
                        Math.round((nextX - INDICATOR_OFFSET) / TAB_WIDTH)
                    )
                );

            if (nextIndex !== hoveredIndex.value) {
                hoveredIndex.value = nextIndex;
            }
        })

        .onEnd(() => {

            const newIndex = hoveredIndex.value;

            indicatorX.value = withSpring(
                newIndex *
                TAB_WIDTH +
                INDICATOR_OFFSET,
                { damping: 18, stiffness: 220, mass: 0.5 }
            );

            if (newIndex !== state.index) {

                scheduleOnRN(
                    navigation.navigate,
                    {
                        name: routes[newIndex].name,
                        params: undefined,
                    }
                );
            }

            scale.value = withSpring(1);
        });

    useEffect(() => {

        indicatorX.value = withSpring(
            state.index *
            TAB_WIDTH +
            INDICATOR_OFFSET,
            { damping: 18, stiffness: 220, mass: 0.3 }
        );

        hoveredIndex.value = state.index;

    }, [state.index, indicatorX, hoveredIndex]);

    return (
        <GestureDetector
            gesture={gesture}
        >
            <View
                style={{
                    position: "relative",

                    borderRadius: 999999,
                    backgroundColor: "rgba(17,24,39,0.85)",

                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.08)",

                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",

                    paddingVertical: 3,
                    paddingHorizontal: 3,
                }}
            >
                <AnimatedView
                    indicatorX={indicatorX}
                    scale={scale}
                />

                {routes.map((route, index) => (
                    <Tab
                        key={route.key}
                        route={route}
                        index={index}
                        descriptors={descriptors}
                        navigation={navigation}
                        state={state}
                    />
                ))}
            </View>
        </GestureDetector>
    );
};