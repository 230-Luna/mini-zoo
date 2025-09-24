import {
  DEFAULT_ICON_SIZE,
  DOTTEDBOX_BORDER,
  GAME_BOX_HEIGHT,
  PAGE_MAX_WIDTH,
  PAGE_PADDING,
} from "constants/layout";
import { MAX_GAME_LEVEL } from "../constants/game";
import { isServer } from "utils/env";

export const getRandomGameBoxPosition = () => {
  if (isServer()) {
    return { x: 0, y: 0 };
  }

  const actualBoxWidth =
    Math.min(window.innerWidth - PAGE_PADDING * 2, PAGE_MAX_WIDTH) -
    DOTTEDBOX_BORDER * 2;

  const actualBoxHeight = GAME_BOX_HEIGHT - DOTTEDBOX_BORDER * 2;
  const SAFETY_MARGIN = 8;

  const maxX = Math.max(
    0,
    actualBoxWidth - DEFAULT_ICON_SIZE - SAFETY_MARGIN * 2
  );
  const maxY = Math.max(
    0,
    actualBoxHeight - DEFAULT_ICON_SIZE - SAFETY_MARGIN * 2
  );
  
  const x = SAFETY_MARGIN + Math.floor(Math.random() * (maxX + 1));
  const y = SAFETY_MARGIN + Math.floor(Math.random() * (maxY + 1));

  return { x, y };
};

export const getDurationByLevel = (level: number): number => {
  const min = 1500;
  const max = 3000;
  const t = (MAX_GAME_LEVEL - level) / (MAX_GAME_LEVEL - 1);
  return Math.round(max - (max - min) * t ** 1.5);
};

export const getDottedBoxWidth = () => {
  if (isServer()) {
    return PAGE_MAX_WIDTH;
  }

  return window.innerWidth - PAGE_PADDING * 2;
};
