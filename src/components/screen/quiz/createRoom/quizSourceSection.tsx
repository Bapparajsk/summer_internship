
import { useState } from 'react';
import { View, Text } from 'react-native';
import { SlidersHorizontal, Database } from 'lucide-react-native';
import { Tabs } from 'heroui-native';
import { CATEGORIES } from './data';
import { SubjectList } from './subjectList';

type Props = {
    questionPoolCount: number;
};

export const QuizSourceSection = ({
    questionPoolCount,
}: Props) => {
    const [category, setCategory] = useState('programming');

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
                <SubjectList category={category} />

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

