import { ScreenWrapper } from '@/components/screen';
import { QuizExploreControls, TrendingSections } from "@/components/screen/explore";
import { useScrollStore } from '@/store/scroll-store';
import { useAnimatedScrollHandler } from 'react-native-reanimated';

export default function ExploreScreen() {

  const scrollY = useScrollStore(
    (state) => state.scrollY.explore
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.set(event.contentOffset.y);
    },
  });

  return (
    <ScreenWrapper path="/(tab)/explore" onScroll={scrollHandler}>
      <QuizExploreControls />
      <TrendingSections/>
    </ScreenWrapper>
  )
}