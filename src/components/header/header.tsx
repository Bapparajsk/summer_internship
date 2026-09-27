import Animated, {
    SharedValue,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { Text, View } from "react-native";

const HEADER_HEIGHT = 64;

type Props = {
    scrollY: SharedValue<number>;
};

export const AnimatedHeader = ({ scrollY }: Props) => {
    const previousY = useSharedValue(0);
    const headerY = useSharedValue(0);

    useDerivedValue(() => {
        const currentY = scrollY.value;
        const diff = currentY - previousY.value;

        // At the top
        if (currentY <= 0) {
            headerY.value = withTiming(0, {
                duration: 200,
            });

            previousY.value = currentY;
            return;
        }

        // Scroll UP → hide header
        if (diff > 0) {
            headerY.value = withTiming(-HEADER_HEIGHT, {
                duration: 200,
            });
        }

        // Scroll DOWN → show header
        else if (diff < 0) {
            headerY.value = withTiming(0, {
                duration: 200,
            });
        }

        previousY.value = currentY;
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: headerY.value,
                },
            ],
        };
    });

    return (
        <Animated.View
            style={[
                {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: HEADER_HEIGHT,
                    zIndex: 100,
                    elevation: 10,
                },
                animatedStyle,
            ]}
        >
            <View className="flex-1 flex-row items-center px-5">
                <Text className="text-xl font-bold text-white">
                    Aether Campus
                </Text>
            </View>
        </Animated.View>
    );
};