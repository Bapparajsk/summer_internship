import Animated, {
    Easing,
    SharedValue,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { PressableFeedback } from "heroui-native";
import { Fontisto } from "../lib/icon";

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

type Props = {
    scrollY: SharedValue<number>;
};

export const AnimatedHeader = ({ scrollY }: Props) => {
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

            /*
             * Blur disappears immediately
             * when header starts hiding.
             */
            backgroundOpacity.value = withTiming(0, {
                duration: BLUR_FADE_DURATION,
                easing,
            });

            /*
             * STEP 1
             *
             * Animate text away.
             */
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

            /*
             * STEP 2
             *
             * Move entire text container
             * after text disappears.
             */
            textContainerY.value = withDelay(
                TEXT_DURATION,
                withTiming(TEXT_CONTAINER_OFFSET, {
                    duration: CONTAINER_DURATION,
                    easing,
                })
            );

            /*
             * Notification moves independently.
             */
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
             * Make sure blur stays hidden
             * while elements are entering.
             */
            backgroundOpacity.value = 0;

            /*
             * STEP 1
             *
             * Bring entire container back.
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
             * Text comes back after
             * container has returned.
             */
            titleX.value = withDelay(
                CONTAINER_DURATION,
                withTiming(0, {
                    duration: TEXT_DURATION,
                    easing,
                })
            );

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
             * Show blur ONLY after
             * all elements are completely visible.
             *
             * Timeline:
             *
             * 180ms container
             * 500ms title
             * 70ms subtitle delay
             * 500ms subtitle
             *
             * = 750ms total
             */
            backgroundOpacity.value = withDelay(
                CONTAINER_DURATION +
                SUBTITLE_DELAY +
                TEXT_DURATION,
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
         */
        if (currentY <= 0) {
            headerState.value = "shown";

            textContainerY.value = 0;
            titleX.value = 0;
            subtitleX.value = 0;
            buttonY.value = 0;

            /*
             * At the top everything is
             * completely visible.
             */
            backgroundOpacity.value = 1;

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
                        backgroundColor: "#05081699",
                    },
                    backgroundStyle,
                ]}
            >
                <BlurView
                    intensity={BLUR_INTENSITY}
                    tint="systemMaterialDark"
                    style={StyleSheet.absoluteFill}
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
                        <Text className="text-text-secondary text-xs font-poppins-light">
                            Good morning, Engineer!
                        </Text>
                    </Animated.View>
                </Animated.View>

                <Animated.View style={buttonStyle}>
                    <PressableFeedback
                        className="h-15 w-15 items-center justify-center rounded-full bg-white/10 border-border border"
                        accessibilityRole="button"
                        accessibilityLabel="Notifications"
                    >
                        <Fontisto
                            name="bell"
                            size={21}
                            color="white"
                        />

                        <View className="absolute right-5.25 top-4.75 h-2 w-2 rounded-full bg-primary" />
                    </PressableFeedback>
                </Animated.View>
            </View>
        </Animated.View>
    );
};