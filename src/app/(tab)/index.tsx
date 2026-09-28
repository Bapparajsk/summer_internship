import { QuickQuizCard, TopicSelection, WeeklyActivity, WeeklyLeaderboard, ProgressStats, DailyTip } from "@/components/overview";
import { ContentWrapper, ScreenWrapper } from "@/components/screen";
import { useScroll } from "@/context/scroll";

const tip = {
  id: "dbms-1",
  topic: "DBMS",
  label: "Remember",
  text: "A database index can significantly reduce lookup cost.",
}

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
      <ContentWrapper>
        <WeeklyLeaderboard />
      </ContentWrapper>
      <ContentWrapper>
        <ProgressStats />
      </ContentWrapper>
      <ContentWrapper>
        <DailyTip tip={tip} />
      </ContentWrapper>
    </ScreenWrapper>
  );
}