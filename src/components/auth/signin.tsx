
import { useRef, useState } from "react";
import { Text, View } from "react-native";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSignIn } from "@clerk/expo";
import { useRouter } from "expo-router";

import {
  PressableFeedback,
  useToast,
  type BottomSheetRef,
} from "heroui-native";

import {
  SigninFormValues,
  signinSchema,
} from "@/utils/validate/auth";

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
// Component
// ----------------------------------

export const SigninForm = () => {
  const { signIn, fetchStatus } = useSignIn();

  const router = useRouter();
  const { toast } = useToast();

  const sheetRef = useRef<BottomSheetRef>(null);

  const {
    remaining,
    isComplete,
    reset,
  } = useCountdown(OTP_RESEND_SECUND);

  // ----------------------------------
  // States
  // ----------------------------------

  const [email, setEmail] = useState("");
  const [isOtpRequired, setIsOtpRequired] = useState(false);

  const [isInvalidOtp, setIsInvalidOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const isLoading =
    fetchStatus === "fetching";

  // ----------------------------------
  // Form
  // ----------------------------------

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
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ----------------------------------
  // Toast
  // ----------------------------------

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

  const handleSigninError = (error: unknown) => {
    const authError = getAuthError(error);

    if (
      authError.code === "form_identifier_not_found" ||
      authError.code === "form_password_incorrect"
    ) {
      const message = "Incorrect email or password.";

      setError("password", {
        type: "server",
        message,
      });

      return;
    }

    showToast({
      icon: "alert",
      label: authError.label,
      description: authError.message,
      variant: "danger",
    });
  };

  // ----------------------------------
  // Finalize Signin
  // ----------------------------------

  const finalizeSignin = async () => {
    await signIn.finalize();

    router.replace("/(tab)");
  };

  // ----------------------------------
  // Submit Signin
  // ----------------------------------

  const submitForm = async (values: SigninFormValues) => {
    clearErrors();

    const normalizedEmail = values.email.trim().toLowerCase();

    let passwordResult;
    try {
      passwordResult = await signIn.password({
        identifier: normalizedEmail,
        password: values.password,
      });
    } catch (error) {
      handleSigninError(error);
      return;
    }

    if (passwordResult.error) {
      handleSigninError(passwordResult.error);
      return;
    }

    if (signIn.status === "complete") {
      try {
        await finalizeSignin();
      } catch (error) {
        handleSigninError(error);
      }
      return;
    }

    if (
      signIn.status === "needs_second_factor" ||
      signIn.status === "needs_client_trust"
    ) {
      let sendResult;
      try {
        sendResult = await signIn.mfa.sendEmailCode();
      } catch (error) {
        handleSigninError(error);
        return;
      }

      if (sendResult.error) {
        handleSigninError(sendResult.error);
        return;
      }

      setEmail(normalizedEmail);
      setIsOtpRequired(true);
      setIsInvalidOtp(false);
      reset(OTP_RESEND_SECUND);

      const sheet = sheetRef.current;
      if (sheet) {
        sheet.present();
      }
      return;
    }

    showToast({
      icon: "alert",
      label: "Sign In Incomplete",
      description:
        "Your sign-in requires an additional authentication step.",
      variant: "warning",
    });
  };

  const handleSignin = () => {
    void handleSubmit(submitForm)();
  };

  // ----------------------------------
  // Verify OTP
  // ----------------------------------

  const handleVerify = async (otp: string) => {
    if (isVerifying || !isOtpRequired) return;

    setIsVerifying(true);
    setIsInvalidOtp(false);

    try {
      const result =
        await signIn.mfa.verifyEmailCode({
          code: otp,
        });

      if (result.error) {
        const authError = getAuthError(
          result.error,
          "otp"
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

      if (signIn.status === "complete") {
        await finalizeSignin();
        setIsVerifying(false);
        return;
      }

      showToast({
        icon: "alert",
        label: "Verification Incomplete",
        description:
          "Additional verification is still required.",
        variant: "warning",
      });

      setIsVerifying(false);
    } catch (error) {
      handleSigninError(error);
      setIsVerifying(false);
    }
  };

  // ----------------------------------
  // Resend OTP
  // ----------------------------------

  const handleResendOTP = async () => {
    if (
      isResending ||
      !isComplete ||
      !isOtpRequired
    ) {
      return;
    }

    setIsResending(true);

    try {
      const result =
        await signIn.mfa.sendEmailCode();

      if (result.error) {
        handleSigninError(result.error);
        setIsResending(false);
        return;
      }

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
      handleSigninError(error);
      setIsResending(false);
    }
  };

  // ----------------------------------
  // Form Fields
  // ----------------------------------

  const RenderField = (
    name: keyof SigninFormValues,
    label: string,
    placeholder: string,
    options: {
      keyboard?: "default" | "email-address";
      autoComplete?: "email" | "current-password";
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
              error={errors[name]?.message}
              placeholder={placeholder}
              placeholderTextColor="#888888"
              keyboardType={
                options.keyboard ?? "default"
              }
              autoComplete={options.autoComplete}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading && !isSubmitting}
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
    <Wrapper authIs="signin">
      <OtpWrapper
        sheetRef={sheetRef}
        backTitle="Sign in"
        title="Verify Your Login"
        email={maskEmail(email)}
        onSubmitOtp={handleVerify}
        isInvalid={isInvalidOtp}
        isLoading={isVerifying}
        resendOtpComponent={
          <PressableFeedback
            isDisabled={
              !isComplete ||
              isResending ||
              isVerifying
            }
            onPress={handleResendOTP}
          >
            <Text className="text-xs font-poppins-semibold text-text-primary">
              {isResending
                ? "Sending..."
                : isComplete
                  ? "Resend code"
                  : `Resend code in ${remaining}s`}
            </Text>
          </PressableFeedback>
        }
      >
        {RenderField(
          "email",
          "Email address",
          "you@example.com",
          {
            keyboard: "email-address",
            autoComplete: "email",
          }
        )}

        {RenderField(
          "password",
          "Password",
          "Enter your password",
          {
            autoComplete: "current-password",
          }
        )}

        <Button
          title="Sign In"
          onPress={handleSignin}
          variant="primary"
          theme="light"
          isLoading={isSubmitting}
          disabled={!isValid || isLoading || isSubmitting}
          fullWidth
        />
      </OtpWrapper>
    </Wrapper>
  );

};
