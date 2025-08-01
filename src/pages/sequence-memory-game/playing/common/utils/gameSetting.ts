export const getIconCountByLevel = (level: number): number => {
  if (level === 1) return 2;
  if (level <= 3) return 3;
  if (level <= 5) return 4;
  if (level === 6) return 5;
  if (level === 7) return 6;
  if (level === 8) return 7;
  if (level === 9) return 7;
  if (level === 10) return 8;
  return 2;
};
