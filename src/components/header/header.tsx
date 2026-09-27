import Animated, {
    Easing,
    SharedValue,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PressableFeedback } from "heroui-native";
import Fontisto from "@expo/vector-icons/Fontisto";

const HEADER_HEIGHT = 64;

const TITLE_OFFSET = 500;
const SUBTITLE_OFFSET = 500;

const TEXT_CONTAINER_OFFSET = -70;
const BUTTON_OFFSET = -100;

const TEXT_DURATION = 500;
const CONTAINER_DURATION = 180;

const SUBTITLE_DELAY = 70;

const easing = Easing.out(Easing.cubic);

type Props = {
    scrollY: SharedValue<number>;
};

export const AnimatedHeader = ({ scrollY }: Props) => {
    const insets = useSafeAreaInsets();

    const previousY = useSharedValue(0);

    /*
     * Text animation
     */
    const titleX = useSharedValue(0);
    const subtitleX = useSharedValue(0);

    /*
     * Entire text container
     */
    const textContainerY = useSharedValue(0);

    /*
     * Notification button
     */
    const buttonY = useSharedValue(0);

    /*
     * Prevent animation from restarting every frame.
     */
    const headerState = useSharedValue<"shown" | "hidden">("shown");

    useDerivedValue(() => {
        const currentY = scrollY.value;
        const diff = currentY - previousY.value;

        /*
         * ============================
         * HIDE
         * ============================
         */
        const hideHeader = () => {
            if (headerState.value === "hidden") return;

            headerState.value = "hidden";

            /*
             * STEP 1
             *
             * Animate the text away first.
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
             * After the text has disappeared,
             * move the entire text container upward.
             *
             * This removes its layout/hit area from
             * the header region.
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
                duration: 220,
                easing: Easing.in(Easing.cubic),
            });
        };

        /*
         * ============================
         * SHOW
         * ============================
         */
        const showHeader = () => {
            if (headerState.value === "shown") return;

            headerState.value = "shown";

            /*
             * STEP 1
             *
             * Bring the entire text container back FIRST.
             */
            textContainerY.value = withTiming(0, {
                duration: CONTAINER_DURATION,
                easing,
            });

            /*
             * Notification comes back immediately.
             */
            buttonY.value = withTiming(0, {
                duration: 220,
                easing,
            });

            /*
             * STEP 2
             *
             * Then animate the text back.
             *
             * Small delay gives the container time
             * to return before text appears.
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

            previousY.value = currentY;
            return;
        }

        /*
         * Scroll UP
         */
        if (diff > 0) {
            hideHeader();
        }

        /*
         * Scroll DOWN
         */
        else if (diff < 0) {
            showHeader();
        }

        previousY.value = currentY;
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
            <View className="flex-1 h-full flex-row items-center justify-between px-5">

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

                        <View className="absolute right-5.5 top-[20px] h-2 w-2 rounded-full bg-primary" />
                    </PressableFeedback>
                </Animated.View>

            </View>
        </Animated.View>
    );
};