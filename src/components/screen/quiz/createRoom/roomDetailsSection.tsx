import { View, Text } from 'react-native';
import { InputGroup, PressableFeedback, TextArea, TextField } from 'heroui-native';
import { FontAwesome6 } from '@expo/vector-icons';


type Props = {
    roomName: string;
    description: string;
    onRoomNameChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
};

export const RoomDetailsSection = ({
    roomName,
    description,
    onRoomNameChange,
    onDescriptionChange,
}: Props) => {
    return (
        <View className="gap-5">
            {/* Header */}
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                    <FontAwesome6 name="door-open" size={20} color="#5CC6E2" />
                    <Text className="font-poppins-semibold text-base text-text-primary">
                        Room Details
                    </Text>
                </View>
            </View>

            {/* Room Name */}
            <View className="gap-1.5">
                <View className="flex-row items-center justify-between">
                    <Text className="font-poppins-medium text-[13px] text-text-primary">
                        Room Name <Text className="text-primary">*</Text>
                    </Text>

                    <Text className="font-poppins-medium text-[10px] text-text-tertiary">
                        {roomName.length}/32
                    </Text>
                </View>

                <InputGroup>
                    <InputGroup.Input
                        value={roomName}
                        onChangeText={onRoomNameChange}
                        isInvalid={roomName.trim().length === 0}
                        placeholder="e.g. Weekend Tech Showdown"
                        placeholderTextColor="rgba(255,255,255,0.35)"
                        maxLength={32}
                        autoCapitalize="sentences"
                        className="min-h-12.5 flex-1 bg-white/5 font-poppins-medium text-xs rounded-full border-border text-text-primary"
                    />
                    <InputGroup.Suffix>
                        <PressableFeedback className='border border-border p-2 rounded-full'>
                            <FontAwesome6 name="wand-magic-sparkles" size={12} color="#5cc6e2" />
                        </PressableFeedback>
                    </InputGroup.Suffix>
                </InputGroup>
            </View>

            {/* Description */}
            <View className="gap-1.5">
                <Text className="font-poppins-medium text-[13px] text-text-secondary">
                    Description{' '}
                    <Text className="text-[11px] text-text-tertiary">(Optional)</Text>
                </Text>

                <TextField>
                    <TextArea
                        value={description}
                        onChangeText={onDescriptionChange}
                        placeholder="Algorithms, C++ & System Design showdown with the squad"
                        placeholderTextColor="rgba(255,255,255,0.35)"
                        numberOfLines={6}
                        multiline
                        textAlignVertical="top"
                        className="min-h-19 rounded-xl border border-border bg-surface-container px-4 py-3 font-poppins-light text-[13px] leading-5 text-text-primary"
                    />
                </TextField>
            </View>
        </View>
    );
};
