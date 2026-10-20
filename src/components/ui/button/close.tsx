import { LinearTransition } from "react-native-reanimated";
import { MotionButton } from "./motionButton";
import If from "@/components/lib/if";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { CloseButtonProps } from "./type";
import { PressableFeedbackProps } from "heroui-native";

export const CloseButton = ({ isSaved = true, saveTitle = "Save changes", ...rest }: CloseButtonProps & PressableFeedbackProps) => {
    return (
        <MotionButton
            layout={LinearTransition.springify().stiffness(200).mass(0.5).damping(20)}
            className='w-auto h-auto'
            {...rest}
        >
            <If condition={isSaved}>
                <If.Then>
                    <View className='size-8 items-center justify-center'>
                        <Feather name={"x-circle"} size={16} color={"#8FA5B8"} />
                    </View>
                </If.Then>
                <If.Else>
                    <View className='h-8 flex-row items-center justify-center px-2 gap-1'>
                        <Feather name={"check-circle"} size={16} color={"#4ADE80"} />
                        <Text className='text-[10px] leading-normal font-poppins-medium text-success'>
                            {saveTitle}
                        </Text>
                    </View>
                </If.Else>
            </If>

        </MotionButton>
    );
}