export const STORAGE_KEY = "@mini-zoo/sequence-memory-game-score";

export const sequenceMemoryGameScoreStorage = {
  get: () => {
    const score = localStorage.getItem(STORAGE_KEY);

    if (score == null) {
      return null;
    }

    return Number(score);
  },

  set: (score: number) => {
    localStorage.setItem(STORAGE_KEY, score.toString());
  },
};
