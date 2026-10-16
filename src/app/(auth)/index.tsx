import { useAuth } from "@clerk/expo";
import { ActivityIndicator, Alert, View } from "react-native";
import { Redirect } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { SignupForm } from "@/components/auth/signup";

export default function AuthScreen() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#5CC6E2" />
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href="/(tab)" />;
  }

  const handleSignup = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    // Replace with your actual API or Clerk signup logic.
    console.log(values);

    Alert.alert("Signup", "Form validated successfully.");
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={30}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <SignupForm onSubmit={handleSignup} />
    </KeyboardAwareScrollView>
  );
}
