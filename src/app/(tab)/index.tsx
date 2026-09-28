import { QuickQuizCard, TopicSelection, WeeklyActivity } from "@/components/overview";
import { ContentWrapper, ScreenWrapper } from "@/components/screen";
import { useScroll } from "@/context/scroll";

export default function OverviewScreen() {
  const { scrollY } = useScroll();

  return (
    <ScreenWrapper path="/(tab)/index" scrollY={scrollY} SCREEN_HORIZONTAL_PADDING={0}>
      <ContentWrapper>
        <QuickQuizCard />
      </ContentWrapper>
      <TopicSelection />
      <ContentWrapper>
        <WeeklyActivity />
      </ContentWrapper>
    </ScreenWrapper>
  );
}