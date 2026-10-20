import { ScreenWrapper } from '@/components/screen'
import { 
    RoomInfoHeader, 
    BottomContent, 
    Header, 
    LiveUserList, 
    ParticipantArena, 
    type Participant, 
    type LiveUser 
} from '@/components/screen/quiz/waitingRoom';

const users: LiveUser[] = [
    {
        id: "1",
        name: "Bapparaj",
        joinedAt: "Just now",
        isYou: true,
        isReady: true
    },
    {
        id: "2",
        name: "Rana",
        joinedAt: "Just now",
        isReady: true
    },
    {
        id: "3",
        name: "Ayon",
        joinedAt: "Just now",
        isReady: false
    },
    {
        id: "11",
        name: "Subhasis",
        joinedAt: "Just now",
        isReady: true
    },
    {
        id: "12",
        name: "Rohit",
        joinedAt: "Just now",
        isReady: true
    },
    {
        id: "13",
        name: "Akash",
        joinedAt: "Just now",
        isReady: true
    },
];


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
            <LiveUserList users={users} isHost={true} />
            
        </ScreenWrapper>
    )
}