import { GameControl } from "@/components/screen/quiz/game/control";
import { SafeAreaView } from "react-native-safe-area-context";


export default function GameScreen() {
    return (
        <SafeAreaView className="flex-1 relative">
            <GameControl />
        </SafeAreaView>
    );
}