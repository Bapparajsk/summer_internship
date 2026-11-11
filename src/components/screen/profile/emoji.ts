
export const PROFILE_EMOJIS = {
  happy: { emoji: '😊', background: '#FFF1D6' },
  love: { emoji: '🥰', background: '#FFE4EF', },
  cool: { emoji: '😎', background: '#DDF4FF', },
  shy: { emoji: '🤭', background: '#FCE4EC', },

  cat: { emoji: '🐱', background: '#FFE8D9', },
  dog: { emoji: '🐶', background: '#FCE8D5', },
  panda: { emoji: '🐼', background: '#E9ECF0', },
  bear: { emoji: '🐻', background: '#F1E1D5', },
  rabbit: { emoji: '🐰', background: '#FFE7F0', },
  fox: { emoji: '🦊', background: '#FFE5D6', },
  penguin: { emoji: '🐧', background: '#DFF2FF', },
  frog: { emoji: '🐸', background: '#E1F5DC', },
  dolphin: { emoji: '🐬', background: '#DDF3FF', },
  unicorn: { emoji: '🦄', background: '#F2E4FF', },

  butterfly: { emoji: '🦋', background: '#E5E4FF', },
  blossom: { emoji: '🌸', background: '#FFE4F0', },
  strawberry: { emoji: '🍓', background: '#FFE5E5', },
  sunflower: { emoji: '🌻', background: '#FFF4CC', },
  ghost: { emoji: '👻', background: '#ECE8FF', },
  sparkle: { emoji: '✨', background: '#F2E9FF', },
} as const;


export type ProfileEmojiName = keyof typeof PROFILE_EMOJIS;
export type ProfileEmojiConfig = (typeof PROFILE_EMOJIS)[ProfileEmojiName];

export const getEmoji = (name: ProfileEmojiName) : ProfileEmojiConfig => {
    return PROFILE_EMOJIS[name];
}
