import { reset, start, stop, setCurrentQuestionIndex, setDefaultNavigations, useQuizNavigationStore } from '@/store/quiz';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { QuizFooter } from './footer';
import { QuizGameHeader } from './header';
import QuizOptionsSectionMemo from "./optionsSection";
import { QuizTimeoutModal } from './timeoutModal';
import { Dialog } from 'heroui-native';


export type QuizData = {
    id: string;
    chapter: string;
    difficulty: string;
    question: string;
    options: string[];
    correctAnswer: number;
};

export const QUIZ_DATA: QuizData[] = [
    {
        id: '1',
        chapter: 'Chapter 4',
        difficulty: 'Medium',
        question: 'Which SQL statement is used to retrieve data from a database?',
        options: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
        correctAnswer: 0,
    },
    {
        id: '2',
        chapter: 'Chapter 4',
        difficulty: 'Medium',
        question: 'Which clause is used to filter records?',
        options: ['ORDER BY', 'GROUP BY', 'WHERE', 'HAVING'],
        correctAnswer: 2,
    },
    {
        id: '3',
        chapter: 'Chapter 4',
        difficulty: 'Easy',
        question: 'Which SQL statement is used to insert new data?',
        options: ['ADD', 'INSERT INTO', 'CREATE', 'UPDATE'],
        correctAnswer: 1,
    },
    {
        id: '4',
        chapter: 'Chapter 4',
        difficulty: 'Medium',
        question: 'Which command removes a table and all its data?',
        options: ['DELETE', 'REMOVE', 'DROP', 'TRUNCATE'],
        correctAnswer: 2,
    },
    {
        id: '5',
        chapter: 'Chapter 4',
        difficulty: 'Hard',
        question: 'Which JOIN returns all matching rows from both tables?',
        options: ['LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'INNER JOIN'],
        correctAnswer: 2,
    },
    {
        id: '6',
        chapter: 'Chapter 5',
        difficulty: 'Medium',
        question: 'Which key uniquely identifies a record?',
        options: ['Foreign Key', 'Candidate Key', 'Primary Key', 'Composite Key'],
        correctAnswer: 2,
    },
    {
        id: '7',
        chapter: 'Chapter 5',
        difficulty: 'Medium',
        question: 'What does DBMS stand for?',
        options: [
            'Database Management System',
            'Data Backup Management System',
            'Database Monitoring Service',
            'Data Base Machine System',
        ],
        correctAnswer: 0,
    },
    {
        id: '8',
        chapter: 'Chapter 6',
        difficulty: 'Hard',
        question: 'Normalization reduces?',
        options: [
            'Data redundancy',
            'Storage size',
            'Network traffic',
            'CPU usage',
        ],
        correctAnswer: 0,
    },
    {
        id: '9',
        chapter: 'Chapter 6',
        difficulty: 'Medium',
        question: 'Which normal form removes partial dependency?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctAnswer: 1,
    },
    {
        id: '10',
        chapter: 'Chapter 7',
        difficulty: 'Hard',
        question: 'ACID stands forcorrectAnswer?',
        options: [
            'Atomicity, Consistency, Isolation, Durability',
            'Accuracy, Consistency, Integrity, Durability',
            'Atomicity, Control, Isolation, Durability',
            'Atomicity, Consistency, Integrity, Dependency',
        ],
        correctAnswer: 0,
    },
];


const fetchQuizData = async (): Promise<QuizData[]> => {
    // Simulate a network request delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Return the quiz data
    return QUIZ_DATA;
};

export const GameControl = () => {

    const currentQuestionIndex = useQuizNavigationStore(state => state.currentQuestionIndex);

    const pagerRef = useRef<PagerView>(null);
    const [quizData, setQuizData] = useState<QuizData[]>([]);
    const [isOpen, setIsOpen] = useState(false);


    const initializeQuiz = (length: number) => {
        reset(300);
        start();
        setDefaultNavigations(length);
    }

    useEffect(() => {
        const loadQuizData = async () => {
            const data = await fetchQuizData();
            setQuizData(data);
            initializeQuiz(data.length);
        };

        loadQuizData();
    }, []);


    const handleNext = async () => {
        if (currentQuestionIndex === quizData.length - 1) {
            stop();
            setIsOpen(true);
            return;
        }

        pagerRef.current?.setPage(
            currentQuestionIndex + 1
        );
    };

    if (quizData.length === 0) {
        return (
            <View className="h-full w-full flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View className="h-full w-full px-4 py-4">
            <QuizGameHeader currentQuestion={currentQuestionIndex + 1} />

            <PagerView
                ref={pagerRef}
                style={{ flex: 1 }}
                initialPage={0}
                offscreenPageLimit={1}
                overdrag={false}
                onPageSelected={(e) => setCurrentQuestionIndex(e.nativeEvent.position)}
                pageMargin={20}

            >
                {quizData.map((quiz, index) => (
                    <QuizOptionsSectionMemo
                        key={quiz.id}
                        questionIndex={index}
                        {...quiz}
                    />
                ))}
            </PagerView>

            <QuizFooter
                currentQuestion={currentQuestionIndex + 1}
                onPress={handleNext}
                hasAnswered={true}
            />
            <Dialog isOpen={isOpen} animation={'disable-all'}>
                <Dialog.Portal>
                    <Dialog.Overlay className='bg-black/50' />
                    <Dialog.Content className='p-0'>
                        <QuizTimeoutModal />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>
        </View>
    );
};