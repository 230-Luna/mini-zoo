export type AnimationName = "appearAndVanish" | "spinMove";

export interface AnimalAppearanceInfo {
  x: number;
  y: number;
  icon: string;
  animationName: AnimationName;
  delay: number;
  isDone: boolean;
}
