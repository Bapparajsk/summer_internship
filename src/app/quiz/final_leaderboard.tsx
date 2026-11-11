import { SettingScreenWrapper } from '@/components/screen/setting'
import { useRouter } from 'expo-router'
import { EsportsPodium, MOCK_PODIUM_PLAYERS } from '@/components/screen/quiz/FinalLeaderboard';

export default function FinalLeaderboardScreen() {

    const router = useRouter();

    return (
        <SettingScreenWrapper
            path='quiz/final_leaderboard'
            backTitle='Explore'
            header={{
                title: 'Final Standings',
                subtitle: 'Computational systems sprint concluded. Official results are locked.'
            }}
            onBackPress={() => {
                router.dismissTo("/explore");
            }}
        >
            <EsportsPodium
                players={MOCK_PODIUM_PLAYERS}
            />
        </SettingScreenWrapper>
    )
}