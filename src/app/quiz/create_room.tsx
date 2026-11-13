import { RoomDetailsSection, RoomAccessCode, ParticipantsSection, QuizSourceSection, Difficulty, QuestionFiltersSection, QuestionOrderSection, QuestionOrder } from '@/components/screen/quiz/createRoom';
import { SettingScreenWrapper } from '@/components/screen/setting';
import { useRouter } from 'expo-router';
import { Separator } from 'heroui-native';
import { useState } from 'react';
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
        </SettingScreenWrapper>
    )
}
