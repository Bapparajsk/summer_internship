import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { getEmoji, ProfileEmojiName } from '../../profile/emoji';

type Participant = {
    id: string;
    name: string;
    avatar: ProfileEmojiName;
    correct: number;
    total: number;
    score: number;
    duration: string;
    isCurrentUser?: boolean;
};

type Props = {
    participants: Participant[];
};

export const AllParticipants = ({
    participants,
}: Props) => {
    // Exclude podium positions and the current user.
    const remainingParticipants = participants
        .filter((participant, index) => index >= 3 && !participant.isCurrentUser)
        .sort(
            (a, b) =>
                b.score - a.score ||
                a.duration.localeCompare(b.duration),
        );


    return (
        <View className="pt-3">
            <View className="flex-row items-center justify-between pb-3">
                <Text className="font-poppins-semibold text-base text-text-primary">
                    All Participants ({remainingParticipants.length})
                </Text>

                <Text className="text-[10px] text-text-tertiary font-poppins-medium">
                    Sorted by Points · Speed
                </Text>
            </View>

            <View className="gap-1.5">
                {remainingParticipants.map((participant, index) => {
                    const accuracy = Math.round(
                        (participant.correct / participant.total) * 100,
                    );

                    const { emoji, background } = getEmoji(participant.avatar)

                    return (
                        <View
                            key={participant.id}
                            className="flex-row items-center justify-between rounded-xl bg-surface-container-low p-3 active:bg-surface-container"
                        >
                            <View className="min-w-0 flex-1 flex-row items-center gap-2.5">
                                <Text className="w-6 text-center font-poppins-semibold text-xs font-semibold text-text-tertiary">
                                    {String(index + 4).padStart(2, '0')}
                                </Text>

                                <View 
                                    className="h-9 w-9 items-center justify-center rounded-2xl"
                                    style={{ backgroundColor: background }}
                                >
                                    <Text className="font-poppins-semibold text-sm">
                                        {emoji}
                                    </Text>
                                </View>

                                <View className="min-w-0 flex-1">
                                    <Text
                                        numberOfLines={1}
                                        className="font-poppins-medium text-sm text-text-primary"
                                    >
                                        {participant.name}
                                    </Text>

                                    <View className="flex-row items-center gap-1">
                                        <Text className="text-[10px] text-text-secondary font-poppins-medium ">
                                            {participant.correct}/{participant.total} correct
                                        </Text>
                                        <Text className="text-text-tertiary">-</Text>
                                        <Text className="text-[10px] text-text-tertiary font-poppins-medium">
                                            {accuracy}%
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View className="ml-2 items-end">
                                <Text className="text-sm font-poppins-semibold text-text-primary">
                                    {participant.score}{' '}
                                    <Text className="text-[10px] font-normal text-text-tertiary">
                                        pts
                                    </Text>
                                </Text>

                                <Text className="text-[10px] font-poppins-medium text-text-secondary">
                                    {participant.duration}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

export const TEMP_PARTICIPANTS: Participant[] = [
    {
        id: 'user-04',
        name: 'Anik Roy',
        correct: 16,
        avatar: "fox",
        total: 20,
        score: 820,
        duration: '05:10',
    },
    {
        id: 'user-05',
        name: 'Rahul Sen',
        avatar: "rabbit",
        correct: 15,
        total: 20,
        score: 790,
        duration: '05:28',
    },
    {
        id: 'user-06',
        name: 'Sayan Paul',
        avatar: "penguin",
        correct: 14,
        total: 20,
        score: 740,
        duration: '05:45',
    },
    {
        id: 'user-07',
        name: 'Priya Sharma',
        avatar: 'ghost',
        correct: 13,
        total: 20,
        score: 700,
        duration: '06:02',
    },
    {
        id: 'user-08',
        name: 'Rohan Das',
        avatar: 'happy',
        correct: 12,
        total: 20,
        score: 660,
        duration: '06:18',
    },
    {
        id: 'user-09',
        name: 'Sneha Roy',
        avatar: "panda",
        correct: 11,
        total: 20,
        score: 610,
        duration: '06:42',
    },
    {
        id: 'user-10',
        name: 'Amit Ghosh',
        avatar: 'happy',
        correct: 10,
        total: 20,
        score: 560,
        duration: '07:05',
    },
    {
        id: 'user-11',
        name: 'Neha Das',
        avatar: "fox",
        correct: 9,
        total: 20,
        score: 510,
        duration: '07:32',
    },
];