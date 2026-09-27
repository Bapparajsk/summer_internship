import { QuickQuizCard } from "@/components/overview/heroQuizCard";
import { ScreenWrapper } from "@/components/screen";
import { useScroll } from "@/context/scroll";

export default function OverviewScreen() {
  const { scrollY } = useScroll();

  return (
    <ScreenWrapper path="/(tab)/index" scrollY={scrollY}>
      <QuickQuizCard />
    </ScreenWrapper>
  );
}