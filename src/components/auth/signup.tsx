
import { useState } from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormValues, signupSchema } from "@/utils/validate/auth";
import { Input, PressableFeedback, TextField } from "heroui-native";
import { Octicons } from "@expo/vector-icons";
import { getCommonIcon } from "../lib/icon";
import If from "../lib/if";
import { Button } from "../ui/button";
import { Wrapper } from "./wrapper";

type SignupFormProps = {
    onSubmit: (values: Omit<SignupFormValues, "confirmPassword">) => Promise<void>;
};


export const SignupForm = ({ onSubmit }: SignupFormProps) => {
    const [serverError, setServerError] = useState("");

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const submitForm = async (values: SignupFormValues) => {
        setServerError("");

        try {
            await onSubmit({
                name: values.name.trim(),
                email: values.email.trim(),
                password: values.password,
            });
        } catch {
            setServerError("Unable to create your account. Please try again.");
        }
    };

    const RenderField = (
        name: keyof SignupFormValues,
        label: string,
        placeholder: string,
        options: {
            keyboard?: "default" | "email-address";
            autoComplete?: "name" | "email" | "new-password";
            autoCapitalize?: "none" | "words";
        } = {},
    ) => {

        const { Icon, name: iconName } = getCommonIcon(
            name === "name" ? "user" :
                name === "email" ? "email" : "lock"
        );

        const [showPassword, setShowPassword] = useState(false);

        return (
            <View className="gap-2">
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField isRequired>
                            <View className="w-full flex-row items-center">
                                <Input
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    placeholder={placeholder}
                                    placeholderTextColor="#888888"
                                    secureTextEntry={(name === "name" || name === "email") ? false : showPassword}
                                    keyboardType={options.keyboard ?? "default"}
                                    autoComplete={options.autoComplete}
                                    autoCapitalize={options.autoCapitalize ?? "none"}
                                    autoCorrect={false}
                                    editable={!isSubmitting}
                                    accessibilityLabel={label}
                                    className="flex-1 px-10 rounded-full text-black/80 font-poppins-medium text-xs focus:border-primary bg-foreground border border-border-light"
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
                    )}
                />
            </View >
        );
    };

    return (
        <Wrapper authIs="signup">
            {RenderField("name", "Full name", "Enter your full name", {
                autoComplete: "name",
                autoCapitalize: "words",
            })}

            {RenderField("email", "Email address", "you@example.com", {
                keyboard: "email-address",
                autoComplete: "email",
            })}

            {RenderField("password", "Password", "Create a password", {
                autoComplete: "new-password",
            })}

            {RenderField(
                "confirmPassword",
                "Confirm password",
                "Re-enter your password",
                {
                    autoComplete: "new-password",
                },
            )}

            <Button
                // title="SIGN IN"
                title={"CREATE ACCOUNT"}
                // onPress={handleSubmit(submitForm)}
                variant="primary"
                theme="light"
                isLoading={isSubmitting}
                disabled={!errors || isSubmitting}
                fullWidth
            />
        </Wrapper>
    );
}


