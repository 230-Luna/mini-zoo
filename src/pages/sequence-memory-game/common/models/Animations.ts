import { ReactNode } from "react";

export type AppearanceEffect =
  | "fadeInOut"
  | "scaleUp"
  | "scaleDown"
  | "skewXY"
  | "skewX"
  | "skewY"
  | "shake"
  | "rotateX"
  | "rotateY"
  | "rotateZ";

export interface AppearanceEffectProps {
  effect: AppearanceEffect;
  duration: number;
  onComplete: () => void;
  children: ReactNode;
}

export type MovementEffect = "bounce" | "linear" | "wave" | "zigzag" | "orbit";

export interface MovementEffectProps {
  effect: MovementEffect;
  speed: number;
  duration: number;
  children: ReactNode;
}

export interface AnimatedAnimalInfo {
  id: string;
  x: number;
  y: number;
  icon: string;
  appearanceEffect: AppearanceEffect;
  movementEffect: MovementEffect;
  delay: number;
  speed: number;
  duration: number;
  isDone: boolean;
}
