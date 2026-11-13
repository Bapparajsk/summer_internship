import { View, Text } from 'react-native';
import {
    BookOpen,
    CheckCircle2,
    Clock3,
    Layers3,
    Lock,
    Shuffle,
    Trophy,
    Users,
    ClipboardCheck,
} from 'lucide-react-native';

type RoomBlueprintProps = {
    visibility: 'public' | 'private';
    capacity: number;
    category: string;
    subjects: string[];
    questionOrder: 'randomized' | 'sequential';
    questionCount: number;
    difficulty: string;
    timePerQuestion: number;
    baseScore: number;
    negativeMarking: boolean;
    penalty: number;
    showCorrectAnswer: boolean;
    shuffleAnswers: boolean;
};

export const RoomBlueprint = ({
    visibility,
    capacity,
    category,
    subjects,
    questionOrder,
    questionCount,
    difficulty,
    timePerQuestion,
    baseScore,
    negativeMarking,
    penalty,
    showCorrectAnswer,
    shuffleAnswers,
}: RoomBlueprintProps) => {
    const subjectLabel =
        subjects.length > 0
            ? subjects.length === 1
                ? subjects[0]
                : `${subjects.length} subjects`
            : category;

    return (
        <View className="rounded-4xl border border-border bg-white/6 p-3 gap-4">

            {/* Header */}
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                    <View className="h-9 w-9 items-center justify-center rounded-xl bg-primary-soft">
                        <ClipboardCheck size={18} color="#5CC6E2" />
                    </View>

                    <View>
                        <Text className="font-poppins-semibold text-sm text-text-primary">
                            Room overview
                        </Text>
                        <Text className="font-poppins-medium text-[10px] text-text-secondary">
                            Review your room configuration
                        </Text>
                    </View>
                </View>

                <View className="flex-row items-center gap-1 rounded-full bg-success-soft px-2 py-1">
                    <CheckCircle2 size={11} color="#4ADE80" />
                    <Text className="font-poppins-medium text-[10px] text-success">
                        Ready
                    </Text>
                </View>
            </View>

            <View className="h-px bg-border" />

            {/* Room access */}
            <View className="gap-2">
                <SectionLabel label="ROOM ACCESS" />

                <View className="flex-row gap-2">
                    <SummaryCard
                        Icon={Lock}
                        label="Visibility"
                        value={visibility === 'private' ? 'Private' : 'Public'}
                        detail={visibility === 'private' ? 'PIN protected' : 'Open to join'}
                    />

                    <SummaryCard
                        Icon={Users}
                        label="Capacity"
                        value={`${capacity} players`}
                        detail="Maximum players"
                    />
                </View>
            </View>

            {/* Quiz configuration */}
            <View className="gap-2">
                <SectionLabel label="QUIZ CONFIGURATION" />

                <View className="rounded-xl bg-surface-container-high p-3 gap-3">
                    <SummaryRow
                        Icon={BookOpen}
                        label="Subject"
                        value={subjectLabel}
                    />

                    <View className="h-px bg-border" />

                    <SummaryRow
                        Icon={Shuffle}
                        label="Question order"
                        value={questionOrder === 'randomized' ? 'Randomized' : 'Sequential'}
                    />

                    <View className="h-px bg-border" />

                    <SummaryRow
                        Icon={Layers3}
                        label="Questions"
                        value={`${questionCount} · ${capitalize(difficulty)}`}
                    />
                </View>
            </View>

            {/* Game rules */}
            <View className="gap-2">
                <SectionLabel label="GAME RULES" />

                <View className="flex-row gap-2">
                    <SummaryCard
                        Icon={Clock3}
                        label="Time per question"
                        value={`${timePerQuestion}s`}
                    />

                    <SummaryCard
                        Icon={Trophy}
                        label="Correct answer"
                        value={`+${baseScore} pts`}
                    />
                </View>

                <View className="flex-row flex-wrap gap-1.5">
                    {negativeMarking && (
                        <RuleBadge
                            label={`Penalty −${penalty} pts`}
                            type="danger"
                        />
                    )}

                    <RuleBadge
                        label={showCorrectAnswer ? 'Answer reveal' : 'No answer reveal'}
                        type={showCorrectAnswer ? 'success' : 'neutral'}
                    />

                    <RuleBadge
                        label={shuffleAnswers ? 'Shuffle options' : 'Fixed options'}
                        type="neutral"
                    />
                </View>
            </View>
        </View>
    );
};

// ---------- Reusable UI ----------

const SectionLabel = ({ label }: { label: string }) => (
    <Text className="font-poppins-semibold text-[10px] tracking-wider text-text-tertiary">
        {label}
    </Text>
);

const SummaryCard = ({
    Icon,
    label,
    value,
    detail,
}: {
    Icon: typeof Lock;
    label: string;
    value: string;
    detail?: string;
}) => (
    <View className="flex-1 rounded-3xl bg-white/10 border border-border p-3 gap-1">
        <View className="flex-row items-center gap-1.5">
            <Icon size={13} color="#8FA5B8" />
            <Text className="font-poppins-medium text-[10px] text-text-secondary">
                {label}
            </Text>
        </View>
 
        <Text
            numberOfLines={1}
            className="font-poppins-semibold text-sm text-text-primary"
        >
            {value}
        </Text>

        {detail && (
            <Text className="font-poppins-light text-[10px] text-text-secondary">
                {detail}
            </Text>
        )}
    </View>
);

const SummaryRow = ({
    Icon,
    label,
    value,
}: {
    Icon: typeof BookOpen;
    label: string;
    value: string;
}) => (
    <View className="flex-row items-center gap-2">
        <Icon size={14} color="#5CC6E2" />

        <Text className="flex-1 font-poppins-medium text-xs text-text-secondary">
            {label}
        </Text>

        <Text
            numberOfLines={1}
            className="max-w-[55%] font-poppins-semibold text-xs text-text-primary"
        >
            {value}
        </Text>
    </View>
);

const RuleBadge = ({
    label,
    type,
}: {
    label: string;
    type: 'success' | 'danger' | 'neutral';
}) => {
    const styles = {
        success: 'bg-success-soft text-success',
        danger: 'bg-danger-soft text-danger',
        neutral: 'bg-surface-container-high text-text-secondary',
    };

    const [background, color] = styles[type].split(' text-');

    return (
        <View className={`rounded-full px-2.5 py-1 ${background}`}>
            <Text className={`font-poppins-medium text-[10px] text-${color}`}>
                {label}
            </Text>
        </View>
    );
};

const capitalize = (value: string) =>
    value.charAt(0).toUpperCase() + value.slice(1);