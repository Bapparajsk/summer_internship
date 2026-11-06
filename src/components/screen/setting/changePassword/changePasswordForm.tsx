
import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    ActivityIndicator,
} from "react-native";
import {
    useForm,
    Controller,
    type Control,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Lock,
    LockKeyhole,
    ShieldCheck,
    Eye,
    EyeOff,
    CircleAlert,
} from "lucide-react-native";

import {
    changePasswordSchema,
    type ChangePasswordFormValues,
} from "@/utils/validate/changePassword";

type PasswordFieldProps = {
    control: Control<ChangePasswordFormValues>;
    name: keyof ChangePasswordFormValues;
    label: string;
    placeholder: string;
    icon: React.ReactNode;
    error?: string;
    onChange?: () => void;
};

function PasswordField({
    control,
    name,
    label,
    placeholder,
    icon,
    error,
    onChange,
}: PasswordFieldProps) {
    const [visible, setVisible] = useState(false);

    return (
        <View className="gap-1.5">
            <Text className="ml-1 font-poppins-medium text-[11px] tracking-[0.5px] text-text-secondary">
                {label}
            </Text>

            <View
                className={`h-[52px] flex-row items-center rounded-2xl border bg-surface-container-low px-3 ${error ? "border-danger/50" : "border-border-subtle"
                    }`}
            >
                {icon}

                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange: handleChange, onBlur } }) => (
                        <TextInput
                            value={value}
                            onChangeText={(text) => {
                                handleChange(text);
                                onChange?.();
                            }}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            placeholderTextColor="#737D89"
                            secureTextEntry={!visible}
                            autoCapitalize="none"
                            autoCorrect={false}
                            className="ml-3 flex-1 font-poppins-light text-[13px] text-text-primary"
                        />
                    )}
                />

                <Pressable
                    onPress={() => setVisible((prev) => !prev)}
                    hitSlop={10}
                    accessibilityRole="button"
                    accessibilityLabel={visible ? "Hide password" : "Show password"}
                >
                    {visible ? (
                        <EyeOff size={19} color="#8FA5B8" />
                    ) : (
                        <Eye size={19} color="#8FA5B8" />
                    )}
                </Pressable>
            </View>

            {!!error && (
                <View className="ml-1 flex-row items-center gap-1.5">
                    <CircleAlert size={13} color="#F87171" />
                    <Text className="font-poppins-light text-[10px] text-danger">
                        {error}
                    </Text>
                </View>
            )}
        </View>
    );
}

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

    return (
        <View className="gap-5">
            <PasswordField
                control={control}
                name="currentPassword"
                label="CURRENT PASSWORD"
                placeholder="Enter current password"
                icon={<Lock size={19} color="#8FA5B8" />}
                error={errors.currentPassword?.message}
            />

            <View className="gap-2">
                <PasswordField
                    control={control}
                    name="newPassword"
                    label="NEW PASSWORD"
                    placeholder="Enter new password"
                    icon={<LockKeyhole size={19} color="#8FA5B8" />}
                    error={errors.newPassword?.message}
                />

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

            <PasswordField
                control={control}
                name="confirmPassword"
                label="CONFIRM NEW PASSWORD"
                placeholder="Re-enter new password"
                icon={<ShieldCheck size={19} color="#8FA5B8" />}
                error={errors.confirmPassword?.message}
            />

            {!!errors.root?.server && (
                <Text className="font-poppins-light text-[11px] text-danger">
                    {errors.root.server.message}
                </Text>
            )}

            <Pressable
                onPress={submit}
                disabled={isSubmitting || submitting}
                className="h-[52px] flex-row items-center justify-center gap-2 rounded-xl bg-primary active:opacity-80 disabled:opacity-50"
            >
                {isSubmitting || submitting ? (
                    <ActivityIndicator color="#0D1117" />
                ) : (
                    <Text className="font-poppins-semibold text-[13px] text-background">
                        Update Password
                    </Text>
                )}
            </Pressable>
        </View>
    );
}
