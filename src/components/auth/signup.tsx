
import { useState } from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormValues, signupSchema } from "@/utils/validate/auth";
import { Button } from "../ui/button";
import { Wrapper } from "./wrapper";
import { AuthInput } from "./input";
import { useSignUp,  } from "@clerk/expo";
import { useRouter } from "expo-router";

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

    const { signUp, fetchStatus } = useSignUp();

    const router = useRouter();

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

    const submitForm = async ({ name, email, password }: SignupFormValues) => {
        setServerError("");

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
            setServerError("Unable to create your account. Please try again.");
            return;
        }

        if (signUpResult.error) {
            const message = signUpResult.error.message.toLowerCase();

            if (
                message.includes("already exists") ||
                message.includes("already registered")
            ) {
                setServerError("This email is already registered. Please sign in.");
                return;
            }

            setServerError(signUpResult.error.message);
            return;
        }

        let verificationResult;
        try {
            verificationResult = await signUp.verifications.sendEmailCode();
        } catch {
            setServerError("Unable to create your account. Please try again.");
            return;
        }

        if (verificationResult.error) {
            setServerError(verificationResult.error.message);
        }
    };

    const handleVerify = async () => {
        setServerError("");

        const { error } =
            await signUp.verifications.verifyEmailCode({ code: "" });

        if (error) {
            setServerError(error.message);
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
                            onBlur={onBlur}
                            placeholder={placeholder}
                            placeholderTextColor="#888888"
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
                title={"CREATE ACCOUNT"}
                onPress={handleSubmit(submitForm)}
                variant="primary"
                theme="light"
                isLoading={isSubmitting}
                disabled={!errors || isSubmitting}
                fullWidth
            />
        </Wrapper>
    );
}


