import { SigninForm } from "@/components/auth/signin";
import { ScreenWrapper } from "@/components/screen";

export default function AuthScreen() {
  return (
    <ScreenWrapper 
      path="/auth/index" 
      showFooter={false} 
      contentContainerStyle={{ paddingBottom: 0, paddingHorizontal: 0 }}
      showBottomGradient={false}
    >
      <SigninForm/>
    </ScreenWrapper>
  );
}
