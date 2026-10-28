import { ScreenWrapper } from '@/components/screen'
import { 
    RoomInfoHeader, 
    BottomContent, 
    Header, 
    LiveUserList, 
    ParticipantArena, 
    type Participant, 
} from '@/components/screen/quiz/waitingRoom';
import { Link } from 'expo-router';
import { Button } from 'heroui-native';


export const tempParticipantArenaData = {
    currentUserId: "user-1",

    totalPlayers: 12,
    readyCount: 8,
    isLoading: false,

    participants: [
        {
            id: "user-1",
            name: "Bapparaj",
            isYou: true,
            status: "ready",
            avatar: null,
        },
        {
            id: "user-2",
            name: "Ayon",
            status: "ready",
        },
        {
            id: "user-3",
            name: "Rana",
            status: "ready",
        },
        {
            id: "user-4",
            name: "Subhasis",
            status: "waiting",
        },
        {
            id: "user-5",
            name: "Rohit",
            status: "ready",
        },
        {
            id: "user-6",
            name: "Arjun",
            isHost: true,
            status: "ready",
        },
        {
            id: "user-7",
            name: "Maya",
            status: "ready",
        },
        {
            id: "user-8",
            name: "Ryan",
            status: "waiting",
            avatar: null,
        },
        {
            id: "user-9",
            name: "Ava",
            status: "ready",
        },
        {
            id: "user-10",
            name: "Noah",
            status: "offline",
        },
        {
            id: "user-11",
            name: "Isha",
            status: "waiting",
            avatar: null,
        },
        {
            id: "user-12",
            name: "Leo",
            status: "ready",
        },
    ] satisfies Participant[],
};
export default function WaitingRoom() {

    return (
        <ScreenWrapper
            path={"quiz/waiting-room"}
            showFooter={false} 
            paddingTop={10}
            bottomContainer={<BottomContent />}
        >
            <Header />
            <RoomInfoHeader
                hostName="Bapparaj"
                title="Data Structures Challenge"
                category="DSA & Algorithms"
                questionCount={20}
                durationMinutes={10}
                difficulty="Intermediate"
            />
            <ParticipantArena
                {...tempParticipantArenaData}
                onParticipantPress={(participant) => {
                    console.log("Selected:", participant.name);
                }}
                // isLoading
            />
            <LiveUserList isHost={true} />
            <Link asChild href={"/quiz/game"}>
                <Button>
                    goto game
                </Button>
            </Link>
        </ScreenWrapper>
    )
}