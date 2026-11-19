import { RoomDetailsSection, RoomAccessCode, ParticipantsSection, QuizSourceSection, Difficulty, QuestionFiltersSection, QuestionOrderSection, QuestionOrder, GameRulesButton, RoomBlueprint } from '@/components/screen/quiz/createRoom';
import { CreateRoomButton } from '@/components/screen/quiz/createRoom/createRoomButton';
import { SettingScreenWrapper } from '@/components/screen/setting';
import { useRouter } from 'expo-router';
import { Separator } from 'heroui-native';
import { useState } from 'react';


const TEMP_ROOM_BLUEPRINT = {
    room_name: "Computer Register Core etc...",
    visibility: 'private' as const,
    capacity: 8,
    category: 'Programming',
    subjects: ['C++ Programming'],
    questionOrder: 'randomized' as const,
    questionCount: 10,
    difficulty: 'medium',
    timePerQuestion: 20,
    baseScore: 100,
    negativeMarking: true,
    penalty: 25,
    showCorrectAnswer: true,
    shuffleAnswers: true,
};

export default function CreateRoomScreen() {

    const router = useRouter();

    const [roomName, setRoomName] = useState('Weekend Quiz Battle');
    const [description, setDescription] = useState(
        'Algorithms, C++ & System Design showdown with the squad',
    );

    const [password, setPassword] = useState('QF-7392');
    const [playerLimit, setPlayerLimit] = useState(8);

    const [difficulty, setDifficulty] = useState<Difficulty>('Medium');
    const [questionCount, setQuestionCount] = useState(10);

    const [value, setValue] = useState<QuestionOrder>("randomized");

    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const createRoom = async () => {
        return new Promise((res, rej ) => {
            setTimeout(() => {
                res("okay")
            }, 3000)
        }); 
    }

    const handleCreateRoom = async () => {
        if (isLoading || isComplete) return;

        try {
            setIsLoading(true);

            await createRoom();

            setIsLoading(false);
            setIsComplete(true);

            setTimeout(() => {
                // router.replace('/room/waiting-room');
            }, 1400);
        } catch (error) {
            setIsLoading(false);
            // Show your error message.
        }
    };


    return (
        <SettingScreenWrapper
            path='quiz/final_leaderboard'
            backTitle='Explore'
            header={{
                title: 'Create Room',
                subtitle: 'Configure real-time battle rules, visibility & quiz pool.'
            }}
            onBackPress={() => {
                router.dismissTo("/explore");
            }}
        >
            <RoomDetailsSection
                roomName={roomName}
                description={description}
                onRoomNameChange={setRoomName}
                onDescriptionChange={setDescription}
            />
            <RoomAccessCode
                password={password}
                onPasswordChange={setPassword}
                onGenerate={() => {
                    // setPassword(generateRoomName)
                }}
            />
            <Separator />
            <ParticipantsSection
                value={playerLimit}
                onChange={setPlayerLimit}
            />
            <Separator />
            <QuizSourceSection questionPoolCount={6} />
            <Separator />

            <QuestionFiltersSection
                difficulty={difficulty}
                questionCount={questionCount}
                availableQuestions={900}
                onDifficultyChange={setDifficulty}
                onQuestionCountChange={setQuestionCount}
            />
            <QuestionOrderSection
                value={value}
                onChange={setValue}
            />
            <GameRulesButton
                points={100}
                shuffleAnswers={true}
                timeLimit={20}
            />
            <Separator />
            <RoomBlueprint {...TEMP_ROOM_BLUEPRINT} />
            <CreateRoomButton
                onPress={handleCreateRoom}
                loading={isLoading}
                success={isComplete}
                disabled={false}
            />
        </SettingScreenWrapper>
    )
}



