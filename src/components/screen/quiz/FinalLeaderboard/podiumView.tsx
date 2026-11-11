
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    Crown,
    Zap,
} from 'lucide-react-native';

import Animated, {
    FadeIn,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { getEmoji, ProfileEmojiName } from '../../profile/emoji';

// --------------------------------------------------
// Types
// --------------------------------------------------

export type Player = {
    id: string;
    name: string;
    avatar: ProfileEmojiName;
    score: number;
    accuracy: number;
    duration: string;
    rank: 1 | 2 | 3;
    isCurrentUser?: boolean;
};

type EsportsPodiumProps = {
    players: Player[];
};

// --------------------------------------------------
// Rank theme
// --------------------------------------------------

const RANK_THEME = {
    1: {
        accent: '#F5C76B',
        glow: 'rgba(245,199,107,0.15)',
        border: 'rgba(245,199,107,0.65)',
        gradient: ['#332A19', '#171A1D'] as const,
        platform: ['#5B4826', '#29251D'] as const,
    },
    2: {
        accent: '#5CC6E2',
        glow: 'rgba(92,198,226,0.13)',
        border: 'rgba(92,198,226,0.55)',
        gradient: ['#16313B', '#151B20'] as const,
        platform: ['#174253', '#17252C'] as const,
    },
    3: {
        accent: '#CD956C',
        glow: 'rgba(205,149,108,0.12)',
        border: 'rgba(205,149,108,0.55)',
        gradient: ['#33251F', '#171A1D'] as const,
        platform: ['#493126', '#29211D'] as const,
    },
};

// --------------------------------------------------
// Main component
// --------------------------------------------------

export function EsportsPodium({
    players,
}: EsportsPodiumProps) {
    const first = players.find(p => p.rank === 1);
    const second = players.find(p => p.rank === 2);
    const third = players.find(p => p.rank === 3);

    if (!first) return null;

    return (
        <View className="relative gap-3">

            {/* Arena heading */}
            <View className="flex-row items-center justify-between">
                <View>
                    <Text className="font-poppins-semibold text-base text-text-primary">
                        Final Arena
                    </Text>

                    <Text className="font-poppins-medium text-[10px] tracking-wider text-text-tertiary">
                        TOP THREE CHAMPIONS
                    </Text>
                </View>

                <View className="flex-row items-center gap-1.5 rounded-full border border-primary/20 bg-primary-soft px-2.5 py-1">
                    <Zap size={11} color="#5CC6E2" />

                    <Text className="font-poppins-semibold text-[9px] text-primary">
                        FINAL RANKING
                    </Text>
                </View>
            </View>

            {/* Arena panels */}
            <View className="relative flex-row items-end gap-1.5">

                {/* <ArenaGlow /> */}

                {second && (
                    <PlayerPanel player={second} />
                )}

                <PlayerPanel player={first} />

                {third && (
                    <PlayerPanel player={third} />
                )}
            </View>
        </View>
    );
}

// --------------------------------------------------
// Player panel
// --------------------------------------------------

function PlayerPanel({
    player,
}: {
    player: Player;
}) {
    const theme = RANK_THEME[player.rank];
    const isWinner = player.rank === 1;

    const { emoji, background } = getEmoji(player.avatar);

    const avatarSize = isWinner ? 62 : 48;
    const panelHeight = isWinner ? 226 : 194;

    // Animation values
    const entrance = useSharedValue(0);
    const avatarScale = useSharedValue(0.65);
    const glow = useSharedValue(0);
    const scoreReveal = useSharedValue(0);

    // Entrance animations
    useEffect(() => {
        const rankDelay = {
            1: 180,
            2: 0,
            3: 320,
        }[player.rank];

        entrance.value = withDelay(
            rankDelay,
            withSpring(1, {
                damping: 16,
                stiffness: 95,
                mass: 0.8,
            }),
        );

        avatarScale.value = withDelay(
            rankDelay + 250,
            withSpring(1, {
                damping: 10,
                stiffness: 130,
                mass: 0.9
            }),
        );

        scoreReveal.value = withDelay(
            rankDelay + 450,
            withSpring(1, {
                damping: 12,
                stiffness: 110,
            }),
        );

        if (isWinner) {
            glow.value = withRepeat(
                withSequence(
                    withTiming(1, { duration: 1800 }),
                    withTiming(0, { duration: 1800 }),
                ),
                -1,
                true,
            );
        }

        return () => {
            entrance.value = 0;
            avatarScale.value = 0;
            scoreReveal.value = 0;
            glow.value = 0;
        };
    }, []);

    // Panel entrance
    const panelStyle = useAnimatedStyle(() => ({
        opacity: entrance.value,
        transform: [
            {
                translateY: interpolate(
                    entrance.value,
                    [0, 1],
                    [42, 0],
                ),
            },
        ],
    }));

    // Avatar entrance
    const avatarStyle = useAnimatedStyle(() => ({
        opacity: avatarScale.value,
        transform: [
            {
                scale: avatarScale.value,
            },
        ],
    }));

    // Champion glow
    const glowStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            glow.value,
            [0, 1],
            [0.35, 0.9],
        ),
    }));

    // Score reveal
    const scoreStyle = useAnimatedStyle(() => ({
        opacity: scoreReveal.value,
        transform: [
            {
                translateY: interpolate(
                    scoreReveal.value,
                    [0, 1],
                    [10, 0],
                ),
            },
            {
                scale: interpolate(
                    scoreReveal.value,
                    [0, 1],
                    [0.8, 1],
                ),
            },
        ],
    }));

    return (
        <Animated.View
            style={[
                panelStyle,
                {
                    height: panelHeight,
                    flex: 1,
                    borderColor: theme.border,
                    zIndex: 1,
                },
            ]}
            className="min-w-0 overflow-hidden rounded-t-xl rounded-b-lg border"
        >

            {/* Background */}
            <LinearGradient
                colors={theme.gradient}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            />

            {/* Top accent */}
            <View
                className="absolute left-0 right-0 top-0 h-0.5"
                style={{
                    backgroundColor: theme.accent,
                }}
            />

            {/* Champion glow line */}
            {isWinner && (
                <Animated.View
                    style={[
                        glowStyle,
                        {
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            height: 3,
                            backgroundColor: theme.accent,
                        },
                    ]}
                />
            )}

            {/* Large background rank */}
            <Animated.Text
                entering={FadeIn.delay(450).duration(700)}
                className="absolute right-1 top-5 font-poppins-semibold"
                style={{
                    fontSize: isWinner ? 74 : 62,
                    lineHeight: isWinner ? 82 : 70,
                    color: theme.accent,
                    opacity: 0.09,
                }}
            >
                0{player.rank}
            </Animated.Text>

            {/* Panel content */}
            <View className="flex-1 items-center px-1.5 pt-3">

                {/* Rank badge */}
                <Animated.View
                    entering={FadeIn.delay(300).duration(500)}
                    className="flex-row items-center gap-1 rounded-full px-2 py-1"
                    style={{
                        backgroundColor: theme.glow,
                    }}
                >
                    {isWinner && (
                        <Crown
                            size={11}
                            color={theme.accent}
                            fill={theme.accent}
                        />
                    )}

                    <Text
                        className="font-poppins-semibold text-[9px] tracking-wider"
                        style={{
                            color: theme.accent,
                        }}
                    >
                        RANK 0{player.rank}
                    </Text>
                </Animated.View>

                {/* Avatar */}
                <Animated.View
                    style={[
                        avatarStyle,
                        {
                            width: avatarSize + 8,
                            height: avatarSize + 8,
                            borderColor: theme.accent,
                            backgroundColor: theme.glow,
                        },
                    ]}
                    className="mt-1 items-center justify-center rounded-full border-2"
                >
                    <View
                        className="overflow-hidden rounded-full"
                        style={{
                            width: avatarSize,
                            height: avatarSize,
                            backgroundColor: background,
                        }}
                    >
                        <View className="flex-1 items-center justify-center">
                            <Text
                                className="font-poppins-semibold text-2xl"
                            >
                                {emoji}
                            </Text>
                        </View>
                    </View>
                </Animated.View>

                {/* Player name */}
                <Animated.Text
                    entering={FadeIn.delay(500).duration(400)}
                    numberOfLines={1}
                    className="mt-1 w-full text-center font-poppins-semibold text-xs text-text-primary"
                >
                    {player.name}
                </Animated.Text>

                {/* Score reveal */}
                <Animated.View
                    style={scoreStyle}
                    className="mt-1 items-center"
                >
                    <Text
                        className="font-poppins-semibold"
                        style={{
                            color: theme.accent,
                            fontSize: isWinner ? 27 : 23,
                            lineHeight: isWinner ? 33 : 29,
                        }}
                    >
                        {player.score}
                    </Text>

                    <Text className="font-poppins-medium text-[8px] tracking-[2px] text-text-tertiary">
                        POINTS
                    </Text>
                </Animated.View>

                {/* Performance details */}
                <View className="mt-auto w-full items-center pb-2">
                    <View
                        className="mb-1 h-px w-full"
                        style={{
                            backgroundColor: theme.border,
                        }}
                    />

                    <Text className="font-poppins-medium text-[9px] text-text-secondary">
                        {player.accuracy}% ACC /
                        <Text className="mt-0.5 font-poppins-light text-[9px] text-text-tertiary">
                            {" "}{player.duration}
                        </Text>
                    </Text>
                </View>
            </View>

        </Animated.View>
    );
}

// --------------------------------------------------
// Example data
// --------------------------------------------------

export const MOCK_PODIUM_PLAYERS: Player[] = [
    {
        id: '1',
        name: 'Arjun Das',
        avatar: "blossom",
        score: 980,
        accuracy: 95,
        duration: '04:12',
        rank: 1,
    },
    {
        id: '2',
        name: 'Bapparaj',
        avatar: "panda",
        score: 920,
        accuracy: 90,
        duration: '04:32',
        rank: 2,
        isCurrentUser: true,
    },
    {
        id: '3',
        name: 'Riya Ghosh',
        avatar: "frog",
        score: 860,
        accuracy: 85,
        duration: '05:01',
        rank: 3,
    },
];
