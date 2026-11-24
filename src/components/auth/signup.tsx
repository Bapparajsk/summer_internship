
import { useRef, useState } from "react";
import { Text, View } from "react-native";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSignUp } from "@clerk/expo";
import { useRouter } from "expo-router";

import {
    PressableFeedback,
    useToast,
    type BottomSheetRef,
} from "heroui-native";

import { SignupFormValues, signupSchema } from "@/utils/validate/auth";
import { getAuthError } from "@/utils/auth/clerk-error";
import { maskEmail } from "@/utils/email";

import {
    OTP_RESEND_SECUND,
    useCountdown,
} from "@/hooks/auth/useCountdown";

import { Button } from "../ui/button";
import { ToastContainer, type ToastProps } from "../ui/toastContainer";

import { Wrapper } from "./wrapper";
import { AuthInput } from "./input";
import { OtpWrapper } from "./otp-wrapper";

// ----------------------------------
// Types
// ----------------------------------

type ParsedName = {
    firstName: string;
    lastName: string;
};

// ----------------------------------
// Utils
// ----------------------------------

export const parseUserName = (name: string): ParsedName => {
    const parts = name.trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) {
        return {
            firstName: "",
            lastName: "",
        };
    }

    if (parts.length === 1) {
        return {
            firstName: parts[0],
            lastName: "",
        };
    }

    return {
        firstName: parts[0],
        lastName: parts.slice(1).join(" "),
    };
};

// ----------------------------------
// Component
// ----------------------------------

