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

                    width: 64,
                    height: 48,

                    borderRadius: 999,
                    backgroundColor: "#7BE2FF80",
                },
                animatedStyle,
            ]}
        />
    );
};