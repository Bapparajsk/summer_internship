
import { useEffect } from "react";
import { View, Text } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
    Easing,
} from "react-native-reanimated";
import { CheckCircle2, ClipboardCheck } from "lucide-react-native";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type CompletionHeroProps = {
    percentage?: number;
    title?: string;
    description?: string;
};

const SIZE = 112;
const STROKE = 6;
const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function CompletionHero({
    percentage = 100,
    title = "You're all done!",
    description = "Your answers have been submitted successfully.",
}: CompletionHeroProps) {
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withTiming(
            Math.max(0, Math.min(percentage, 100)),
            {
                duration: 900,
                easing: Easing.out(Easing.cubic),
            }
        );
    }, [percentage]);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset:
            CIRCUMFERENCE -
            (progress.value / 100) * CIRCUMFERENCE,
    }));

    return (
        <View className="relative items-center overflow-hidden  px-5 py-6">
            {/* Ambient glow */}
            <View className="absolute -top-16 h-44 w-44 rounded-full bg-primary/10" />

            {/* Status */}
            <View className="mb-4 flex-row items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5">
                <ClipboardCheck size={14} color="#5CC6E2" />

                <Text className="font-poppins-semibold text-[10px] tracking-[1px] text-primary uppercase">
                    Quiz Completed
                </Text>
            </View>

            {/* Progress ring */}
            <View
                className="items-center justify-center"
                style={{ width: SIZE, height: SIZE }}
            >
                <Svg
                    width={SIZE}
                    height={SIZE}
                    viewBox="0 0 100 100"
                    style={{ transform: [{ rotate: "-90deg" }] }}
                >
                    <Defs>
                        <LinearGradient
                            id="completionGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <Stop offset="0%" stopColor="#5CC6E2" />
                            <Stop offset="100%" stopColor="#35D6A0" />
                        </LinearGradient>
                    </Defs>

                    <Circle
                        cx="50"
                        cy="50"
                        r={RADIUS}
                        stroke="#31353C"
                        strokeWidth={STROKE}
                        fill="none"
                    />

                    <AnimatedCircle
                        cx="50"
                        cy="50"
                        r={RADIUS}
                        stroke="url(#completionGradient)"
                        strokeWidth={STROKE}
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
                        animatedProps={animatedProps}
                    />
                </Svg>

                {/* Center icon */}
                <View className="absolute h-14 w-14 items-center justify-center rounded-full border border-border bg-surface-container-high">
                    <CheckCircle2
                        size={30}
                        color="#35D6A0"
                        strokeWidth={2.2}
                    />
                </View>
            </View>

            {/* Heading */}
            <View className="mt-5 items-center">
                <Text className="font-poppins-semibold text-[23px] tracking-[-0.5px] text-text-primary">
                    {title}
                </Text>

                <Text className="max-w-70 text-center font-poppins-medium text-[12px] leading-4.75 text-text-secondary">
                    {description}
                </Text>
            </View>
        </View>
    );
}
