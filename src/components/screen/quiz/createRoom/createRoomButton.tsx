
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
    cancelAnimation,
    Easing,
    FadeInUp,
    FadeOutUp,
    interpolateColor,
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { ArrowRight, Rocket } from 'lucide-react-native';
import { PressableFeedback } from 'heroui-native';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const RING_LENGTH = 138.23;
const CHECK_LENGTH = 21.22;

type Props = {
    onPress: () => void;
    loading: boolean;
    success: boolean;
    disabled?: boolean;
};

export function CreateRoomButton({
    onPress,
    loading,
    success,
    disabled = false,
}: Props) {

    const rocketY = useSharedValue(0);
    const rocketRotation = useSharedValue(0);
    const rocketOpacity = useSharedValue(1);

    const flameScale = useSharedValue(1);
    const trailOpacity = useSharedValue(0);
    const trailScale = useSharedValue(0);

    const ringProgress = useSharedValue(0);
    const checkProgress = useSharedValue(0);
    const checkScale = useSharedValue(0);

    const successProgress = useSharedValue(0);

    const isDisabled = disabled || loading || success;

    useEffect(() => {
        cancelAnimation(rocketY);
        cancelAnimation(rocketRotation);
        cancelAnimation(rocketOpacity);
        cancelAnimation(flameScale);
        cancelAnimation(trailOpacity);
        cancelAnimation(trailScale);
        cancelAnimation(ringProgress);
        cancelAnimation(checkProgress);
        cancelAnimation(checkScale);
        cancelAnimation(successProgress);

        if (success) {
            // Launch the rocket.
            rocketRotation.value = withTiming(-12, {
                duration: 180,
                easing: Easing.out(Easing.quad),
            });

            rocketY.value = withDelay(
                100,
                withTiming(-76, {
                    duration: 420,
                    easing: Easing.in(Easing.cubic),
                }),
            );

            rocketOpacity.value = withDelay(
                280,
                withTiming(0, { duration: 220 }),
            );

            // Rocket exhaust trail.
            trailOpacity.value = withSequence(
                withTiming(0.8, { duration: 100 }),
                withDelay(180, withTiming(0, { duration: 220 })),
            );

            trailScale.value = withTiming(1, { duration: 300 });

            // Transition button background.
            successProgress.value = withTiming(1, {
                duration: 450,
                easing: Easing.out(Easing.cubic),
            });

            // Draw circular success ring.
            ringProgress.value = withDelay(
                300,
                withTiming(1, {
                    duration: 420,
                    easing: Easing.out(Easing.cubic),
                }),
            );

            // Draw the checkmark after the ring.
            checkProgress.value = withDelay(
                680,
                withTiming(1, {
                    duration: 280,
                    easing: Easing.out(Easing.cubic),
                }),
            );

            checkScale.value = withDelay(
                680,
                withSequence(
                    withSpring(1.16, { damping: 7, stiffness: 220 }),
                    withSpring(1, { damping: 12, stiffness: 180 }),
                ),
            );
        } else if (loading) {
            // Rocket hovering while the room is being created.
            rocketY.value = withRepeat(
                withSequence(
                    withTiming(-7, {
                        duration: 240,
                        easing: Easing.out(Easing.quad),
                    }),
                    withTiming(4, {
                        duration: 280,
                        easing: Easing.inOut(Easing.quad),
                    }),
                ),
                -1,
                true,
            );

            rocketRotation.value = withRepeat(
                withSequence(
                    withTiming(-5, { duration: 300 }),
                    withTiming(5, { duration: 300 }),
                ),
                -1,
                true,
            );

            flameScale.value = withRepeat(
                withSequence(
                    withTiming(1.35, { duration: 150 }),
                    withTiming(0.8, { duration: 150 }),
                ),
                -1,
                true,
            );
        } else {
            // Reset for the next creation attempt.
            rocketY.value = 0;
            rocketRotation.value = 0;
            rocketOpacity.value = 1;
            flameScale.value = 1;
            trailOpacity.value = 0;
            trailScale.value = 0;
            ringProgress.value = 0;
            checkProgress.value = 0;
            checkScale.value = 0;
            successProgress.value = 0;
        }
    }, [loading, success]);

    const rocketStyle = useAnimatedStyle(() => ({
        opacity: rocketOpacity.value,
        transform: [
            { translateY: rocketY.value },
            { rotate: `${rocketRotation.value}deg` },
        ],
    }));

    const flameStyle = useAnimatedStyle(() => ({
        transform: [{ scale: flameScale.value }],
    }));

    const trailStyle = useAnimatedStyle(() => ({
        opacity: trailOpacity.value,
        transform: [{ scaleY: trailScale.value }],
    }));

    const animatedRingProps = useAnimatedProps(() => ({
        strokeDashoffset: RING_LENGTH * (1 - ringProgress.value),
    }));

    const animatedCheckProps = useAnimatedProps(() => ({
        strokeDashoffset: CHECK_LENGTH * (1 - checkProgress.value),
    }));

    const buttonStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            successProgress.value,
            [0, 1],
            ['#5CC6E2', '#4ADE80'],
        ),
    }));

    return (
        <PressableFeedback
            isDisabled={isDisabled}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityState={{
                disabled: isDisabled,
                busy: loading,
            }}
            className="w-full flex-row items-center justify-center h-13 overflow-hidden rounded-3xl"
            style={[buttonStyle]}
        >
            {/* Rocket and success animation stage */}
            <View className="relative h-10 w-10 items-center justify-center">
                {/* Rocket trail */}
                <Animated.View
                    pointerEvents="none"
                    style={[
                        trailStyle,
                        {
                            position: 'absolute',
                            top: 20,
                            width: 3,
                            height: 28,
                            borderRadius: 10,
                            backgroundColor: '#0D1117',
                        },
                    ]}
                />

                {/* Rocket */}
                <Animated.View
                    pointerEvents="none"
                    style={[
                        rocketStyle,
                        {
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    ]}
                >
                    <Rocket
                        size={23}
                        color="#0D1117"
                        strokeWidth={2.4}
                    />

                    {/* Rocket flame */}
                    {loading && (
                        <Animated.View
                            style={[
                                flameStyle,
                                {
                                    position: 'absolute',
                                    bottom: -7,
                                    width: 5,
                                    height: 8,
                                    borderRadius: 5,
                                    backgroundColor: '#F97316',
                                },
                            ]}
                        />
                    )}
                </Animated.View>

                {/* SVG success ring */}
                <View
                    pointerEvents="none"
                    style={[
                        {
                            position: 'absolute',
                            width: 35,
                            height: 35,
                        },
                    ]}
                >
                    <Svg width={35} height={35} viewBox="0 0 48 48">
                        <G transform="rotate(-90 24 24)">
                            <AnimatedCircle
                                cx="24"
                                cy="24"
                                r="22"
                                fill="none"
                                stroke="#0D1117"
                                strokeWidth="2.8"
                                strokeLinecap="round"
                                strokeDasharray={RING_LENGTH}
                                animatedProps={animatedRingProps}
                            />
                        </G>
                    </Svg>
                </View>

                {/* SVG checkmark */}
                <View
                    pointerEvents="none"
                    style={[
                        {
                            position: 'absolute',
                            width: 22,
                            height: 22,
                        },
                    ]}
                >
                    <Svg width={22} height={22} viewBox="0 0 24 24">
                        <AnimatedPath
                            d="M5 12.5 L10 17.5 L20 7.5"
                            fill="none"
                            stroke="#0D1117"
                            strokeWidth="2.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray={CHECK_LENGTH}
                            animatedProps={animatedCheckProps}
                        />
                    </Svg>
                </View>
            </View>

            {/* Text transitions */}
            <View className="min-w-36.25 items-center">
                <Animated.Text
                    key={success ? 'success' : loading ? 'loading' : 'idle'}
                    entering={FadeInUp.duration(220).springify()}
                    exiting={FadeOutUp.duration(120)}
                    className="font-poppins-semibold text-[15px] text-background"
                >
                    {success
                        ? 'Room created!'
                        : loading
                            ? 'Launching room...'
                            : 'Create room'}
                </Animated.Text>
            </View>

            {/* Idle arrow */}
            {!loading && !success && (
                <Animated.View
                    entering={FadeInUp.duration(180)}
                    exiting={FadeOutUp.duration(100)}
                    className="ml-2"
                >
                    <ArrowRight
                        size={18}
                        color="#0D1117"
                        strokeWidth={2.4}
                    />
                </Animated.View>
            )}
        </PressableFeedback>
    );
}
