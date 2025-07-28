import { motion } from "framer-motion";
import {
  getAmplitudeByLevel,
  getDurationByLevel,
  getSpeedByLevel,
} from "pages/sequence-memory-game/common/utils/animationModifiers";
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
  const duration = getDurationByLevel(animatedAnimalInfo.level);
  const speed = getSpeedByLevel(animatedAnimalInfo.level);

  return (
    <MovementEffectWrapper
      effect={animatedAnimalInfo.movementEffect}
      speed={speed}
      duration={duration}
    >
      <AppearanceEffectWrapper
        effect={animatedAnimalInfo.appearanceEffect}
        duration={duration}
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
          animate={{ scale: [0, 1.2, 1] }}
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
          animate={{ scale: [2, 1.2, 1] }}
          transition={{ duration: fadeDuration }}
          onAnimationComplete={onComplete}
        >
          {children}
        </motion.div>
      );

    case "skew":
      return (
        <motion.div
          initial={{ skewX: "15deg" }}
          animate={{ skewX: ["15deg", "-15deg", "0deg"] }}
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
            x: [-5, 5, -5, 5, 0],
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
          animate={{ rotateX: [0, 180, 360] }}
          transition={{ duration: fadeDuration }}
          onAnimationComplete={onComplete}
        >
          {children}
        </motion.div>
      );

    case "rotateY":
      return (
        <motion.div
          animate={{ rotateY: [0, 180, 360] }}
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
      return <>{children}</>;
  }
}

function MovementEffectWrapper({
  effect,
  speed,
  duration,
  children,
}: MovementEffectProps) {
  const amplitude = getAmplitudeByLevel(speed);

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
          animate={{ x: ["0%", "100%"] }}
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
            repeat: Infinity,
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

// function FadeInOut({
//   children,
//   x,
//   y,
//   duration,
//   onAnimationComplete,
// }: {
//   children: ReactNode;
//   x: number;
//   y: number;
//   duration: number;
//   onAnimationComplete: () => void;
// }) {
//   return (
//     <motion.div
//       css={css`
//         position: absolute;
//         pointer-events: none;
//         left: 0;
//         top: 0;
//       `}
//       initial={{ opacity: 0, x, y }}
//       animate={{ opacity: [0, 1, 1, 0] }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: duration }}
//       onAnimationComplete={() => onAnimationComplete()}
//     >
//       {children}
//     </motion.div>
//   );
// }

// function SpinMove({
//   children,
//   x,
//   y,
//   // duration,
//   onAnimationComplete,
// }: {
//   children: ReactNode;
//   x: number;
//   y: number;
//   // duration?: number;
//   onAnimationComplete: () => void;
// }) {
//   const toRandom = getRandomPosition();
//   const distance = Math.sqrt((toRandom.x - x) ** 2 + (toRandom.y - y) ** 2); // px
//   const speed = 10; // px/s
//   const duration = distance / speed;
//   console.log(duration);

//   return (
//     <motion.div
//       css={css`
//         position: absolute;
//         pointer-events: none;
//         left: 0;
//         top: 0;
//       `}
//       initial={{
//         opacity: 0,
//         x: x,
//         y: y,
//       }}
//       animate={{
//         x: toRandom.x,
//         y: toRandom.y,
//         opacity: [1, 1, 0],
//       }}
//       exit={{ opacity: 0 }}
//       transition={{
//         duration,
//         ease: "linear",
//       }}
//       onAnimationComplete={() => onAnimationComplete()}
//     >
//       {children}
//     </motion.div>
//   );
// }

// function PingPong({
//   children,
//   // duration,
//   onAnimationComplete,
// }: {
//   children: ReactNode;
//   onAnimationComplete: () => void;
// }) {
//   return (
//     <motion.div
//       animate={{ x: [0, 50, 0] }}
//       transition={{ repeat: Infinity, duration: 2 }}
//       exit={{ opacity: 0 }}
//       onAnimationComplete={() => onAnimationComplete()}
//     >
//       {children}
//     </motion.div>
//   );
// }
