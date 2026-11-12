
import { useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import {
    SlidersHorizontal,
    Database,
} from 'lucide-react-native';
import { PressableFeedback, Tabs } from 'heroui-native';

type Category = {
    id: string;
    label: string;
    subjects: string[];
};

const CATEGORIES: Category[] = [
    {
        id: 'programming',
        label: 'Programming',
        subjects: [
            'C++ Programming',
            'Algorithms',
            'Data Structures',
            'React & Web',
            'Operating Systems',
            'Computer Networks',
        ],
    },
    {
        id: 'computer-science',
        label: 'Computer Science',
        subjects: [
            'Operating Systems',
            'Computer Networks',
            'Database Systems',
            'Computer Architecture',
            'Compiler Design',
        ],
    },
    {
        id: 'mathematics',
        label: 'Mathematics',
        subjects: [
            'Algebra',
            'Calculus',
            'Probability',
            'Statistics',
            'Discrete Mathematics',
        ],
    },
    {
        id: 'science',
        label: 'Science',
        subjects: [
            'Physics',
            'Chemistry',
            'Biology',
            'Astronomy',
        ],
    },
    {
        id: 'general',
        label: 'General Knowledge',
        subjects: [
            'History',
            'Geography',
            'Current Affairs',
            'Culture',
        ],
    },
];

type Props = {
    questionPoolCount: number;
};

export const QuizSourceSection = ({
    questionPoolCount,
}: Props) => {
    const [category, setCategory] = useState('programming');
    const [isSelectedSubject, setIsSelectedSubject] = useState<string | undefined>(undefined);

    const subjects = useMemo(() => {
        const selectedCategories =
            category === 'all'
                ? CATEGORIES
                : CATEGORIES.filter(item => item.id === category);

        return [...new Set(
            selectedCategories.flatMap(item => item.subjects)
        )];
    }, [category]);

    console.log(subjects)

    return (
        <View className="gap-2">
            {/* Quiz Source */}
            <View className="gap-3">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                        <SlidersHorizontal size={20} color="#5CC6E2" />
                        <Text className="font-poppins-semibold text-base text-text-primary">
                            Quiz Source
                        </Text>
                    </View>
                </View>
            </View>

            {/* Category and Subject */}
            <View className="gap-4 rounded-4xl border border-border bg-white/4 p-2">
                <View className="flex-row items-center justify-between">
                    <Text className="font-poppins-semibold text-[15px] text-text-primary">
                        Category & Subject
                    </Text>
                </View>

                {/* Categories */}
                <View className="gap-2">
                    <Text className="text-[10px] font-poppins-semibold tracking-widest text-text-tertiary">
                        CATEGORY
                    </Text>

                    <View className="flex-row flex-wrap gap-2">
                        <Tabs
                            value={category}

                            onValueChange={(value) => {
                                if (value === "all") {
                                    setCategory('all');
                                }
                                setCategory(value)
                            }}
                        >
                            <Tabs.List>
                                <Tabs.ScrollView scrollAlign="center" >
                                    <Tabs.Indicator />

                                    <Tabs.Trigger value="all">
                                        <Tabs.Label>
                                            <Text className='font-poppins-medium text-xs leading-normal'>
                                                All
                                            </Text>
                                        </Tabs.Label>
                                    </Tabs.Trigger>
                                    {CATEGORIES.map(category => (
                                        <Tabs.Trigger value={category.id} key={`create-room-quiz-category-id-${category.id}`}>
                                            <Tabs.Label>
                                                <Text className='font-poppins-medium text-xs leading-normal'>
                                                    {category.label}
                                                </Text>
                                            </Tabs.Label>
                                        </Tabs.Trigger>
                                    ))}
                                </Tabs.ScrollView>
                            </Tabs.List>
                        </Tabs>
                    </View>
                </View>

                <View className="h-px bg-border" />

                {/* Subjects */}
                <View className="gap-2">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-[10px] font-poppins-semibold tracking-widest text-text-tertiary">
                            SUBJECT / TRACK
                        </Text>
                        {subjects.length > 4 && (
                            <PressableFeedback>
                                <Text className='text-primary text-xs font-poppins-medium'>
                                    See All
                                </Text>
                            </PressableFeedback>
                        )}
                    </View>

                    <View className="flex-row flex-wrap gap-2">
                        {subjects.slice(0, 4).map((sub => (
                            <SubjectChip
                                key={sub}
                                label={sub}
                                selected={isSelectedSubject === sub}
                                onPress={() => {
                                    setIsSelectedSubject(sub)
                                }}
                            />
                        )))}
                    </View>
                </View>

                {/* Question pool */}
                <View className="gap-2 rounded-xl bg-surface-container-lowest border border-border p-3">
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center gap-2">
                            <Database size={15} color="#5CC6E2" />
                            <Text className="font-poppins-medium text-xs text-text-primary">
                                Question Pool
                            </Text>
                        </View>

                        <View className="flex-row items-center gap-1">
                            <View className="h-1.5 w-1.5 rounded-full bg-success" />
                            <Text className="text-[10px] text-success font-poppins-semibold">
                                Available
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row items-baseline gap-1">
                        <Text className="font-poppins-semibold text-2xl text-primary">
                            {questionPoolCount}
                        </Text>
                        <Text className="text-[11px] text-text-secondary font-poppins-medium">
                            questions available
                        </Text>
                    </View>

                    <Text className="text-[10px] font-poppins-medium leading-4 text-text-tertiary">
                        Based on your selected category and subject.
                    </Text>
                </View>
            </View>
        </View>
    );
};

const SubjectChip = ({
    label,
    selected,
    onPress,
}: {
    label: string;
    selected: boolean;
    onPress: () => void;
}) => (
    <PressableFeedback
        onPress={onPress}
        className={`rounded-lg border px-3 py-2 ${selected
            ? 'border-primary bg-primary'
            : 'border-border bg-surface-container-high'
            }`}
    >
        <Text
            className={`text-[11px] font-poppins-medium ${selected ? 'text-background' : 'text-text-primary'
                }`}
        >
            {label}
        </Text>
    </PressableFeedback>
);