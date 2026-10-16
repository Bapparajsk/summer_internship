import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react-native";
import { useRouter } from "expo-router";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type SocialProvider = "Google" | "Apple" | "Facebook";

interface LoginScreenProps {
  onLogin?: (email: string, password: string) => Promise<void>;
  onForgotPassword?: (email: string) => void;
  onSocialLogin?: (provider: SocialProvider) => void;
}

export default function LoginScreen({
  onLogin,
  onForgotPassword,
  onSocialLogin,
}: LoginScreenProps) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<
    "email" | "password" | null
  >(null);
  const [loading, setLoading] = useState(false);

  const buttonScale = useSharedValue(1);

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handleLogin = async () => {
    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password) {
      Alert.alert("Missing information", "Enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      if (onLogin) {
        await onLogin(normalizedEmail, password);
      } else {
        Alert.alert("Login", "Connect your authentication handler.");
      }
    } catch (error) {
      Alert.alert(
        "Login failed",
        error instanceof Error ? error.message : "Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      Alert.alert(
        "Reset password",
        "Enter your email address first.",
      );
      return;
    }

    onForgotPassword?.(normalizedEmail);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow px-5 pb-8 pt-3"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center">
          <Pressable
            onPress={() => router.back()}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            className="h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-container-low active:opacity-70"
          >
            <ArrowLeft size={20} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Title */}
        <View className="mt-8 items-center px-2">
          <Text className="font-poppins-semibold text-[30px] tracking-tight text-text-primary">
            Log in
          </Text>

          <Text className="mt-3 max-w-[280px] text-center font-poppins-light text-sm leading-[22px] text-text-secondary">
            Enter your email and password to securely access your account.
          </Text>
        </View>

        {/* Form */}
        <View className="mt-8 gap-4">
          {/* Email */}
          <View
            className={[
              "h-14 flex-row items-center rounded-2xl border px-4",
              focusedInput === "email"
                ? "border-primary-border bg-surface-container"
                : "border-border bg-surface-container-low",
            ].join(" ")}
          >
            <Mail
              size={19}
              color={focusedInput === "email" ? "#5CC6E2" : "#8FA5B8"}
            />

            <TextInput
              value={email}
              onChangeText={setEmail}
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
              placeholder="Email address"
              placeholderTextColor="rgba(255,255,255,0.40)"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => {
                // Focus the password input through a ref if desired.
              }}
              accessibilityLabel="Email address"
              className="ml-3 flex-1 font-poppins-light text-sm text-text-primary"
            />
          </View>

          {/* Password */}
          <View
            className={[
              "h-14 flex-row items-center rounded-2xl border px-4",
              focusedInput === "password"
                ? "border-primary-border bg-surface-container"
                : "border-border bg-surface-container-low",
            ].join(" ")}
          >
            <LockKeyhole
              size={19}
              color={
                focusedInput === "password" ? "#5CC6E2" : "#8FA5B8"
              }
            />

            <TextInput
              value={password}
              onChangeText={setPassword}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.40)"
              secureTextEntry={!showPassword}
              autoComplete="current-password"
              textContentType="password"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
              accessibilityLabel="Password"
              className="ml-3 flex-1 font-poppins-light text-sm text-text-primary"
            />

            <Pressable
              onPress={() => setShowPassword((value) => !value)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={
                showPassword ? "Hide password" : "Show password"
              }
              className="ml-2 h-9 w-9 items-center justify-center rounded-lg active:opacity-60"
            >
              {showPassword ? (
                <Eye size={19} color="#8FA5B8" />
              ) : (
                <EyeOff size={19} color="#8FA5B8" />
              )}
            </Pressable>
          </View>

          {/* Remember / Forgot */}
          <View className="flex-row items-center justify-between px-1 pt-1">
            <Pressable
              onPress={() => setRememberMe((value) => !value)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: rememberMe }}
              className="flex-row items-center gap-2.5"
            >
              <View
                className={[
                  "h-[17px] w-[17px] items-center justify-center rounded border",
                  rememberMe
                    ? "border-primary bg-primary"
                    : "border-border bg-surface-container",
                ].join(" ")}
              >
                {rememberMe && (
                  <Text className="text-[11px] font-bold text-background">
                    ✓
                  </Text>
                )}
              </View>

              <Text className="font-poppins-medium text-xs text-text-secondary">
                Remember me
              </Text>
            </Pressable>

            <Pressable
              onPress={handleForgotPassword}
              hitSlop={8}
              accessibilityRole="button"
            >
              <Text className="font-poppins-medium text-xs text-primary">
                Forgot password?
              </Text>
            </Pressable>
          </View>

          {/* Login button */}
          <AnimatedPressable
            style={buttonStyle}
            onPressIn={() => {
              buttonScale.set(withSpring(0.98));
            }}
            onPressOut={() => {
              buttonScale.set(withSpring(1));
            }}
            onPress={handleLogin}
            disabled={loading}
            accessibilityRole="button"
            className="mt-3 h-14 flex-row items-center justify-center rounded-2xl bg-primary active:opacity-90"
          >
            <Text className="font-poppins-semibold text-sm text-background">
              {loading ? "Logging in..." : "Login"}
            </Text>
          </AnimatedPressable>
        </View>

        {/* Divider */}
        <View className="mt-9 flex-row items-center">
          <View className="h-px flex-1 bg-border" />

          <Text className="mx-4 font-poppins-light text-xs text-text-secondary">
            Or continue with
          </Text>

          <View className="h-px flex-1 bg-border" />
        </View>

        {/* Social buttons */}
        <View className="mt-7 flex-row items-center justify-center gap-5">
          <SocialButton
            provider="Google"
            onPress={() => onSocialLogin?.("Google")}
          />

          <SocialButton
            provider="Apple"
            onPress={() => onSocialLogin?.("Apple")}
          />

          <SocialButton
            provider="Facebook"
            onPress={() => onSocialLogin?.("Facebook")}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function SocialButton({
  provider,
  onPress,
}: {
  provider: SocialProvider;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Continue with ${provider}`}
      className="h-[52px] w-[52px] items-center justify-center rounded-full border border-border bg-surface-container-low active:scale-95"
    >
      {provider === "Google" && <GoogleIcon />}

      {provider === "Apple" && (
        <Text className="text-[27px] font-medium text-text-primary">
          {Platform.OS === "ios" ? " " : ""}
        </Text>
      )}

      {provider === "Facebook" && <FacebookIcon />}
    </Pressable>
  );
}

function GoogleIcon() {
  return (
    <View className="h-5 w-5 items-center justify-center">
      <Text className="font-poppins-semibold text-[19px] text-[#4285F4]">
        G
      </Text>
    </View>
  );
}

function FacebookIcon() {
  return (
    <Text className="text-[23px] font-bold text-[#1877F2]">
      f
    </Text>
  );
}