
import { useState } from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormValues, signupSchema } from "@/utils/validate/auth";
import { Button } from "../ui/button";
import { Wrapper } from "./wrapper";
import { AuthInput } from "./input";

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


