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
  | "rotateZ"
  | "horizontalMove"
  | "verticalMove";

export interface AppearanceEffectProps {
  effect: AppearanceEffect;
  duration: number;
  x: number;
  y: number;
  onComplete: () => void;
  children: ReactNode;
}

export interface Animation {
  x: number;
  y: number;
  appearanceEffect: AppearanceEffect;
  delay: number;
  duration: number;
  isDone: boolean;
}
