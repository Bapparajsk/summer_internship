import { View } from 'react-native';

import { useRouter } from 'expo-router';
import { useState } from 'react';
// import { Chip, Dialog } from "heroui-native";
import { QuizCardProps, QuizCard } from '../../quiz';
import { FlashList } from "@shopify/flash-list";

export const tempQuizData: QuizCardProps[] = [
    {
        type: "new",
        title: "Master Binary Trees",
        chapter: "Data Structures",
        description:
            "Test your knowledge of traversal, BSTs and tree algorithms.",
        difficulty: "Medium",
        icon: "dsa",
        questions: 20,
        duration: 10,
        accuracy: 82,
    },

    {
        type: "new",
        title: "Graph Algorithms",
        chapter: "Data Structures",
        description:
            "Explore BFS, DFS, shortest paths and graph traversal.",
        difficulty: "Hard",
        icon: "dsa",
        questions: 25,
        duration: 15,
        accuracy: 76,
    },

    {
        type: "continue",
        title: "C++ STL Mastery",
        chapter: "C++ Standards",
        description:
            "Iterators, algorithms, and container memory overhead.",
        difficulty: "Expert",
        icon: "cpp",
        questions: 15,
        duration: 7,
        solved: 8,
    },

    {
        type: "continue",
        title: "Operating Systems Core",
        chapter: "Operating Systems",
        description:
            "Practice processes, threads, scheduling and memory.",
        difficulty: "Hard",
        icon: "os",
        questions: 20,
        duration: 12,
        solved: 13,
    },

    {
        type: "live",
        title: "Campus DSA Challenge",
        chapter: "Data Structures",
        description: "Real-time competitive sprint with live leaderboard.",
        icon: "dsa",
        questions: 20,
        duration: 10,
        participants: 12,
        host: "Arjun",
    },

    {
        type: "live",
        title: "C++ Speed Battle",
        chapter: "Competitive Programming",
        description: "Fast-paced C++ challenge with your campus community.",
        icon: "cpp",
        questions: 15,
        duration: 8,
        participants: 24,
        host: "Rahul",
    },

    {
        type: "join",
        title: "Operating Systems Battle",
        chapter: "Operating Systems",
        description: "Virtual memory, page tables, and scheduler algorithms.",
        icon: "os",
        difficulty: "Medium",
        questions: 20,
        duration: 10,
        code: "Q7X4K9",
        host: "Rahul",
        participants: 16,
    },

    {
        type: "join",
        title: "Database Challenge",
        chapter: "Databases",
        icon: "db",
        description:  "SQL, indexing, transactions and database design.",
        difficulty: "Hard",
        questions: 18,
        duration: 12,
        code: "DB82PX",
        host: "Priya",
        participants: 9,
    },
];


export const QuizList = () => {

    // const [activeFilter, setActiveFilter] = useState<FilterOption>(FILTERS[0]);
    const [isOpen, setIsOpen] = useState<QuizCardProps | null>(null);
    const router = useRouter();

    return (
        <View>
            <FlashList
                data={tempQuizData}
                keyExtractor={(item, index) => `${item.title}-${index}`}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <QuizCard
                        {...item}
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