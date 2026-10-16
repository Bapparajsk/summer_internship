import { Input, PressableFeedback, TextField } from 'heroui-native';
import { Ref, useState } from 'react';
import { View, Text, TextInput } from 'react-native'
import Octicons from '@expo/vector-icons/Octicons';
import { withUniwind } from 'uniwind';

export type AuthPasswordProps = {
    ref?: Ref<TextInput> | null
};

const StyledIonicons = withUniwind(Octicons);



export const AuthPassword = ({ ref }: AuthPasswordProps) => {

    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <TextField isRequired>
            <View className="w-full flex-row items-center">
                <Input
                    ref={ref}
                    value={password}
                    onChangeText={setPassword}
                    className="flex-1 px-10 font-poppins-medium text-xs focus:border-primary bg-background border border-white/30"
                    placeholder="Enter your password"
                    secureTextEntry={!isPasswordVisible}
                />
                <StyledIonicons
                    name="lock"
                    size={16}
                    className="absolute left-3.5 text-muted"
                    pointerEvents="none"
                />
                <PressableFeedback
                    className="absolute right-4"
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                    <StyledIonicons
                        name={isPasswordVisible ? 'eye' : 'eye-closed'}
                        size={16}
                        className="text-muted"
                    />
                </PressableFeedback>
            </View>
            {/* <Description>Password must be at least 6 characters</Description> */}
        </TextField>
    )
}