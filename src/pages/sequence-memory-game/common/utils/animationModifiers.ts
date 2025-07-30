import {
  DEFAULT_ICON_SIZE,
  DOTTEDBOX_BORDER,
  GAME_BOX_HEIGHT,
  PAGE_MAX_WIDTH,
  PAGE_PADDING,
} from "constants/layout";
import { appearanceEffects } from "../constants/appearanceEffects";
import { AppearanceEffect } from "../models/Animations";

export const getRandomPosition = () => {
  if (typeof window === "undefined") {
    return { x: 0, y: 0 };
  }

  const containerWidth =
    window.innerWidth - (PAGE_PADDING + DOTTEDBOX_BORDER) * 2;
  const maxX = containerWidth - DEFAULT_ICON_SIZE;
  const maxY = GAME_BOX_HEIGHT - DEFAULT_ICON_SIZE;

  const x = Math.floor(Math.random() * (maxX + 1));
  const y = Math.floor(Math.random() * (maxY + 1));

  return { x, y };
};

export const getDurationByLevel = (level: number): number => {
  const min = 1500;
  const max = 3000;
  const t = (level - 1) / 9;
  return Math.round(max - (max - min) * t ** 1.5);
};

export const getRandomAppearanceEffect = (): AppearanceEffect => {
  const i = Math.floor(Math.random() * appearanceEffects.length);
  return appearanceEffects[i];
};

export const getDottedBoxWidth = () => {
  if (typeof window === "undefined") {
    return PAGE_MAX_WIDTH;
  }

  return window.innerWidth - PAGE_PADDING * 2;
};
