import {View } from 'react-native'
import { useState } from 'react'
import { Input, PressableFeedback, TextField, InputProps } from 'heroui-native'
import If from '../lib/if'
import { Octicons } from '@expo/vector-icons'
import { getCommonIcon } from '../lib/icon'

export type AuthInputProps = InputProps & {
    name: string;
}

export const AuthInput = ({ name, ...inputProps }: AuthInputProps) => {

    const [showPassword, setShowPassword] = useState(false);

    const { Icon, name: iconName } = getCommonIcon(
            name === "name" ? "user" :
                name === "email" ? "email" : "lock"
        );

    return (
        <TextField isRequired>
            <View className="w-full flex-row items-center">
                <Input
                    className="flex-1 px-10 rounded-full text-black/80 font-poppins-medium text-xs focus:border-primary bg-foreground border border-border-light"
                    secureTextEntry={(name === "name" || name === "email") ? false : showPassword}
                    {...inputProps}
                />
                <View className="absolute left-3.5">
                    <Icon
                        name={iconName}
                        size={16}
                        color={"rgba(0, 0, 0, 0.50)"}
                    />
                </View>
                <PressableFeedback
                    className="absolute right-4"
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <If condition={Boolean(name === "password" || name === "confirmPassword")}>
                        <If.Then>

                            <Octicons
                                name={showPassword ? 'eye' : 'eye-closed'}
                                size={16}
                                color={"rgba(0, 0, 0, 0.50)"}
                            />
                        </If.Then>
                    </If>
                </PressableFeedback>
            </View>
        </TextField>
    )
}