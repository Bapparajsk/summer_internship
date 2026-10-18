import { RoomInfoHeader } from '@/components/screen/quiz/waitingRoom/roomInfoHeader'
import { ScreenWrapper, BOTTOM_CONTAINER_Z_INDEX } from '@/components/screen'
import { ParticipantArena, Participant } from '@/components/screen/quiz/waitingRoom/participantArena'
import { LiveUser, LiveUserList } from '@/components/screen/quiz/waitingRoom/liveUserList';
import { Button } from 'heroui-native';
import { NativeBottomContainer } from '@/components/ui/nativeBottomContainer';

const users: LiveUser[] = [
    {
        id: "1",
        name: "Arjun",
        joinedAt: "Just now",
        isYou: true,
    },
    {
        id: "2",
        name: "Sarah",
        avatar: "https://i.pravatar.cc/150?img=47",
        joinedAt: "12s ago",
    },
    {
        id: "3",
        name: "Devon",
        avatar: "https://i.pravatar.cc/150?img=12",
        joinedAt: "40s ago",
    },
    {
        id: "11",
        name: "Arjun",
        avatar: "https://i.pravatar.cc/150?img=13",
        joinedAt: "Just now",
        isYou: true,
    },
    {
        id: "12",
        name: "Sarah",
        avatar: "https://i.pravatar.cc/150?img=47",
        joinedAt: "12s ago",
    },
    {
        id: "13",
        name: "Devon",
        avatar: "https://i.pravatar.cc/150?img=12",
        joinedAt: "40s ago",
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
            name: "Sarah",
            status: "ready",
            avatar: "https://i.pravatar.cc/150?img=47",
        },
        {
            id: "user-3",
            name: "Devon",
            status: "ready",
            avatar: "https://i.pravatar.cc/150?img=12",
        },
        {
            id: "user-4",
            name: "Elena",
            status: "waiting",
            avatar: "https://i.pravatar.cc/150?img=44",
        },
        {
            id: "user-5",
            name: "Kenji",
            status: "ready",
            avatar: "https://i.pravatar.cc/150?img=11",
        },
        {
            id: "user-6",
            name: "Arjun",
            isHost: true,
            status: "ready",
            avatar: "https://i.pravatar.cc/150?img=13",
        },
        {
            id: "user-7",
            name: "Maya",
            status: "ready",
            avatar: "https://i.pravatar.cc/150?img=49",
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
            avatar: "https://i.pravatar.cc/150?img=45",
        },
        {
            id: "user-10",
            name: "Noah",
            status: "offline",
            avatar: "https://i.pravatar.cc/150?img=14",
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
            avatar: "https://i.pravatar.cc/150?img=52",
        },
    ] satisfies Participant[],
};
export default function WaitingRoom() {

    return (
        <ScreenWrapper
            path={"quiz/waiting-room"}
            showFooter={false} paddingTop={10}
            bottomContainer={
                <NativeBottomContainer zIndex={BOTTOM_CONTAINER_Z_INDEX}>
                    <Button>
                        click me
                    </Button>
                </NativeBottomContainer>
            }
        >
            <RoomInfoHeader
                hostName="Arjun"
                hostAvatar="https://example.com/avatar.jpg"
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
            />
            <LiveUserList users={users} />
            
        </ScreenWrapper>
    )
}