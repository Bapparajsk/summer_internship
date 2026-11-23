import { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormValues, signupSchema } from "@/utils/validate/auth";
import { Button } from "../ui/button";
import { Wrapper } from "./wrapper";
import { AuthInput } from "./input";
import { useSignUp, } from "@clerk/expo";
import { useRouter } from "expo-router";
import { OtpWrapper } from "./otp-wrapper";
import { useToast, type BottomSheetRef } from "heroui-native";
import { maskEmail } from "@/utils/email";
import { ToastContainer, type ToastProps } from "../ui/toastContainer";

type ParsedName = {
    firstName: string;
    lastName: string;
};

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

export const SignupForm = () => {

    const { signUp } = useSignUp();
    const { toast } = useToast();
    const router = useRouter();

    const sheetRef = useRef<BottomSheetRef>(null);

    const [email, setEmail] = useState("");

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
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

    const openOtpSheet = useCallback(() => {
        sheetRef.current?.present();
    }, []);

    const showToast = (ps: ToastProps) => {
        toast.show({
            component(props) {
                return (
                    <ToastContainer
                        isError
                        {...ps}
                        {...props}
                    />
                )
            },
        })
    }

    const submitForm = useCallback(async ({ name, email, password }: SignupFormValues) => {

        const { firstName, lastName } = parseUserName(name);

        let signUpResult;
        try {
            signUpResult = await signUp.password({
                firstName,
                lastName,
                emailAddress: email.trim().toLowerCase(),
                password,
            });
        } catch {
             
            showToast({
                icon: "alert",
                label: "Unexpected Error",
                description: "Unable to create your account. Please try again.",
                variant: "danger"
            })
            return;
        }

        if (signUpResult.error) {
            const message = signUpResult.error.message.toLowerCase();

            if (
                message.includes("already exists") ||
                message.includes("already registered")
            ) {
                showToast({
                    icon: "alert",
                    variant: 'warning',
                    label: 'Already Registered',
                    description: 'This email is already registered. Please sign in.',
                });
                return;
            }

            if (message.includes("password")) {
                setError("password", {
                    message: signUpResult.error.message
                });

                showToast({
                    icon: "alert",
                    variant: "danger",
                    label: "Invalid Password",
                    description: signUpResult.error.message
                });
                return;
            }

            showToast({
                icon: "alert",
                variant: 'warning',
                label: 'Already Registered',
                description: 'This email is already registered. Please sign in.',
            });
            return;
        }

        let verificationResult;
        try {
            verificationResult = await signUp.verifications.sendEmailCode();
            setEmail(email);
            openOtpSheet();
        } catch {
            showToast({
                icon: "alert",
                variant: 'danger',
                label: 'Server Error',
                description: 'Unable to create your account. Please try again.',
            });
            return;
        }

        if (verificationResult.error) {
            toast.show({
                variant: "danger",
                label: "Invalid Password",
                description: verificationResult.error.message
            });
        }
    }, [openOtpSheet, signUp]);

    const handleCreateAccount = useCallback(() => {
        void handleSubmit(submitForm)();
    }, [handleSubmit, submitForm]);

    const handleVerify = async (otp: string) => {

        const { error } =
            await signUp.verifications.verifyEmailCode({ code: otp });

        if (error) {
            showToast({
                icon: "alert",
                label: "Invalid Otp",
                description: error.message.toString()
            });
            return;
        }

        if (signUp.status === "complete") {
            await signUp.finalize();
            router.replace("/(tab)");
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
                            keyboardType={options.keyboard ?? "default"}
                            autoComplete={options.autoComplete}
                            autoCapitalize={options.autoCapitalize ?? "none"}
                            autoCorrect={false}
                            editable={!isSubmitting}
                            accessibilityLabel={label}
                        />
                    )}
                />
            </View >
        );
    };

    return (
        <Wrapper authIs="signup">
            <OtpWrapper
                sheetRef={sheetRef}
                backTitle="Sign up"
                title="Verify Your Account"
                email={maskEmail(email)}
                onSubmitOtp={handleVerify}
            >
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
                    title={"Create New Account"}
                    onPress={handleCreateAccount}
                    variant="primary"
                    theme="light"
                    isLoading={isSubmitting}
                    disabled={!errors || isSubmitting}
                    fullWidth
                />

            </OtpWrapper>
        </Wrapper>
    );
}


