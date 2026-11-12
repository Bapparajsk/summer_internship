import { RoomDetailsSection, RoomAccessCode, ParticipantsSection, QuizSourceSection } from '@/components/screen/quiz/createRoom';
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
        </SettingScreenWrapper>
    )
}
