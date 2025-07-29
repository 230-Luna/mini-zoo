import { motion } from "framer-motion";
import { getAmplitudeByLevel } from "pages/sequence-memory-game/common/utils/animationModifiers";
import {
  AnimatedAnimalInfo,
  AppearanceEffectProps,
  MovementEffectProps,
} from "pages/sequence-memory-game/common/models/Animations";

export function AnimationWrapper({
  animatedAnimalInfo,
  onAnimationComplete,
  children,
}: {
  animatedAnimalInfo: AnimatedAnimalInfo;
  onAnimationComplete: () => void;
  children: React.ReactNode;
}) {
  return (
    <MovementEffectWrapper
      effect={animatedAnimalInfo.movementEffect}
      speed={animatedAnimalInfo.speed}
      duration={animatedAnimalInfo.duration}
    >
      <AppearanceEffectWrapper
        effect={animatedAnimalInfo.appearanceEffect}
        duration={animatedAnimalInfo.duration}
        onComplete={onAnimationComplete}
      >
        <div
          style={{
            position: "absolute",
            left: animatedAnimalInfo.x,
            top: animatedAnimalInfo.y,
          }}
        >
          {children}
        </div>
      </AppearanceEffectWrapper>
    </MovementEffectWrapper>
  );
}

function AppearanceEffectWrapper({
  effect,
  duration,
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
          animate={{ scale: [2, 0.5, 1] }}
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
            skewX: ["25eg", "-25deg", "0deg"],
            skewY: ["25deg", "-25deg", "0deg"],
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
          animate={{ skewX: ["30deg", "-30deg", "0deg"] }}
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
          animate={{ skewY: ["30deg", "-30deg", "0deg"] }}
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
            x: [-10, 10, -5, 5, 0],
            y: [-10, 10, -5, 5, 0],
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
          animate={{ rotateZ: [0, 180, 360] }}
          transition={{ duration: fadeDuration }}
          onAnimationComplete={onComplete}
        >
          {children}
        </motion.div>
      );

    default:
      throw new Error("정의되지 않은 애니메이션 타입입니다");
  }
}

function MovementEffectWrapper({
  effect,
  speed,
  duration,
  children,
}: MovementEffectProps) {
  const amplitude = getAmplitudeByLevel(speed); // 진폭

  switch (effect) {
    case "bounce":
      return (
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1 / speed,
          }}
        >
          {children}
        </motion.div>
      );

    case "linear":
      return (
        <motion.div
          animate={{ x: ["0%", "90%"] }}
          transition={{
            duration,
            ease: "linear",
          }}
        >
          {children}
        </motion.div>
      );

    case "wave":
      return (
        <motion.div
          animate={{
            y: [0, -amplitude, 0, amplitude, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.div>
      );

    case "zigzag":
      return (
        <motion.div
          animate={{
            x: [-amplitude, amplitude, -amplitude],
            y: [0, amplitude, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.div>
      );

    case "orbit":
      return (
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: duration / speed,
            // repeat: Infinity,
            ease: "linear",
          }}
        >
          {children}
        </motion.div>
      );

    default:
      return <>{children}</>;
  }
}
