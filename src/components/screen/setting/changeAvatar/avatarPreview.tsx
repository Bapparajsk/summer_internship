
import { View, Text } from "react-native";
import { ProfileEmojiName, getEmoji } from "../../profile/emoji";

type AvatarPreviewProps = {
    emojiName: ProfileEmojiName;
};

export function AvatarPreview({
    emojiName,
}: AvatarPreviewProps) {

    const { background, emoji } = getEmoji(emojiName);

    return (
        <View>
            {/* Live preview */}
            <View className="items-center justify-center px-4 pb-5 pt-4">
                <View className="mb-3 flex-row items-center gap-2">
                    <Text className="font-poppins-medium text-[10px] tracking-[1px] text-text-tertiary uppercase">
                        Profile Preview
                    </Text>
                    <View className="h-1.5 w-1.5 rounded-full bg-success" />
                </View>

                <View className="items-center">
                    <View className="absolute -inset-2 rounded-[38px]" style={{ backgroundColor: background + "1f" }} />

                    <View className="rounded-[24px]">
                        <View className='size-22 rounded-[30px] items-center justify-center' style={{ backgroundColor: background }}>
                            <Text className='text-4xl'>
                                {emoji}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
