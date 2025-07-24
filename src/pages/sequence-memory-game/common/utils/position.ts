export const getRandomPosition = () => {
  const x = Math.floor(Math.random() * 80) + 10;
  const y = Math.floor(Math.random() * 70) + 10;

  if (typeof window === "undefined") {
    return { x, y: 50 };
  }

  return {
    x: ((x * (window.innerHeight - 140)) / 100 / window.innerHeight) * 100,
    y: ((y * (window.innerHeight - 140)) / 100 / window.innerHeight) * 100,
  };
};
