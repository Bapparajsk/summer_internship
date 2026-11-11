import { ScreenWrapper } from '@/components/screen'
import { CompletionHero, CompletionAtmosphere, PerformanceCard, ParticipantUser, Participant } from '@/components/screen/quiz/completionWaitingRoom'
import { WaitingExperience } from '@/components/screen/quiz/completionWaitingRoom/waitingExperience';
import { RoomInfoHeader } from '@/components/screen/quiz/waitingRoom'
import { View } from 'react-native'

const participants: Participant[] = [
    {
        id: '1',
        name: 'Bapparaj',
        avatar: "bear",
        status: 'submitted',
        duration: '04:32',
        isCurrentUser: true,
    },
    {
        id: '2',
        name: 'Arjun Das',
        avatar: 'cool',
        status: 'submitted',
        duration: '04:55',
    },
    {
        id: '3',
        name: 'Rahul Sen',
        avatar: 'frog',
        status: 'submitted',
        currentQuestion: 18,
        totalQuestions: 20,
    },
    {
        id: '4',
        name: 'Anik Roy',
        avatar: 'ghost',
        status: 'submitted',
        duration: '05:10',
    },
    {
        id: '5',
        name: 'Sayan Paul',
        avatar: 'shy',
        status: 'submitted',
        currentQuestion: 16,
        totalQuestions: 20,
    },
    {
        id: '6',
        name: 'Riya Ghosh',
        avatar: 'sparkle',
        status: 'submitted',
    },
];

export default function CompletionWaitingRoomScreen() {
    return (
        <ScreenWrapper
            path={"quiz/waiting-room"}
            showFooter={false}
            paddingTop={10}
        >
            <RoomInfoHeader
                hostName="Bapparaj"
                title="Data Structures Challenge"
                category="DSA & Algorithms"
                questionCount={20}
                durationMinutes={10}
                difficulty="Intermediate"
            />
            <View className="relative overflow-hidden rounded-[38px] border border-border bg-surface-container-low">

                {/* Animated background */}
                <CompletionAtmosphere />

                {/* Foreground content */}
                <View className="z-10 items-center">
                    <CompletionHero
                        percentage={100}
                        title="You're all done!"
                        description="Your answers have been submitted successfully."
                    />
                </View>
            </View>
            <PerformanceCard
                score={18}
                totalQuestions={20}
                correct={18}
                incorrect={2}
                duration="04:32"
                xp={360}
                isProvisional
            />
            <ParticipantUser
                participants={participants}
                onViewLeaderboard={() => {}}
            />
            <WaitingExperience />
        </ScreenWrapper>
    )
}