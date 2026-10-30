import { reset, start, stop, setCurrentQuestionIndex, setDefaultNavigations, useQuizNavigationStore } from '@/store/quiz';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { QuizFooter } from './footer';
import { QuizGameHeader } from './header';
import QuizOptionsSectionMemo from "./optionsSection";
import { QuizTimeoutModal } from './timeoutModal';
import { Dialog } from 'heroui-native';
import { QUIZ_DATA, QuizData } from './temp-data';


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

    const handlePrev = () => {
        if (currentQuestionIndex <= 0) return;

        pagerRef.current?.setPage(currentQuestionIndex - 1);
    };

    if (quizData.length === 0) {
        return (
            <View className="h-full w-full flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View className="h-full w-full px-4 pb-4">
            <QuizGameHeader
                topic={"Linux"}
                icon='os'
                difficulty={"medium"}
            />

            <PagerView
                ref={pagerRef}
                style={{ flex: 1 }}
                initialPage={0}
                offscreenPageLimit={1}
                overdrag={false}
                onPageSelected={(e) => setCurrentQuestionIndex(e.nativeEvent.position)}
                pageMargin={20}
                scrollEnabled={false}
            >
                {quizData.map((quiz, index) => (
                    <QuizOptionsSectionMemo
                        key={quiz.id}
                        questionIndex={index}
                        quiz={quiz}
                        testID="pager-view-content"
                    />
                ))}
            </PagerView>

            <QuizFooter
                currentQuestion={currentQuestionIndex + 1}
                onNext={handleNext}
                onPrev={handlePrev}
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