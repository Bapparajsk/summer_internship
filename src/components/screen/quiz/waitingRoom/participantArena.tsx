import { useEffect, useMemo, useState } from "react";
import {
    Image,
    Pressable,
    Text,
    View,
    useWindowDimensions,
} from "react-native";
import Animated, {
    cancelAnimation,
    Easing,
    FadeInDown,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { Users } from "lucide-react-native";
import { RadarSweep } from "./radarSweep";
import { RadarTexture } from "@/components/ui/radarTexture";


const AnimatedView = Animated.View;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const COLORS = {
    primary: "#5CC6E2",
    success: "#4ADE80",
    warning: "#FBBF24",
    danger: "#F87171",
    secondary: "#8FA5B8",
};

export type ParticipantStatus = "ready" | "waiting" | "offline";

export interface Participant {
    id: string;
    name: string;
    avatar?: string | null;
    isYou?: boolean;
    isHost?: boolean;
    status?: ParticipantStatus;
}

interface ParticipantArenaProps {
    participants: Participant[];
    totalPlayers?: number;
    readyCount?: number;
    currentUserId?: string;
    isLoading?: boolean;
    maxVisible?: number;
    onParticipantPress?: (participant: Participant) => void;
}

const ARENA_HEIGHT = 310;
const MAX_VISIBLE = 5;

export function ParticipantArena({
    participants,
    totalPlayers,
    readyCount,
    currentUserId,
    isLoading = false,
    maxVisible = MAX_VISIBLE,
    onParticipantPress,
}: ParticipantArenaProps) {
    const { width } = useWindowDimensions();

    // Radar animation values
    const outerPulse = useSharedValue(0.96);

    useEffect(() => {
        outerPulse.value = withRepeat(
            withTiming(1.045, {
                duration: 2400,
                easing: Easing.inOut(Easing.ease),
            }),
            -1,
            true,
        );


        return () => {
            cancelAnimation(outerPulse);
        };
    }, [outerPulse]);

    const outerRingStyle = useAnimatedStyle(() => ({
        transform: [{ scale: outerPulse.value }],
        opacity: 0.35 + (outerPulse.value - 0.96) * 5,
    }));


    // Filter invalid entries and duplicate IDs.
    const validParticipants = useMemo(() => {
        const seen = new Set<string>();

        return participants.filter((participant) => {
            const id = participant.id?.trim();

            if (!id || !participant.name?.trim() || seen.has(id)) {
                return false;
            }

            seen.add(id);
            return true;
        });
    }, [participants]);

    const currentUser = validParticipants.find(
        (participant) =>
            participant.isYou ||
            (currentUserId != null && participant.id === currentUserId),
    );

    const safeMaxVisible = Math.max(
        1,
        Math.min(MAX_VISIBLE, Math.floor(maxVisible) || 1),
    );

    const visibleParticipants = useMemo(() => {
        const ordered = currentUser
            ? [
                currentUser,
                ...validParticipants.filter(
                    (participant) => participant.id !== currentUser.id,
                ),
            ]
            : validParticipants;

        return ordered.slice(0, safeMaxVisible);
    }, [currentUser, validParticipants, safeMaxVisible]);

    const reportedTotal =
        typeof totalPlayers === "number" && Number.isFinite(totalPlayers)
            ? Math.max(0, Math.floor(totalPlayers))
            : validParticipants.length;

    const playerCount = Math.max(reportedTotal, validParticipants.length);

    const readyPlayers =
        typeof readyCount === "number" && Number.isFinite(readyCount)
            ? Math.min(playerCount, Math.max(0, Math.floor(readyCount)))
            : validParticipants.some((p) => p.status != null)
                ? validParticipants.filter(
                    (p) => p.status === "ready" || p.status == null,
                ).length
                : playerCount;

    const overflowCount = Math.max(
        0,
        playerCount - visibleParticipants.length,
    );

    const centerParticipant = visibleParticipants[0];
    const surroundingParticipants = visibleParticipants.slice(1);

    const sideOffset = width < 360 ? 12 : width < 400 ? 20 : 28;

    if (isLoading) {
        return (
            <View className="my-2 h-[310px] w-full items-center justify-center">
                <AnimatedView entering={FadeInDown.duration(250)}>
                    <View className="h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
                        <Users size={21} color={COLORS.primary} />
                    </View>
                </AnimatedView>

                <Text className="mt-3 font-poppins-light text-xs text-text-secondary">
                    Syncing participants...
                </Text>
            </View>
        );
    }

    return (
        <View
            className="my-2 w-full items-center justify-center"
            style={{ height: ARENA_HEIGHT }}
        >
            {/* Outer ambient radar */}
            <AnimatedView
                pointerEvents="none"
                style={outerRingStyle}
                className="absolute h-[280px] w-[280px] rounded-full border border-primary/15 bg-primary/5"
            />

            {/* Fine radar texture */}
            <RadarTexture />

            {/* Current user / first participant */}
            {centerParticipant ? (
                <View
                    className="absolute top-2 z-20 items-center"
                    style={{
                        left: 0,
                        right: 0,
                    }}
                >
                    <ParticipantNode
                        key={centerParticipant.id}
                        participant={centerParticipant}
                        highlighted={
                            Boolean(centerParticipant.isYou) ||
                            centerParticipant.id === currentUserId
                        }
                        index={0}
                        onPress={onParticipantPress}
                    />
                </View>
            ) : (
                <View className="absolute top-2 z-20 items-center">
                    <View className="h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-container-high">
                        <Users size={18} color={COLORS.secondary} />
                    </View>
                    <Text className="mt-1 font-poppins-light text-[10px] text-text-secondary">
                        Waiting for players
                    </Text>
                </View>
            )}

            {/* Surrounding participants */}
            {surroundingParticipants.map((participant, index) => {
                const positions = [
                    { top: 48, right: sideOffset },
                    { bottom: 43, right: sideOffset + 4 },
                    { bottom: 43, left: sideOffset + 4 },
                    { top: 48, left: sideOffset },
                ];

                return (
                    <View
                        key={participant.id}
                        className="absolute z-20 items-center"
                        style={positions[index]}
                    >
                        <ParticipantNode
                            participant={participant}
                            highlighted={participant.id === currentUserId}
                            index={index + 1}
                            onPress={onParticipantPress}
                        />
                    </View>
                );
            })}

            {/* Remaining participants */}
            {overflowCount > 0 && (
                <View className="absolute bottom-0 z-20">
                    <View className="flex-row items-center gap-1.5 rounded-full bg-surface-container-high px-3 py-2">
                        <Users size={14} color={COLORS.primary} />
                        <Text className="font-poppins-semibold text-[8px] font-semibold text-primary">
                            +{overflowCount} more
                        </Text>
                    </View>
                </View>
            )}

            {/* Empty room */}
            {validParticipants.length === 0 && playerCount === 0 && (
                <View className="absolute bottom-2 rounded-full bg-surface-container px-3 py-1">
                    <Text className="font-poppins-light text-[10px] text-text-tertiary">
                        Be the first to join
                    </Text>
                </View>
            )}
        </View>
    );
}


/* Participant avatar and label */
function ParticipantNode({
    participant,
    highlighted = false,
    index = 0,
    onPress,
}: {
    participant: Participant;
    highlighted?: boolean;
    index?: number;
    onPress?: (participant: Participant) => void;
}) {
    const [imageFailed, setImageFailed] = useState(false);
    const scale = useSharedValue(1);

    useEffect(() => {
        setImageFailed(false);
    }, [participant.avatar]);

    const pressStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const statusColor =
        participant.status === "offline"
            ? COLORS.danger
            : participant.status === "waiting"
                ? COLORS.warning
                : COLORS.success;

    return (
        // Entrance animation is on the wrapper, not the Pressable.
        <AnimatedView
            entering={FadeInDown.delay(index * 70)
                .duration(350)
                .springify()
                .damping(18)}
            className="items-center"
        >
            <AnimatedPressable
                style={pressStyle}
                onPressIn={() => {
                    scale.value = withSpring(0.92, {
                        damping: 16,
                        stiffness: 320,
                    });
                }}
                onPressOut={() => {
                    scale.value = withSpring(1, {
                        damping: 16,
                        stiffness: 320,
                    });
                }}
                onPress={() => onPress?.(participant)}
                disabled={!onPress}
                accessibilityRole={onPress ? "button" : undefined}
                accessibilityLabel={`${participant.name}${participant.isHost ? ", host" : ""
                    }, ${participant.status ?? "ready"}`}
                className={[
                    "relative items-center justify-center rounded-full p-[2px]",
                    highlighted
                        ? "bg-primary"
                        : "border border-border bg-surface-container-high",
                ].join(" ")}
            >
                <View className="h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full bg-surface-container-highest">
                    {participant.avatar && !imageFailed ? (
                        <Image
                            source={{ uri: participant.avatar }}
                            className="h-full w-full"
                            resizeMode="cover"
                            onError={() => setImageFailed(true)}
                        />
                    ) : (
                        <Text className="font-poppins-semibold text-sm text-primary">
                            {participant.name.trim().charAt(0).toUpperCase() || "?"}
                        </Text>
                    )}
                </View>

                {/* Status dot */}
                <View
                    style={{ backgroundColor: statusColor }}
                    className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background"
                />
            </AnimatedPressable>

            {/* Name label */}
            <View
                className={[
                    "mt-1 max-w-[82px] rounded-full px-1.5 py-0.5",
                    highlighted ? "bg-primary-soft" : "bg-surface-container-low",
                ].join(" ")}
            >
                <Text
                    numberOfLines={1}
                    className={[
                        "font-poppins-medium text-[10px]",
                        highlighted ? "text-primary" : "text-text-secondary",
                    ].join(" ")}
                >
                    {participant.isYou ? "You" : participant.name}
                </Text>
            </View>

            {participant.isHost && (
                <Text className="mt-0.5 font-mono text-[8px] text-warning">
                    HOST
                </Text>
            )}
        </AnimatedView>
    );
}
