import { ScreenWrapper } from '@/components/screen'
import { CompletionHero, CompletionAtmosphere } from '@/components/screen/quiz/completionWaitingRoom'
import { RoomInfoHeader } from '@/components/screen/quiz/waitingRoom'
import { View } from 'react-native'

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
        </ScreenWrapper>
    )
}