import { ScreenWrapper } from '@/components/screen';
import { ProgressHeader, ProgressOverview, AccuracyTrend, SubjectPerformance } from '@/components/screen/progress';
import { useScrollStore } from '@/store/scroll-store';
import { useAnimatedScrollHandler } from 'react-native-reanimated';

export default function ProgressScreen() {

  const scrollY = useScrollStore(
    (state) => state.scrollY.progress
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.set(event.contentOffset.y);
    },
  });

  return (
    <ScreenWrapper path="/(tab)/progress" onScroll={scrollHandler}>
      <ProgressHeader />
      <ProgressOverview />
      <AccuracyTrend />
      <SubjectPerformance /> 
    </ScreenWrapper>
  )
}