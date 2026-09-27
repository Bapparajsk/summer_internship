import { ScreenWrapper } from "@/components/screen";
import { useScroll } from "@/context/scroll";
import { View } from "react-native";

export default function OverviewScreen() {
  const { scrollY } = useScroll();

  return (
    <ScreenWrapper path="/(tab)/index" scrollY={scrollY}>
      <View>
        <View className="h-96 bg-red-500/50" />
        <View className="h-96 bg-green-500/50" />
        <View className="h-96 bg-blue-500/50" />
      </View>
    </ScreenWrapper>
  );
}