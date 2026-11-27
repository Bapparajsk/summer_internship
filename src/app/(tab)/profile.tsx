import { ScreenWrapper } from '@/components/screen'
import {
  ProfileHeroCard,
  UniversityInfoCard,
  ProfileQuizExplorerCard,
  ActivityTimelineSection
} from '@/components/screen/profile';
import { useScrollStore } from '@/store/scroll-store';
import { useAnimatedScrollHandler } from 'react-native-reanimated';

export default function ProfileScreen() {

  const scrollY = useScrollStore(
    (state) => state.scrollY.profile
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.set(event.contentOffset.y);
    },
  });

  return (
    <ScreenWrapper path="/(tab)/profile" onScroll={scrollHandler}>
      <ProfileHeroCard />

      <ProfileQuizExplorerCard />

      <UniversityInfoCard />
      <ActivityTimelineSection />
    </ScreenWrapper>
  )
}