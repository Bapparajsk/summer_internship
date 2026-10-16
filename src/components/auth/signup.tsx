
import { useState } from "react";
import {
    Pressable,
    Text,
    View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormValues, signupSchema } from "@/utils/validate/auth";
import { Input, PressableFeedback, TextField } from "heroui-native";
import { Octicons } from "@expo/vector-icons";
import { getCommonIcon } from "../lib/icon";
import If from "../lib/if";
import { Button } from "../ui/button";
import { SocialLogin } from "./socialLogin";

type SignupFormProps = {
    onSubmit: (values: Omit<SignupFormValues, "confirmPassword">) => Promise<void>;
};


export function SignupForm({ onSubmit }: SignupFormProps) {
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
        <View className="flex-1 pt-8 justify-between">
            {/* Title */}
            <View className="my-auto items-center px-2">
                <Text className="font-poppins-semibold text-xl tracking-tight text-text-primary">
                    Create Account
                    {/* Log in */}
                </Text>

                <Text className="mt-2 max-w-70 text-center font-poppins-medium text-xs leading-4 text-text-secondary">
                    Create a new account to get started and enjoy seamless access to
                    our features.
                    {/* Enter your email and password to securely access your account. */}
                </Text>
            </View>

            <View className="relative px-5 h-auto py-10 bg-[rgb(242,242,242)]"
                style={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}
            >
                <View className="absolute top-2 left-0 right-0 items-center">
                    <View className="w-20 h-1 rounded-full bg-black/70" />
                </View>

                <View className="flex-1 justify-center">
                    <View className="mb-6">
                        <View className="gap-y-4 mt-4">
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

                        </View>

                        {/* Sign in link */}
                        <View className="mt-6 flex-row flex-wrap items-center justify-center">
                            <Text className="font-poppins-medium text-xs text-black/60">
                                Already have an account?
                            </Text>

                            <Pressable
                                hitSlop={6}
                                accessibilityRole="link"
                                className="ml-1 px-1 py-1"
                            >
                                <Text className="font-poppins-semibold text-xs text-primary">
                                    Sign in here
                                    {/* sign up here */}
                                </Text>
                            </Pressable>
                        </View>

                        {/* Divider */}
                        <View className="my-6 flex-row items-center">
                            <View className="h-px flex-1 bg-surface-container-highest" />

                            <Text className="mx-3 font-poppins-semibold text-[11px]">
                                Or continue with
                            </Text>

                            <View className="h-px flex-1 bg-surface-container-highest" />
                        </View>

                        {/* Social login */}
                        <SocialLogin />
                    </View>
                </View>
            </View>
        </View>
    );
}

