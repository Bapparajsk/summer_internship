import { QuickQuizCard } from "@/components/overview/heroQuizCard";
import { TopicSelection } from "@/components/overview/topicSelection";
import { WeeklyActivity } from "@/components/overview/weeklyActivitySection";
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