import { QuickQuizCard } from "@/components/overview/heroQuizCard";
import { TopicSelection } from "@/components/overview/topicSelection";
import { ScreenWrapper } from "@/components/screen";
import { useScroll } from "@/context/scroll";
import { useRouter } from "expo-router";
import { Button } from "heroui-native";
import { View } from "react-native";

export default function OverviewScreen() {
  const { scrollY } = useScroll();

  const router = useRouter();

  return (
    <ScreenWrapper path="/(tab)/index" scrollY={scrollY} SCREEN_HORIZONTAL_PADDING={0}>
      <View className="px-4">
        <QuickQuizCard />
      </View>
      <TopicSelection />
      <Button
        onPress={() => {
          router.push("/onboarding");
        }}
      >
        Onbording
      </Button>
     </ScreenWrapper>
  );
}