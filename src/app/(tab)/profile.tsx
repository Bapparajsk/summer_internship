import { ScreenWrapper } from '@/components/screen'
import { ProfileHeroCard, UniversityInfoCard, ProfileIdentityCard, tempProfileData, ActivityTimelineSection } from '@/components/screen/profile';
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
      <ProfileHeroCard
        name="Bappa Raj"
        role="Full Stack Developer"
        program="BCA"
        semester="4"
        avatar='panda'
        status="Poor"
        cgpa="8.7"
        streak={14}
        rank="#12"
        achievements={124}
      />

      <ProfileIdentityCard
        {...tempProfileData}
      />

      <UniversityInfoCard
        universityName="Elitte Institute"
        campus="Main Campus"
        department="Computer Science & Technology"
        advisor="Mr. Chandan Chowdhury"
        logo="https://eiem.ac.in/images/logo.svg"
      />
      <ActivityTimelineSection />
    </ScreenWrapper>
  )
}