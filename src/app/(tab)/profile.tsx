import { ScreenWrapper } from '@/components/screen'
import { ProfileHeroCard } from '@/components/profile/profileHeroCard';
import { useScrollStore } from '@/store/scroll-store';
import { useAnimatedScrollHandler } from 'react-native-reanimated';

export default function ProfileScreen() {

  const scrollY = useScrollStore(
      (state) => state.scrollY.index
    );
  
    const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
        scrollY.set(event.contentOffset.y);
      },
    });

  return (
    <ScreenWrapper path="/profile" onScroll={scrollHandler}>
      <ProfileHeroCard
        name="Bappa Raj"
        role="Full Stack Developer"
        program="BCA"
        semester="4"
        avatar="https://img.freepik.com/premium-photo/avatar-profile-picture-white-background_880763-10255.jpg?w=1480"
        // coverImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
        status="Excellent Standing"
        cgpa="8.7"
        streak={14}
        rank="#12"
        achievements={124}
      />
    </ScreenWrapper>
  )
}