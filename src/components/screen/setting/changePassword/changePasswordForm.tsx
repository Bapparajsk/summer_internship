
import { useState } from "react";
import {
    View,
    Text,
    Pressable,
    ActivityIndicator,
} from "react-native";
import {
    useForm,
    Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    changePasswordSchema,
    type ChangePasswordFormValues,
} from "@/utils/validate/changePassword";
import { AuthInput } from "@/components/auth/input";
import { Button, PressableFeedback } from "heroui-native";
function getPasswordStrength(password: string) {
    if (!password) return 0;

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
}

type ChangePasswordFormProps = {
    onSubmitPassword: (
        values: ChangePasswordFormValues
    ) => Promise<void>;
};

export function ChangePasswordForm({
    onSubmitPassword,
}: ChangePasswordFormProps) {
    const [submitting, setSubmitting] = useState(false);

    const {
        control,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onBlur",
        reValidateMode: "onChange",
    });

    const newPassword = watch("newPassword");
    const strength = getPasswordStrength(newPassword);

    const submit = handleSubmit(async (values) => {
        setSubmitting(true);
        clearErrors("root");

        try {
            await onSubmitPassword(values);
            reset();
        } catch (error) {
            // Map server errors to the appropriate field.
            setError("currentPassword", {
                type: "server",
                message: "Unable to verify your current password.",
            });
        } finally {
            setSubmitting(false);
        }
    });

    const RenderField = (
        name: keyof ChangePasswordFormValues,
        label: string,
        placeholder: string,
        options: {
            keyboard?: "default" | "email-address";
            autoComplete?: "name" | "email" | "new-password";
            autoCapitalize?: "none" | "words";
        } = {},
    ) => {

        return (
            <View className="gap-2">
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <AuthInput
                            name={"password"}
                            label={label}
                            error={errors[name]?.message}
                            theme="dark"

                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            placeholderTextColor="#888888"
                            keyboardType={options.keyboard ?? "default"}
                            autoComplete={options.autoComplete}
                            autoCapitalize={options.autoCapitalize ?? "none"}
                            autoCorrect={false}
                            editable={!isSubmitting}
                            accessibilityLabel={label}

                            className="bg-white/4 border-border text-text-secondary"
                        />
                    )}
                />
            </View >
        );
    };

    return (
        <View className="gap-5">
            {RenderField("currentPassword", "CURRENT PASSWORD", "Enter current password", {
            })}

            <View className="gap-2">
                {RenderField("newPassword", "NEW PASSWORD", "Enter new password", {
                })}

                {!!newPassword && (
                    <View className="gap-1.5 px-1">
                        <View className="flex-row gap-1">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <View
                                    key={item}
                                    className={`h-1 flex-1 rounded-full ${strength >= item
                                        ? "bg-primary"
                                        : "bg-surface-container-high"
                                        }`}
                                />
                            ))}
                        </View>

                        <Text className="font-poppins-light text-[10px] text-text-secondary">
                            {strength <= 2
                                ? "Weak password"
                                : strength <= 4
                                    ? "Moderate password"
                                    : "Strong password"}
                        </Text>
                    </View>
                )}
            </View>

            {RenderField("confirmPassword", "CONFIRM NEW PASSWORD", "Re-enter new password", {
                autoComplete: "new-password",
            })}

            {!!errors.root?.server && (
                <Text className="font-poppins-light text-[11px] text-danger">
                    {errors.root.server.message}
                </Text>
            )}

            <Button
                onPress={submit}
                isDisabled={isSubmitting || submitting}
                className="h-13 bg-primary"
                variant="outline"
            >
                {isSubmitting || submitting ? (
                    <ActivityIndicator color="#0D1117" />
                ) : (
                    <Text className="font-poppins-semibold text-[13px] text-background">
                        Update Password
                    </Text>
                )}
            </Button>
        </View>
    );
}
