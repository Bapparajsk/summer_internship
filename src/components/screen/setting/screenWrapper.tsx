import { ScreenWrapper } from "../screenWrapper";
import { useRouter } from "expo-router";
import { ReactNode } from "react";
import { SimpleHeader } from "@/components/header/simpleHeader";

export type SettingScreenWrapperProps = {
  path: string;
  backTitle: string;
  children: ReactNode
}

export const SettingScreenWrapper = ({ path, backTitle, children }: SettingScreenWrapperProps) => {

  const router = useRouter();

  const handelPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  }

  return (
    <ScreenWrapper path={`setting/${path}`} showFooter={false} paddingTop={10}>
      <SimpleHeader
        icon={{
          name: "chevron-left",
          size: 20,
        }}
        title={backTitle}
        onPress={handelPress}
      />
      {children}
    </ScreenWrapper>
  )
}