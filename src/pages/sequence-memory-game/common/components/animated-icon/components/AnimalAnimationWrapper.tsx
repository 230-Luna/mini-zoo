import { motion } from "framer-motion";
import {
  Animation,
  AppearanceEffectProps,
} from "pages/sequence-memory-game/common/models/Animations";
import { getDottedBoxWidth } from "../../../utils/animationModifiers";
import { GAME_BOX_HEIGHT } from "constants/layout";

export function AnimalAnimationWrapper({
  animation,
  onAnimationComplete,
  children,
}: {
  animation: Animation;
  onAnimationComplete: () => void;
  children: React.ReactNode;
}) {
  return (
    <AppearanceEffectWrapper
      effect={animation.effect}
      duration={animation.duration}
      fromX={animation.fromX}
      fromY={animation.fromY}
      onComplete={onAnimationComplete}
    >
      <div
        style={{
          position: "absolute",
          left: animation.fromX,
          top: animation.fromY,
        }}
      >
        {children}
      </div>
    </AppearanceEffectWrapper>
  );
}

function AppearanceEffectWrapper({
  effect,
  duration,
  fromX,
  fromY,
  onComplete,
  children,
}: AppearanceEffectProps) {
  const fadeDuration = duration / 1000;

  switch (effect) {
    case "fadeInOut":
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: fadeDuration }}
          onAnimationComplete={onComplete}
        >
          {children}
        </motion.div>
      );

    case "scaleUp":
      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 2, 1], opacity: [0, 1, 0] }}
          transition={{ duration: fadeDuration }}
          onAnimationComplete={onComplete}
        >
          {children}
        </motion.div>
      );

    case "scaleDown":
      return (
        <motion.div
          initial={{ scale: 2 }}
          animate={{ scale: [2, 0.7, 1.2], opacity: [0, 1, 0] }}
          transition={{ duration: fadeDuration }}
          onAnimationComplete={onComplete}
        >
          {children}
        </motion.div>
      );

    case "skewXY":
      return (
        <motion.div
          initial={{ skewX: "25deg", skewY: "25deg" }}
          animate={{
            skewX: ["20eg", "-20deg", "0deg"],
            skewY: ["20deg", "-20deg", "0deg"],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: fadeDuration }}
          onAnimationComplete={onComplete}
        >
          {children}
        </motion.div>
      );

    case "skewX":
      return (
        <motion.div
          initial={{ skewX: "30deg" }}
          animate={{ skewX: ["30deg", "-30deg", "0deg"], opacity: [0, 1, 0] }}
          transition={{ duration: fadeDuration }}
          onAnimationComplete={onComplete}
        >
          {children}
        </motion.div>
      );

    case "skewY":
      return (
        <motion.div
          initial={{ skewY: "30deg" }}
          animate={{ skewY: ["30deg", "-30deg", "0deg"], opacity: [0, 1, 0] }}
          transition={{ duration: fadeDuration }}
          onAnimationComplete={onComplete}
        >
          {children}
        </motion.div>
      );

    case "shake":
      return (
        <motion.div
          animate={{
            x: [-15, 15, 15, -15, 0],
            y: [-15, 15, -15, 15, 0],
            opacity: [1, 1, 1, 1, 0],
          }}
          transition={{ duration: fadeDuration }}
          onAnimationComplete={onComplete}
        >
          {children}
        </motion.div>
      );

    case "rotateX":
      return (
        <motion.div
          animate={{ rotateX: [0, 50, 0], opacity: [1, 1, 0] }}
          transition={{ duration: fadeDuration }}
          onAnimationComplete={onComplete}
        >
          {children}
        </motion.div>
      );

    case "rotateY":
      return (
        <motion.div
          animate={{ rotateY: [0, 180, 360], opacity: [1, 1, 0] }}
          transition={{ duration: fadeDuration }}
          onAnimationComplete={onComplete}
        >
          {children}
        </motion.div>
      );

    case "rotateZ":
      return (
        <motion.div
          animate={{ rotateZ: [0, 50, 0], opacity: [1, 1, 0] }}
          transition={{ duration: fadeDuration }}
          onAnimationComplete={onComplete}
        >
          {children}
        </motion.div>
      );

    case "horizontalMove":
      const dottedBoxWidth = getDottedBoxWidth();
      const shouldGoRight = fromX && fromX < dottedBoxWidth * 0.5;

      return (
        <motion.div
          initial={{ x: 0 }}
          animate={{
            x: shouldGoRight ? dottedBoxWidth : -dottedBoxWidth,
            opacity: [1, 0],
          }}
          transition={{
            duration: fadeDuration,
            repeat: 0,
          }}
          onAnimationComplete={onComplete}
        >
          {children}
        </motion.div>
      );

    case "verticalMove":
      const shouldGoDown = fromY && fromY < GAME_BOX_HEIGHT * 0.5;

      return (
        <motion.div
          initial={{ y: 0 }}
          animate={{
            y: shouldGoDown ? GAME_BOX_HEIGHT : -GAME_BOX_HEIGHT,
            opacity: [1, 0],
          }}
          transition={{
            duration: fadeDuration,
            repeat: 0,
          }}
          onAnimationComplete={onComplete}
        >
          {children}
        </motion.div>
      );

    default:
      throw new Error("정의되지 않은 애니메이션 타입입니다");
  }
}
