import Animated, { SharedValue, useAnimatedScrollHandler } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import AppFooter from "../footer/appFooter";

const AnimatedScrollView = Animated.createAnimatedComponent(Animated.ScrollView);

interface ScreenContentProps {
    path: string;
    children?: React.ReactNode;
    bottomBarHeight?: number;
    stickyHeaderIndices?: number[];
    stickyHeaderHiddenOnScroll?: boolean;
    showFooter?: boolean;
    SCREEN_HORIZONTAL_PADDING?: number;
    scrollY: SharedValue<number>;
}

export const ScreenWrapper: React.FC<ScreenContentProps> = ({
    path,
    children,
    bottomBarHeight = 80,
    stickyHeaderIndices,
    stickyHeaderHiddenOnScroll,
    showFooter = true,
    SCREEN_HORIZONTAL_PADDING = 16,
    scrollY,
}) => {

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.set(event.contentOffset.y);
        },
    });

    return (
        <SafeAreaView
            style={{
                flex: 1,
                overflow: "visible",
                backgroundColor: "#050816",
            }}
            key={path}
        >
            <LinearGradient
                colors={["transparent", '#000',]}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 100,
                    zIndex: 9999,
                }}
            />
            <AnimatedScrollView
                onScroll={onScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 70,
                    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
                    paddingBottom: 40 + bottomBarHeight,
                    position: "relative",
                    gap: 20,
                }}
                stickyHeaderIndices={stickyHeaderIndices}
                stickyHeaderHiddenOnScroll={stickyHeaderHiddenOnScroll}
            >
                {children}
                {showFooter && <AppFooter />}
            </AnimatedScrollView>
        </SafeAreaView>
    );
};