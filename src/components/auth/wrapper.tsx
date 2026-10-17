
import {
  Pressable,
  Text,
  View,
} from "react-native";
import { SocialLogin } from "./socialLogin";
import { ReactNode } from "react";
import { Link } from "expo-router";

type WrapperProps = {
  authIs: "signin" | "signup",
  children?: ReactNode,
};


export const Wrapper = ({ authIs, children }: WrapperProps) => {

  const isSignin = authIs === "signin";

  return (
    <View className="flex-1 pt-8 justify-between">
      {/* Title */}
      <View className="my-auto items-center px-2">
        <Text className="font-poppins-semibold text-xl tracking-tight text-text-primary">
          {isSignin ? "Log in" : "Create Account"}
        </Text>

        <Text className="mt-2 max-w-70 text-center font-poppins-medium text-xs leading-4 text-text-secondary">
          {
            isSignin ? "Enter your email and password to securely access your account." :
              "Create a new account to get started and enjoy seamless access to our features."
          }
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
              {children}
            </View>
            {/* Sign in link */}
            <View className="mt-6 flex-row flex-wrap items-center justify-center">
              <Text className="font-poppins-medium text-xs text-black/60">
                {isSignin ? "Don't have an account?" : "Already have an account?"}
              </Text>

              <Link asChild href={isSignin ? "/(auth)/signup" : "/(auth)"}>
                <Pressable
                  hitSlop={6}
                  accessibilityRole="link"
                  className="ml-1 px-1 py-1"
                >
                  <Text className="font-poppins-semibold text-xs text-primary">
                    {isSignin ? "sign up here" : "sign in here"}
                  </Text>
                </Pressable>
              </Link>
            </View>

            {/* Divider */}
            <View className="my-6 flex-row items-center">
              <View className="h-px flex-1 bg-surface-container-highest" />

              <Text className="mx-3 font-poppins-semibold text-[11px]">
                Or continue with
              </Text>

              <View className="h-px flex-1 bg-surface-container-highest" />
            </View>

            <SocialLogin />
          </View>
        </View>
      </View>
    </View>
  );
}

