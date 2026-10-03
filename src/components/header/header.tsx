import Animated, {
    Easing,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { useScrollStore } from "@/store/scroll-store";
import { NotificationButton } from "./notificationButton";

const TITLE_OFFSET = 500;
const SUBTITLE_OFFSET = 500;

const TEXT_CONTAINER_OFFSET = -70;
const BUTTON_OFFSET = -100;

const TEXT_DURATION = 500;
const CONTAINER_DURATION = 180;

const BUTTON_DURATION = 220;
const SUBTITLE_DELAY = 70;

// Blur
const BLUR_INTENSITY = 100;
const BLUR_FADE_DURATION = 180;

const easing = Easing.out(Easing.cubic);


export const AnimatedHeader = () => {

    const activeTab = useScrollStore(
        (state) => state.activeTab
    );

    const scrollY = useScrollStore(
        (state) => state.scrollY[activeTab]
    );

    const insets = useSafeAreaInsets();

    const previousY = useSharedValue(0);

    /*
     * ============================
     * TEXT
     * ============================
     */
    const titleX = useSharedValue(0);
    const subtitleX = useSharedValue(0);

    /*
     * ============================
     * TEXT CONTAINER
     * ============================
     */
    const textContainerY = useSharedValue(0);

    /*
     * ============================
     * NOTIFICATION BUTTON
     * ============================
     */
    const buttonY = useSharedValue(0);

    /*
     * ============================
     * BACKGROUND BLUR
     *
     * 1 = fully visible
     * 0 = hidden
     * ============================
     */
    const backgroundOpacity = useSharedValue(1);

    /*
     * Prevent animation from
     * restarting every frame.
     */
    const headerState = useSharedValue<"shown" | "hidden">("shown");

    useDerivedValue(() => {
        const currentY = scrollY.value;
        const diff = currentY - previousY.value;

        /*
         * ============================
         * HIDE HEADER
         * ============================
         */
        const hideHeader = () => {
            if (headerState.value === "hidden") return;

            headerState.value = "hidden";

            // Blur fades out with the header
            backgroundOpacity.value = withTiming(0, {
                duration: BLUR_FADE_DURATION,
                easing,
            });

            // Text
            titleX.value = withTiming(-TITLE_OFFSET, {
                duration: TEXT_DURATION,
                easing,
            });

            subtitleX.value = withDelay(
                SUBTITLE_DELAY,
                withTiming(-SUBTITLE_OFFSET, {
                    duration: TEXT_DURATION,
                    easing,
                })
            );

            // Container
            textContainerY.value = withDelay(
                TEXT_DURATION,
                withTiming(TEXT_CONTAINER_OFFSET, {
                    duration: CONTAINER_DURATION,
                    easing,
                })
            );

            // Notification
            buttonY.value = withTiming(BUTTON_OFFSET, {
                duration: BUTTON_DURATION,
                easing: Easing.in(Easing.cubic),
            });
        };

        /*
         * ============================
         * SHOW HEADER
         * ============================
         */
        const showHeader = () => {
            if (headerState.value === "shown") return;

            headerState.value = "shown";

            /*
             * IMPORTANT:
             *
             * Keep blur hidden while
             * the elements are entering.
             */
            backgroundOpacity.value = 0;

            /*
             * STEP 1
             *
             * Container comes back.
             */
            textContainerY.value = withTiming(0, {
                duration: CONTAINER_DURATION,
                easing,
            });

            /*
             * Notification comes back.
             */
            buttonY.value = withTiming(0, {
                duration: BUTTON_DURATION,
                easing,
            });

            /*
             * STEP 2
             *
             * Title comes back.
             */
            titleX.value = withDelay(
                CONTAINER_DURATION,
                withTiming(0, {
                    duration: TEXT_DURATION,
                    easing,
                })
            );

            /*
             * Subtitle comes back.
             */
            subtitleX.value = withDelay(
                CONTAINER_DURATION + SUBTITLE_DELAY,
                withTiming(0, {
                    duration: TEXT_DURATION,
                    easing,
                })
            );

            /*
             * STEP 3
             *
             * Everything is now visible.
             *
             * 180
             * + 500
             * + 70
             * + 500
             * = 750ms
             *
             * Then blur appears.
             */
            backgroundOpacity.value = withDelay(
                CONTAINER_DURATION +
                TEXT_DURATION +
                SUBTITLE_DELAY,
                withTiming(1, {
                    duration: BLUR_FADE_DURATION,
                    easing,
                })
            );
        };

        /*
         * ============================
         * TOP
         * ============================
         *
         * At the absolute top:
         *
         * - Header visible
         * - Blur HIDDEN
         */
        if (currentY <= 0) {
            headerState.value = "shown";

            textContainerY.value = 0;
            titleX.value = 0;
            subtitleX.value = 0;
            buttonY.value = 0;

            // IMPORTANT
            backgroundOpacity.value = 0;

            previousY.value = currentY;
            return;
        }

        /*
         * ============================
         * SCROLL UP
         * ============================
         */
        if (diff > 0) {
            hideHeader();
        }

        /*
         * ============================
         * SCROLL DOWN
         * ============================
         */
        else if (diff < 0) {
            showHeader();
        }

        previousY.value = currentY;
    });

    /*
     * ============================
     * BACKGROUND
     * ============================
     */
    const backgroundStyle = useAnimatedStyle(() => {
        return {
            opacity: backgroundOpacity.value,
        };
    });

    /*
     * ============================
     * TEXT CONTAINER
     * ============================
     */
    const textContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: textContainerY.value,
                },
            ],
        };
    });

    /*
     * ============================
     * TITLE
     * ============================
     */
    const titleStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: titleX.value,
                },
            ],
        };
    });

    /*
     * ============================
     * SUBTITLE
     * ============================
     */
    const subtitleStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: subtitleX.value,
                },
            ],
        };
    });

    /*
     * ============================
     * NOTIFICATION
     * ============================
     */
    const buttonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: buttonY.value,
                },
            ],
        };
    });

    return (
        <Animated.View
            style={{
                position: "absolute",
                top: insets.top,
                left: 0,
                right: 0,
                zIndex: 100,
            }}
            pointerEvents="box-none"
        >
            <Animated.View
                pointerEvents="none"
                style={[
                    {
                        position: "absolute",
                        top: -insets.top,
                        left: 0,
                        right: 0,
                        height: insets.top + 70,
                        overflow: "hidden",
                    },
                    backgroundStyle,
                ]}
            >
                <BlurView
                    intensity={BLUR_INTENSITY}
                    tint="dark"
                    style={StyleSheet.absoluteFill}
                />
                <Animated.View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: "#050816AA",
                        },
                    ]}
                />
            </Animated.View>

            <View className="flex-row items-center justify-between px-5">
                <Animated.View style={textContainerStyle}>
                    <Animated.View style={titleStyle}>
                        <Text className="text-text-primary text-2xl tracking-wide font-poppins-semibold">
                            Hello, Bappa Raj
                        </Text>
                    </Animated.View>

                    <Animated.View style={subtitleStyle}>
                        <Text className="text-text-secondary text-xs font-poppins-medium">
                            Good morning, Engineer!
                        </Text>
                    </Animated.View>
                </Animated.View>

                <Animated.View style={buttonStyle}>
                    <NotificationButton />
                </Animated.View>
            </View>
        </Animated.View>
    );
};