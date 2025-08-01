import { ReactNode } from "react";

export type Effects =
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
  effect: Effects;
  duration: number;
  fromX: number;
  fromY: number;
  onComplete: () => void;
  children: ReactNode;
}

export interface Animation {
  fromX: number;
  fromY: number;
  effect: Effects;
  delay: number;
  duration: number;
}
