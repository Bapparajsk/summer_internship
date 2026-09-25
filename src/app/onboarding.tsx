import { Onboarding } from "@/components/onboarding";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnBoarding() {
    return (
        <SafeAreaView className="flex-1" >
            {/* <View className="flex-1"> */}
                <Onboarding />
                
            {/* </View> */}
            {/* <Text className="font-poppins-medium text-white">main</Text> */}
        </SafeAreaView>
    );
}
