import { SignupForm } from "@/components/auth/signup";
import { ScreenWrapper } from "@/components/screen";

export default function SignupScreen() {


    return (
        <ScreenWrapper
            path="/auth/sign-up"
            showFooter={false}
            contentContainerStyle={{ paddingBottom: 0, paddingHorizontal: 0, paddingTop: 0 }}
            showBottomGradient={false}
        >
            <SignupForm />
        </ScreenWrapper>
    );
}
