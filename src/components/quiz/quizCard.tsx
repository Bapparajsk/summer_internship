import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

import { PressableFeedback } from 'heroui-native';

type Difficulty =
    | 'Easy'
    | 'Medium'
    | 'Hard'
    | 'Expert';

export type QuizCardProps = {
    title: string;
    chapter: string;

    difficulty: Difficulty;

    questions: number;
    duration: number;

    xp: number;

    participants: number;
    accuracy: number;

    status?: 'active' | 'completed' | 'locked';
    badge?: BadgeType;
    score?: number;

    onPress?: () => void;
};


type BadgeType =
    | 'Trending'
    | 'Most Attempted'
    | 'Recommended'
    | 'New Quiz'
    | 'AI Generated';


const difficultyColor = {
    Easy: '#22C55E',
    Medium: '#EAB308',
    Hard: '#EF4444',
    Expert: '#A855F7',
};



const formatCount = (value: number) => {
    if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}k`;
    }

    return value.toString();
};


const badgeConfig = {
    Trending: {
        icon: 'local-fire-department',
        color: '#FB923C',
    },
    'Most Attempted': {
        icon: 'emoji-events',
        color: '#FACC15',
    },
    Recommended: {
        icon: 'recommend',
        color: '#22D3EE',
    },
    'New Quiz': {
        icon: 'bolt',
        color: '#A78BFA',
    },
    'AI Generated': {
        icon: 'auto-awesome',
        color: '#22D3EE',
    },
};

export const QuizCard = ({
    title,
    chapter,

    difficulty,

    questions,
    duration,

    xp,

    participants,
    accuracy,

    status = 'active',
    badge = 'Recommended',
    score,

    onPress,
}: QuizCardProps) => {
    const color =
        difficultyColor[difficulty];

    const badgeStyle =
        badgeConfig[badge];

    const needsImprovement = (score ?? 0) < 80;

    const actionLabel = needsImprovement
        ? 'Improve Score'
        : 'Reattempt';

    const actionIcon = needsImprovement
        ? 'trending-up'
        : 'refresh';

    return (
        <View
            className="overflow-hidden rounded-[28px] border border-white/10 bg-white/4 p-4"
        >
            {status === "locked" && (
                <View className="absolute inset-0 z-10 flex-row items-center justify-center bg-black/25" />

            )}
            {/* Glow */}
            <View
                className="absolute -right-8 -top-8 h-24 w-24 rounded-full"
                style={{
                    backgroundColor:
                        `${color}10`,
                }}
            />

            {/* Header */}
            <View className="flex-row items-start justify-between">

                <View className="flex-1">
                    <Text
                        numberOfLines={1}
                        className="font-poppins-semibold"
                    >
                        {title}
                    </Text>

                    <Text className="mt-1 text-xs text-zinc-500">
                        {chapter}
                    </Text>
                </View>

                <View
                    className="rounded-full px-2.5 py-1"
                    style={{
                        backgroundColor:
                            `${color}15`,
                    }}
                >
                    <Text
                        className="text-[10px] font-poppins-semibold uppercase leading-normal"
                        style={{
                            color,
                        }}
                    >
                        {difficulty}
                    </Text>
                </View>

            </View>

            {/* Quiz Info */}
            <View className="mt-4 flex-row items-center">

                <View className="flex-row items-center">
                    <MaterialIcons
                        name="schedule"
                        size={14}
                        color="#71717A"
                    />

                    <Text className="ml-1 text-xs text-zinc-400">
                        {duration}m
                    </Text>
                </View>

                <View className="ml-4 flex-row items-center">
                    <MaterialIcons
                        name="quiz"
                        size={14}
                        color="#71717A"
                    />

                    <Text className="ml-1 text-xs text-zinc-400">
                        {questions} Q
                    </Text>
                </View>

                <View className="ml-4 flex-row items-center">
                    <MaterialIcons
                        name="stars"
                        size={14}
                        color="#FACC15"
                    />

                    <Text className="ml-1 text-xs text-yellow-400">
                        {xp} XP
                    </Text>
                </View>

            </View>

            {/* Community Stats */}
            <View className="mt-4 flex-row items-center justify-between rounded-2xl bg-white/3 px-3 py-2">

                <View className="flex-row items-center">
                    <MaterialIcons
                        name="groups"
                        size={16}
                        color="#A78BFA"
                    />

                    <Text className="ml-1 text-xs text-zinc-400">
                        {formatCount(participants)} Students
                    </Text>
                </View>

                <View className="flex-row items-center">
                    <MaterialIcons
                        name="track-changes"
                        size={16}
                        color="#22D3EE"
                    />

                    <Text className="ml-1 text-xs text-zinc-400">
                        {accuracy}% Accuracy
                    </Text>
                </View>

            </View>

            {/* Active */}
            {status === 'active' && (
                <View className="mt-4 flex-row items-center justify-between">

                    <View
                        className="mb-3 self-start flex-row items-center rounded-full px-2.5 py-1"
                        style={{
                            backgroundColor:
                                `${badgeStyle.color}15`,
                        }}
                    >
                        <MaterialIcons
                            name={badgeStyle.icon as any}
                            size={12}
                            color={badgeStyle.color}
                        />

                        <Text
                            className="ml-1 text-[10px] font-poppins-semibold uppercase leading-normal"
                            style={{
                                color: badgeStyle.color,
                            }}
                        >
                            {badge}
                        </Text>
                    </View>

                    <PressableFeedback
                        className="flex-row items-center rounded-full px-3 py-2 gap-x-1"
                        style={{ backgroundColor: 'rgba(34,211,238,0.12)' }}
                        onPress={onPress}
                    >
                        <Text className="text-sm text-cyan-400">
                            Start Quiz
                        </Text>
                        <MaterialIcons
                            name="arrow-forward"
                            size={18}
                            color="#22D3EE"
                        />
                    </PressableFeedback>
                </View>
            )}

            {/* Completed */}
            {status === 'completed' && (
                <View className="flex-row items-center justify-between mt-4">

                    {/* Score */}
                    <View className="flex-row items-center">
                        <MaterialIcons
                            name="emoji-events"
                            size={20}
                            color="#FACC15"
                        />

                        <Text className="ml-2 text-2xl font-poppins-semibold">
                            {score}%
                        </Text>
                    </View>

                    {/* Dynamic Action */}
                    <PressableFeedback
                        className="flex-row items-center rounded-full px-3 py-2"
                        style={{
                            backgroundColor:
                                needsImprovement
                                    ? 'rgba(251,146,60,0.12)'
                                    : 'rgba(34,211,238,0.12)',
                        }}
                    >
                        <MaterialIcons
                            name={actionIcon as any}
                            size={16}
                            color={
                                needsImprovement
                                    ? '#FB923C'
                                    : '#22D3EE'
                            }
                        />

                        <Text
                            className="ml-1 text-xs font-semibold"
                            style={{
                                color:
                                    needsImprovement
                                        ? '#FB923C'
                                        : '#22D3EE',
                            }}
                        >
                            {actionLabel}
                        </Text>
                    </PressableFeedback>

                </View>
            )}

            {/* Locked */}
            {status === 'locked' && (
                <View className="mt-4 flex-row items-center">

                    <MaterialIcons
                        name="lock"
                        size={18}
                        color="#71717A"
                    />

                    <Text className="ml-2 text-sm text-zinc-500">
                        Complete previous chapter to unlock
                    </Text>

                </View>
            )}
        </View>
    );
}