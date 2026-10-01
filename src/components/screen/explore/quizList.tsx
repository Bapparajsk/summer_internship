import { Text, View } from 'react-native';

import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Chip, Dialog } from "heroui-native";
// import { FilterPopover, type FilterOption } from '../popover';
import { QuizCardProps, QuizCard } from '../../quiz';
import { FlashList } from "@shopify/flash-list";

const QUIZZES: QuizCardProps[] = [
    {
        title: "SQL Joins Mastery",
        chapter: "Chapter 4",
        difficulty: "Hard",
        questions: 20,
        duration: 15,
        xp: 120,
        participants: 1248,
        accuracy: 82,
        badge: 'Trending',
        status: "active"
    },
    {
        title: "Normalization Rules",
        chapter: "Chapter 5",
        difficulty: "Medium",
        questions: 15,
        duration: 10,
        xp: 90,
        participants: 986,
        accuracy: 95,
        status: "completed",
        score: 10
    },
    {
        title: "Transaction Management",
        chapter: "Chapter 8",
        difficulty: "Expert",
        questions: 25,
        duration: 20,
        xp: 250,
        participants: 0,
        accuracy: 0,
        status: "locked"
    }
];

export const QuizNavigator = () => {

    // const [activeFilter, setActiveFilter] = useState<FilterOption>(FILTERS[0]);
    const [isOpen, setIsOpen] = useState<QuizCardProps | null>(null);
    const router = useRouter();

    return (
        <View className='mt-3'>
        
            <FlashList
                data={QUIZZES}
                renderItem={({ item }) => (
                    <QuizCard
                        title={item.title}
                        chapter={item.chapter}
                        difficulty={item.difficulty}
                        questions={item.questions}
                        duration={item.duration}
                        xp={item.xp}
                        participants={item.participants}
                        accuracy={item.accuracy}
                        badge={item.badge}
                        status={item.status}
                        score={item.score}
                        onPress={() => setIsOpen(item)}
                    />
                )}
            />

            {/* <Dialog isOpen={isOpen !== null} onOpenChange={(open) => !open && setIsOpen(null)}>
                <Dialog.Portal>
                    <Dialog.Overlay className='bg-black/50' />
                    <Dialog.Content className='p-0'>
                        <QuizChallengeModal {...isOpen!} onStartChallenge={() => {
                            setIsOpen(null);
                            router.push("/quiz_game" as any);
                        }} />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog> */}
        </View>
    )
}