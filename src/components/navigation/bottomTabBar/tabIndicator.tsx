import Animated, { useAnimatedStyle } from "react-native-reanimated";

export const AnimatedView = ({
    indicatorX,
    scale,
}: any) => {

    const animatedStyle = useAnimatedStyle(() => ({
        left: indicatorX.value,
        transform: [{ scale: scale.value }],
    }));

    return (
        <Animated.View
            style={[
                {
                    position: "absolute",

                    width: 80,
                    height: 56,

                    borderRadius: 999,
                    backgroundColor: "#3B82F680",
                },
                animatedStyle,
            ]}
        />
    );
};