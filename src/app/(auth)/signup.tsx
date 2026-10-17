import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { SignupForm } from "@/components/auth/signup";
import { SigninForm } from "@/components/auth/signin";

export default function SignupScreen() {

    const handleSignup = async (values: {
        name: string;
        email: string;
        password: string;
    }) => {
        // Replace with your actual API or Clerk signup logic.
        console.log(values);

        // Alert.alert("Signup", "Form validated successfully.");
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
            {/* <SigninForm /> */}
        </KeyboardAwareScrollView>
    );
}
