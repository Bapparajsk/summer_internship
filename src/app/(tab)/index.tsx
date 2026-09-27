import { ScreenWrapper } from "@/components/screen";
import { useScroll } from "@/context/scroll";
import { View } from "react-native";

export default function HomeScreen() {
  const { scrollY } = useScroll(); // or receive it through your context

  return (
    <ScreenWrapper path="/(tab)/index" scrollY={scrollY}>
      <View>
        <View className="h-96 bg-red-500" />
        <View className="h-96 bg-green-500" />
        <View className="h-96 bg-blue-500" />
      </View>
    </ScreenWrapper>
  );
}