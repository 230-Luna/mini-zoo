export const RouteUrls = {
  home: () => "/",
  sequenceMemoryGame: {
    intro: () => "/sequence-memory-game/intro",
    onboarding: () => "/sequence-memory-game/onboarding",
    playing: () => "/sequence-memory-game/playing",
  },
} as const;
