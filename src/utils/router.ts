export const RouteUrls = {
  home: () => "/",
  sequenceMemoryGame: {
    intro: () => "/sequence-memory-game/intro",
    tutorial: {
      index: () => "/sequence-memory-game/tutorial",
      answer: () => "/sequence-memory-game/tutorial/answer",
    },
    playing: () => "/sequence-memory-game/playing",
  },
  test: () => "/test",
} as const;
