import { useEffect, useMemo } from "react";
import { View } from "react-native";
import Animated, {
    cancelAnimation,
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming
} from "react-native-reanimated";
import Svg, {
    Defs,
    LinearGradient,
    Stop,
    Path,
} from "react-native-svg";

const blips = [
    { id: "a", x: 66, y: 67 },
    { id: "b", x: 170, y: 83 },
    { id: "c", x: 151, y: 165 },
    { id: "d", x: 78, y: 177 },
    { id: "e", x: 120, y: 48 },
];

export function RadarTexture() {
    const RADAR_SIZE = 240;
    const CENTER = RADAR_SIZE / 2;

    const ticks = useMemo(
        () =>
            Array.from({ length: 48 }, (_, index) => {
                const angle = (index / 48) * Math.PI * 2;
                const radius = 113;
                const major = index % 4 === 0;
                const width = major ? 2 : 1;
                const height = major ? 7 : 4;

                return {
                    id: index,
                    left: CENTER + Math.sin(angle) * radius - width / 2,
                    top: CENTER - Math.cos(angle) * radius - height / 2,
                    rotation: `${(index / 48) * 360}deg`,
                    major,
                };
            }),
        [],
    );



    return (
        <View
            pointerEvents="none"
            className="absolute h-60 w-60 items-center justify-center rounded-full border border-primary/15"
        >
            {/* Concentric radar rings */}
            <View className="absolute size-50 rounded-full border border-primary/10" />
            <View className="absolute size-37.5 rounded-full border border-primary/10" />
            <View className="absolute size-25 rounded-full border border-primary/10" />
            <View className="absolute size-12.5 rounded-full border border-primary/10" />

            {/* Crosshair */}
            <View className="absolute left-0 top-29.75 h-px w-full bg-primary/10" />
            <View className="absolute left-29.75 top-0 h-full w-px bg-primary/10" />

            {/* Radar ticks */}
            {ticks.map((tick) => (
                <View
                    key={tick.id}
                    style={{
                        position: "absolute",
                        left: tick.left,
                        top: tick.top,
                        width: tick.major ? 2 : 1,
                        height: tick.major ? 7 : 4,
                        transform: [{ rotate: tick.rotation }],
                        backgroundColor: tick.major
                            ? "rgba(92,198,226,0.5)"
                            : "rgba(92,198,226,0.2)",
                        borderRadius: 2,
                    }}
                />
            ))}

            {/* Rotating sweep and trailing sector */}
            <RadarSweep />

            {/* Center scanning origin */}
            <View className="absolute h-2 w-2 rounded-full border border-primary/70 bg-primary/20" />
            <View className="absolute h-1 w-1 rounded-full bg-primary" />

            {/* Target blips */}
            {blips.map((blip) => (
                <RadarBlip
                    key={blip.id}
                    x={blip.x}
                    y={blip.y}
                />
            ))}

            {/* Corner target markers */}
            {[
                { left: 43, top: 43, border: "border-l border-t" },
                { right: 43, top: 43, border: "border-r border-t" },
                { left: 43, bottom: 43, border: "border-l border-b" },
                { right: 43, bottom: 43, border: "border-r border-b" },
            ].map((marker, index) => (
                <View
                    key={index}
                    className={`absolute h-2 w-2 ${marker.border} border-primary/40`}
                    style={{
                        left: marker.left,
                        right: marker.right,
                        top: marker.top,
                        bottom: marker.bottom,
                    }}
                />
            ))}
        </View>
    );
}

const SIZE = 220;
const CENTER = SIZE / 2;

export function RadarSweep() {
    const rotation = useSharedValue(0);

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, {
                duration: 15000,
                easing: Easing.linear,
            }),
            -1,
            false,
        );

        return () => cancelAnimation(rotation);
    }, [rotation]);

    const sweepStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    return (
        <Animated.View
            pointerEvents="none"
            style={sweepStyle}
            className="absolute h-55 w-55"
        >
            <Svg
                width={SIZE}
                height={SIZE}
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                style={{ position: "absolute" }}
            >
                <Defs>
                    <LinearGradient
                        id="sweepTrail"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                    >
                        <Stop
                            offset="0%"
                            stopColor="#5CC6E2"
                            stopOpacity="0.02"
                        />
                        <Stop
                            offset="65%"
                            stopColor="#5CC6E2"
                            stopOpacity="0.10"
                        />
                        <Stop
                            offset="100%"
                            stopColor="#5CC6E2"
                            stopOpacity="0.20"
                        />
                    </LinearGradient>
                </Defs>

                {/* Fan-shaped trailing sector */}
                <Path
                    d={`
                        M ${CENTER} ${CENTER}
                        L ${CENTER - 110} ${CENTER}
                        A 110 110 0 0 1 ${CENTER} ${CENTER - 110}
                        Z
                    `}
                    fill="url(#sweepTrail)"
                />

                {/* Leading beam */}
                <Path
                    d={`M ${CENTER} ${CENTER} L ${CENTER} ${CENTER - 110}`}
                    stroke="#5CC6E2"
                    strokeOpacity={0.9}
                    strokeWidth={1.5}
                />

                {/* Glowing beam tip */}
                <Path
                    d={`M ${CENTER} ${(CENTER - 110) + 2.5} m -2.5 0 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0`}
                    fill="#7BE2FF"

                />
            </Svg>
        </Animated.View>
    );
}


function randomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function RadarBlip({ x, y }: {
    x: number;
    y: number;
}) {
    const pulse = useSharedValue(0);

    useEffect(() => {
        const duration = randomBetween(1000, 4000);
        const delay = randomBetween(0, 1800);

        pulse.value = withDelay(
            delay,
            withRepeat(
                withTiming(1, {
                    duration,
                    easing: Easing.inOut(Easing.ease),
                }),
                -1,
                true,
            ),
        );

        return () => cancelAnimation(pulse);
    }, [pulse]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: 0.25 + pulse.value * 0.75,
        transform: [{ scale: 0.7 + pulse.value * 0.6 }],
    }));

    return (
        <Animated.View
            style={[
                {
                    position: "absolute",
                    left: x,
                    top: y,
                },
                animatedStyle,
            ]}
        >
            <View className="h-1.5 w-1.5 rounded-full bg-primary" />
        </Animated.View>
    );
}