export const SignupForm = () => {
    const { signUp } = useSignUp();
    const router = useRouter();
    const { toast } = useToast();

    const {
        remaining,
        isComplete,
        reset,
    } = useCountdown(OTP_RESEND_SECUND);

    const sheetRef = useRef<BottomSheetRef>(null);

    // OTP / signup states
    const [email, setEmail] = useState("");
    const [signupCreated, setSignupCreated] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const [isInvalidOtp, setIsInvalidOtp] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);

    // Form
    const {
        control,
        handleSubmit,
        setError,
        clearErrors,
        formState: {
            errors,
            isSubmitting,
            isValid,
        },
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

    // ----------------------------------
    // OTP Sheet
    // ----------------------------------

    const openOtpSheet = () => {
        sheetRef.current?.present();
    };

    const showToast = (props: ToastProps) => {
        toast.show({
            component(toastProps) {
                return (
                    <ToastContainer
                        {...props}
                        {...toastProps}
                        isError={props.variant === "danger"}
                    />
                );
            },
        });
    };

    // ----------------------------------
    // Error Handler
    // ----------------------------------

    const handleAuthError = (
        error: unknown,
        fallbackField?: "email" | "password" | "otp",
    ) => {
        const authError = getAuthError(error, fallbackField);

        if (authError.field === "email") {
            setError("email", {
                type: "server",
                message: authError.message,
            });
        }

        if (authError.field === "password") {
            setError("password", {
                type: "server",
                message: authError.message,
            });
        }

        showToast({
            icon: "alert",
            label: authError.label,
            description: authError.message,
            variant: "danger",
        });
    };

    // ----------------------------------
    // Send OTP
    // ----------------------------------

    const sendOTP = async () => {
        try {
            const result =
                await signUp.verifications.sendEmailCode();

            if (result.error) {
                handleAuthError(result.error, "otp");
                return false;
            }

            setOtpSent(true);
            setIsInvalidOtp(false);

            reset(OTP_RESEND_SECUND);

            return true;
        } catch (error) {
            handleAuthError(error, "otp");

            return false;
        }
    };

    // ----------------------------------
    // Signup Submit
    // ----------------------------------

    const submitForm = async ({
        name,
        email: rawEmail,
        password,
    }: SignupFormValues) => {
        clearErrors("email");
        clearErrors("password");

        // Already created an incomplete Clerk signup.
        // Retry OTP instead of creating the account again.
        if (signupCreated) {
            const sent = await sendOTP();

            if (sent) {
                openOtpSheet();
            }

            return;
        }

        const normalizedEmail = rawEmail.trim().toLowerCase();

        const { firstName, lastName } = parseUserName(name);

        try {
            const result = await signUp.password({
                firstName,
                lastName,
                emailAddress: normalizedEmail,
                password,
            });

            if (result.error) {
                handleAuthError(result.error);
                return;
            }

            // Clerk signup has been created.
            // Preserve this state even if OTP sending fails.
            setSignupCreated(true);
            setEmail(normalizedEmail);

            const sent = await sendOTP();

            if (sent) {
                openOtpSheet();
                return;
            }

            // Allow the user to retry sending OTP.
            // The incomplete signup is preserved.
            reset(0);
            openOtpSheet();

        } catch (error) {
            handleAuthError(error);
        }
    };

    const handleCreateAccount = () => {
        void handleSubmit(submitForm)();
    };

    // ----------------------------------
    // Verify OTP
    // ----------------------------------

    const handleVerify = async (otp: string) => {
        if (
            isVerifying ||
            !signupCreated ||
            !otpSent ||
            !/^\d{6}$/.test(otp)
        ) {
            if (/^\d{6}$/.test(otp) === false) {
                setIsInvalidOtp(true);
            }
            return;
        }

        setIsVerifying(true);
        setIsInvalidOtp(false);

        try {
            const result =
                await signUp.verifications.verifyEmailCode({
                    code: otp,
                });

            if (result.error) {
                const authError = getAuthError(
                    result.error,
                    "otp",
                );

                if (authError.field === "otp") {
                    setIsInvalidOtp(true);
                } else {
                    showToast({
                        icon: "alert",
                        label: authError.label,
                        description: authError.message,
                        variant: "danger",
                    });
                }

                setIsVerifying(false);
                return;
            }

            if (signUp.status !== "complete") {
                showToast({
                    icon: "alert",
                    label: "Verification Incomplete",
                    description:
                        "Your account could not be completed. Please try again.",
                    variant: "danger",
                });

                setIsVerifying(false);
                return;
            }

            await signUp.finalize();

            setIsVerifying(false);
            router.replace("/(tab)");

        } catch (error) {
            const authError = getAuthError(error);

            showToast({
                icon: "alert",
                label: authError.label,
                description: authError.message,
                variant: "danger",
            });

            setIsVerifying(false);
        }
    };

    // ----------------------------------
    // Resend OTP
    // ----------------------------------

    const handleResendOTP = async () => {
        if (isResending || !isComplete || !signupCreated) {
            return;
        }

        setIsResending(true);

        try {
            const result =
                await signUp.verifications.sendEmailCode();

            if (result.error) {
                handleAuthError(result.error, "otp");
                setIsResending(false);
                return;
            }

            setOtpSent(true);
            setIsInvalidOtp(false);

            reset(OTP_RESEND_SECUND);

            showToast({
                icon: "check-circle",
                label: "Code Sent",
                description: `A new verification code was sent to ${maskEmail(email)}.`,
                variant: "success",
            });

            setIsResending(false);
        } catch (error) {
            handleAuthError(error, "otp");
            setIsResending(false);
        }
    };

    // ----------------------------------
    // Form Fields
    // ----------------------------------

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
        return (
            <View className="gap-2">
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <AuthInput
                            name={name}
                            value={value}
                            onChangeText={onChange}
                            error={errors[name]?.message ?? undefined}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            keyboardType={
                                options.keyboard ?? "default"
                            }
                            autoComplete={options.autoComplete}
                            autoCapitalize={
                                options.autoCapitalize ?? "none"
                            }
                            autoCorrect={false}
                            editable={!isSubmitting && !signupCreated}
                            accessibilityLabel={label}
                        />
                    )}
                />
            </View>
        );
    };

    // ----------------------------------
    // UI
    // ----------------------------------

    return (
        <Wrapper authIs="signup">
            <OtpWrapper
                sheetRef={sheetRef}
                backTitle="Sign up"
                title="Verify Your Account"
                email={maskEmail(email)}
                onSubmitOtp={handleVerify}
                isLoading={isVerifying}
                isInvalid={isInvalidOtp}
                resendOtpComponent={
                    <PressableFeedback
                        isDisabled={
                            !isComplete ||
                            isResending ||
                            !signupCreated
                        }
                        onPress={handleResendOTP}
                    >
                        <Text className="text-xs font-poppins-semibold text-text-primary">
                            {isResending
                                ? "Sending..."
                                : !isComplete
                                    ? `Resend code in ${remaining}s`
                                    : !otpSent
                                        ? "Send verification code"
                                        : "Resend code"}
                        </Text>
                    </PressableFeedback>
                }
            >
                {RenderField(
                    "name",
                    "Full name",
                    "Enter your full name",
                    {
                        autoComplete: "name",
                        autoCapitalize: "words",
                    },
                )}

                {RenderField(
                    "email",
                    "Email address",
                    "you@example.com",
                    {
                        keyboard: "email-address",
                        autoComplete: "email",
                    },
                )}

                {RenderField(
                    "password",
                    "Password",
                    "Create a password",
                    {
                        autoComplete: "new-password",
                    },
                )}

                {RenderField(
                    "confirmPassword",
                    "Confirm password",
                    "Re-enter your password",
                    {
                        autoComplete: "new-password",
                    },
                )}

                <Button
                    title={
                        signupCreated
                            ? "Continue Verification"
                            : "Create New Account"
                    }
                    onPress={handleCreateAccount}
                    variant="primary"
                    theme="light"
                    isLoading={isSubmitting}
                    disabled={
                        isSubmitting ||
                        (!signupCreated && !isValid)
                    }
                    fullWidth
                />
            </OtpWrapper>
        </Wrapper>
    );
};
