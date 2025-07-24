import { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import { css } from "@emotion/react";
import { AnimalAppearanceInfo } from "pages/sequence-memory-game/tutorial/tutorialGame";
import { getRandomPosition } from "pages/sequence-memory-game/common/utils/position";

export type AnimationName = "appearAndVanish" | "spinMove";

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
  useEffect(() => {
    const timer = setTimeout(onDone, 1000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      css={css`
        position: absolute;
        left: ${x}vw;
        top: ${y}vh;
        pointer-events: none;
      `}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2.5 }}
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

  useEffect(() => {
    const timer = setTimeout(onDone, 1000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      css={css`
        position: absolute;
        pointer-events: none;
      `}
      initial={{
        left: `${x}vw`,
        top: `${y}vh`,
        opacity: 0,
        rotate: 0,
      }}
      animate={{
        left: `${toRandom.x}vw`,
        top: `${toRandom.y}vh`,
        opacity: 1,
        rotate: 360,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {children}
    </motion.div>
  );
}
