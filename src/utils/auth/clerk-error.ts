
type ClerkError = {
    code?: string;
    message?: string;
    longMessage?: string;
};

type AuthErrorResult = {
    code?: string;
    message: string;
    label: string;
    field?: "email" | "password" | "otp";
};

export const getAuthError = (
    error: unknown,
    fallbackField?: AuthErrorResult["field"],
): AuthErrorResult => {
    const value = error as {
        message?: string;
        errors?: ClerkError[];
    };

    const clerkError = value?.errors?.[0];

    const code = clerkError?.code ?? "";

    const message =
        clerkError?.longMessage ??
        clerkError?.message ??
        value?.message ??
        "Something went wrong. Please try again.";

    switch (code) {
        case "form_identifier_exists":
            return {
                code,
                label: "Already Registered",
                message: "This email is already registered. Please sign in.",
                field: "email",
            };

        case "form_password_pwned":
        case "form_password_length_too_short":
        case "form_password_validation_failed":
            return {
                code,
                label: "Invalid Password",
                message,
                field: "password",
            };

        case "verification_failed":
        case "verification_code_invalid":
            return {
                code,
                label: "Invalid Code",
                message: "The verification code is incorrect.",
                field: "otp",
            };

        case "verification_expired":
        case "verification_code_expired":
            return {
                code,
                label: "Code Expired",
                message: "Your verification code has expired. Request a new code.",
                field: "otp",
            };

        case "verification_attempts_exceeded":
            return {
                code,
                label: "Too Many Attempts",
                message: "Too many verification attempts. Request a new code.",
                field: "otp",
            };

        default:
            return {
                code: code || undefined,
                label: "Something Went Wrong",
                message,
                field: fallbackField,
            };
    }
};
