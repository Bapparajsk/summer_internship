import { ScreenWrapper } from "../screenWrapper";
import { useRouter } from "expo-router";
import { ReactNode } from "react";
import { SimpleHeader } from "@/components/header/simpleHeader";
import { HeaderTitle, HeaderTitleProps } from "./headerTitle";

export type SettingScreenWrapperProps = {
  path: string;
  backTitle: string;
  children: ReactNode

  header: HeaderTitleProps
}

export const SettingScreenWrapper = ({ path, backTitle, header , children }: SettingScreenWrapperProps) => {

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
      <HeaderTitle {...header}/>
      {children}
    </ScreenWrapper>
  )
}