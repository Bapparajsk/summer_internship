import { Text, View } from 'react-native'
import { useState } from 'react'
import { Input, PressableFeedback, TextField, FieldError, InputProps, Label, cn } from 'heroui-native'
import If from '../lib/if'
import { Octicons } from '@expo/vector-icons'
import { getCommonIcon } from '../lib/icon'
import { CircleAlert } from 'lucide-react-native'

export type AuthInputProps = InputProps & {
    name: string;
    label?: string;
    error?: string;
    theme?: "light" | "dark";
}

export const AuthInput = ({ name, label, error, theme = "light", className, ...inputProps }: AuthInputProps) => {

    const [showPassword, setShowPassword] = useState(true);

    const { Icon, name: iconName } = getCommonIcon(
        name === "name" ? "user" :
            name === "email" ? "email" : "lock"
    );

    let color = theme === "light" ? "rgba(0, 0, 0, 0.50)" : "rgba(225, 225, 225, 0.50)"
    color = Boolean(error) ? "#f87171" : color;

    return (
        <TextField isRequired isInvalid={Boolean(error)}>
            <If condition={Boolean(label)}>
                <If.Then>
                    <Label>
                        <Text className="ml-1 font-poppins-medium text-[11px] tracking-[0.5px] text-text-secondary">
                            {label}
                        </Text>

                    </Label>
                </If.Then>
            </If>
            <View className="w-full flex-row items-center">
                <Input
                    className={cn(
                        "flex-1 px-10 rounded-full text-black/80 font-poppins-medium text-xs bg-foreground border border-border-light",
                        className,
                        {
                            "text-danger border-danger bg-danger-soft": error
                        }
                    )}
                    secureTextEntry={(name === "name" || name === "email") ? false : showPassword}
                    isInvalid={Boolean(error)}
                    {...inputProps}
                />

                <View className="absolute left-3.5">
                    <Icon
                        name={iconName}
                        size={16}
                        color={color}
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
                                color={color}
                            />
                        </If.Then>
                    </If>
                </PressableFeedback>
            </View>
            <FieldError>
                <View className="ml-1 flex-row items-center gap-1.5">
                    <CircleAlert size={13} color="#F87171" />
                    <Text className="font-poppins-light text-[10px] text-danger">
                        {error}
                    </Text>
                </View>

            </FieldError>
        </TextField>
    )
}