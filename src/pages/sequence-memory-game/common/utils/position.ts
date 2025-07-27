import {
  DEFAULT_ICON_SIZE,
  GAME_BOX_HEIGHT,
  PAGE_PADDING,
} from "constants/layout";

export const getRandomPosition = () => {
  if (typeof window === "undefined") {
    return { x: 0, y: 50 };
  }

  const x =
    Math.floor(
      Math.random() * (window.innerWidth - 2 * PAGE_PADDING - DEFAULT_ICON_SIZE)
    ) + PAGE_PADDING;
  const y = Math.floor(Math.random() * GAME_BOX_HEIGHT - DEFAULT_ICON_SIZE);

  return {
    x,
    y,
  };
};
