import { QuickQuizCard, TopicSelection, WeeklyActivity, WeeklyLeaderboard, ProgressStats, DailyTip } from "@/components/overview";
import { ContentWrapper, ScreenWrapper } from "@/components/screen";
import { useScrollStore } from "@/store/scroll-store";
import { useAnimatedScrollHandler } from "react-native-reanimated";

const tip = {
  id: "dbms-1",
  topic: "DBMS",
  label: "Remember",
  text: "A database index can significantly reduce lookup cost.",
}

export default function OverviewScreen() {

  const scrollY = useScrollStore(
    (state) => state.scrollY.index
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.set(event.contentOffset.y);
    },
  });


  return (
    <ScreenWrapper path="/(tab)/index" onScroll={scrollHandler} SCREEN_HORIZONTAL_PADDING={0}>
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