import { View, Text, Pressable } from 'react-native';
import { getEmoji, ProfileEmojiName } from '../../profile/emoji';
import { cn } from 'heroui-native';
import { FontAwesome, Octicons } from '@expo/vector-icons';

export type Participant = {
    id: string;
    name: string;
    avatar: ProfileEmojiName;
    status: 'submitted' | 'active' | 'waiting';
    duration?: string;
    currentQuestion?: number;
    totalQuestions?: number;
    isCurrentUser?: boolean;
};

type ParticipantRosterProps = {
    participants: Participant[];
    onViewLeaderboard: () => void;
};

export function ParticipantUser({
    participants,
    onViewLeaderboard,
}: ParticipantRosterProps) {
    const submittedCount = participants.filter(
        player => player.status === 'submitted'
    ).length;

    const allCompleted =
        participants.length > 0 &&
        submittedCount === participants.length;

    return (
        <View className="gap-3">

            {/* Completion Banner */}
            {allCompleted && (
                <View className="overflow-hidden rounded-2xl border border-primary/20 bg-primary-soft p-3">
                    <View className="flex-row items-center gap-3">
                        <View className="h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
                            <Octicons name="trophy" size={20} color="#5CC6E2" />
                        </View>

                        <View className="flex-1">
                            <Text className="font-poppins-semibold text-sm text-text-primary">
                                Everyone has finished!
                            </Text>
                            <Text className="mt-0.5 font-poppins-light text-[11px] text-text-secondary">
                                {participants.length} participants submitted their answers.
                            </Text>
                        </View>

                        <Octicons name="check-circle" size={19} color="#4ADE80" />
                    </View>

                    <Pressable
                        onPress={onViewLeaderboard}
                        className="mt-3 h-11 flex-row items-center justify-center gap-2 rounded-xl bg-primary active:opacity-80"
                    >
                        <Text className="font-poppins-semibold text-xs text-background">
                            View Final Leaderboard
                        </Text>
                        <Octicons name="chevron-right" size={16} color="#0D1117" />
                    </Pressable>
                </View>
            )}

            {/* Participant Roster */}
            <View className="rounded-2xl border border-border bg-surface-container-low p-3">

                {/* Header */}
                <View className="mb-3 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                        <FontAwesome name="users" size={16} color="#8FA5B8" />
                        <Text className="font-poppins-semibold text-sm text-text-primary">
                            Participants
                        </Text>
                    </View>

                    <View className="rounded-full bg-surface-container-high px-2.5 py-1">
                        <Text className="font-poppins-medium text-[10px] text-text-secondary">
                            {submittedCount}/{participants.length} finished
                        </Text>
                    </View>
                </View>

                {/* Player List */}
                <View className="gap-1.5">
                    {participants.map(player => (
                        <ParticipantRow
                            key={player.id}
                            participant={player}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
}

function ParticipantRow({
    participant,
}: {
    participant: Participant;
}) {
    const { status } = participant;

    const isSubmitted = status === 'submitted';
    const isActive = status === 'active';

    const { emoji, background } = getEmoji(participant.avatar);

    return (
        <View
            className={cn("min-h-14 flex-row items-center gap-2.5 rounded-xl px-2.5 py-2",
                isActive ? 'bg-primary-soft' : 'bg-surface-container/60'
            )}
        >
            {/* Avatar */}
            <View className="relative ">
                <View
                    className={cn("h-9 w-9 items-center justify-center rounded-full",
                        participant.isCurrentUser
                            ? 'bg-primary/20'
                            : 'bg-surface-container-high'
                    )}
                    style={{ backgroundColor: background }}
                >
                    <Text
                        className={`font-poppins-semibold text-[16px]`}
                    >
                        {emoji}
                    </Text>
                </View>

                {/* Status indicator */}
                <View className="absolute -bottom-1 -right-1 size-auto items-center justify-center rounded-2xl p-0.5 bg-surface-container">
                    {isSubmitted ? (
                        <Octicons name="check-circle" size={13} color="#4ADE80" />
                    ) : isActive ? (
                        <Octicons name="stopwatch" size={13} color="#5cc6e2" />
                        // <View className="h-2 w-2 rounded-full bg-primary" />
                    ) : (
                        <View className="h-2 w-2 rounded-full bg-text-tertiary" />
                    )}
                </View>
            </View>

            {/* Name and details */}
            <View className="flex-1 min-w-0">
                <View className="flex-row items-center gap-1.5">
                    <Text
                        numberOfLines={1}
                        className="shrink font-poppins-medium text-xs text-text-primary"
                    >
                        {participant.name}
                    </Text>

                    {participant.isCurrentUser && (
                        <Text className="font-poppins-semibold text-[9px] text-primary">
                            YOU
                        </Text>
                    )}
                </View>

                <Text
                    numberOfLines={1}
                    className={cn("mt-0.5 font-poppins-light text-[10px]",
                        isActive ? 'text-primary' : 'text-text-tertiary'
                    )}
                >
                    {isSubmitted
                        ? `Finished in ${participant.duration ?? '--:--'}`
                        : isActive ? 'Answering' : 'Waiting to start'}
                </Text>
            </View>

            {/* Status label */}
            {isSubmitted ? (
                <View className="flex-row items-center gap-1 rounded-full bg-success-soft px-2 py-1">
                    <Octicons name="check" size={11} color="#4ADE80" />
                    <Text className="font-poppins-medium text-[9px] text-success">
                        Done
                    </Text>
                </View>
            ) : isActive ? (
                <View className="flex-row items-center gap-1 rounded-full bg-primary/10 px-2 py-1">
                    <View className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <Text className="font-poppins-medium text-[9px] text-primary">
                        Active
                    </Text>
                </View>
            ) : (
                <View className="flex-row items-center gap-1 rounded-full bg-surface-container-high px-2 py-1">
                    <Octicons name="clock" size={10} color="#8FA5B8" />
                    <Text className="font-poppins-medium text-[9px] text-text-tertiary">
                        Waiting
                    </Text>
                </View>
            )}
        </View>
    );
}