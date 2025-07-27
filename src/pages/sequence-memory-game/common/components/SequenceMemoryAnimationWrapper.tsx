import { ReactNode } from "react";
import { motion } from "framer-motion";
import { css } from "@emotion/react";
import { getRandomPosition } from "pages/sequence-memory-game/common/utils/position";
import { AnimalAppearanceInfo } from "pages/sequence-memory-game/common/models/Animations";

export const SequenceMemoryAnimationWrapper = ({
  children,
  info,
  onDone,
}: {
  children: ReactNode;
  info: AnimalAppearanceInfo;
  onDone: () => void;
}) => {
  if (info.animationName === "appearAndVanish") {
    return (
      <AppearAndVanish x={info.x} y={info.y} onDone={onDone}>
        {children}
      </AppearAndVanish>
    );
  }
  if (info.animationName === "spinMove") {
    return (
      <SpinMove x={info.x} y={info.y} onDone={onDone}>
        {children}
      </SpinMove>
    );
  }

  throw new Error("정의되지 않은 애니메이션 타입입니다");
};

function AppearAndVanish({
  children,
  x,
  y,
  onDone,
}: {
  children: ReactNode;
  x: number;
  y: number;
  onDone: () => void;
}) {
  return (
    <motion.div
      css={css`
        position: absolute;
        pointer-events: none;
        left: 0;
        top: 0;
      `}
      initial={{ opacity: 0, x, y }}
      animate={{ opacity: [1, 0] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2.5 }}
      onAnimationComplete={() => onDone()}
    >
      {children}
    </motion.div>
  );
}

function SpinMove({
  children,
  x,
  y,
  onDone,
}: {
  children: ReactNode;
  x: number;
  y: number;
  onDone: () => void;
}) {
  const toRandom = getRandomPosition();
  const dx = toRandom.x - x;
  const dy = toRandom.y - y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const speed = 100;
  const duration = distance / speed;

  return (
    <motion.div
      css={css`
        position: absolute;
        pointer-events: none;
        left: 0;
        top: 0;
      `}
      initial={{
        opacity: 0,
        rotate: 0,
        x: x,
        y: y,
      }}
      animate={{
        x: toRandom.x,
        y: toRandom.y,
        opacity: [1, 0],
        rotate: 360,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: Math.min(duration, 2000), ease: "linear" }}
      onAnimationComplete={() => onDone()}
    >
      {children}
    </motion.div>
  );
}
