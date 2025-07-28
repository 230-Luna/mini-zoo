import {
  DEFAULT_ICON_SIZE,
  GAME_BOX_HEIGHT,
  PAGE_PADDING,
} from "constants/layout";
import { appearanceEffects } from "../constants/appearanceEffects";
import { movementEffects } from "../constants/movementEffects";
import { AppearanceEffect, MovementEffect } from "../models/Animations";

export const getRandomPosition = () => {
  if (typeof window === "undefined") {
    return { x: 0, y: 0 };
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

export const getDurationByLevel = (level: number): number => {
  return Math.max(3000 - level * 300, 1000);
};

export const getSpeedByLevel = (level: number): number => {
  return 1 + level * 0.2;
};

export const getAmplitudeByLevel = (level: number): number => {
  return 10 + level * 5;
};

export function getRandomAppearanceEffect(): AppearanceEffect {
  const i = Math.floor(Math.random() * appearanceEffects.length);
  return appearanceEffects[i];
}

export function getRandomMovementEffect(): MovementEffect {
  const i = Math.floor(Math.random() * movementEffects.length);
  return movementEffects[i];
}
