import { motion } from "framer-motion";
import { css } from "@emotion/react";
import { useGetRandomAnimalIcon } from "pages/sequence-memory-game/common/hooks/useGetRandomAnimal";

type ShowSecondAnimalProps = {
  x: number;
  y: number;
  onDone?: () => void;
};

export const ShowSecondAnimal = ({ x, y, onDone }: ShowSecondAnimalProps) => {
  const fromX = 100 - x;
  const fromY = 100 - y;

  const secondAnimal = useGetRandomAnimalIcon();

  return (
    <motion.div
      css={css`
        position: absolute;
        width: 60px;
        height: 60px;
        pointer-events: none;
      `}
      initial={{
        left: `${fromX}vw`,
        top: `${fromY}vh`,
        opacity: 0,
        rotate: 0,
      }}
      animate={{
        left: `${x}vw`,
        top: `${y}vh`,
        opacity: 1,
        rotate: 360,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      onAnimationComplete={() => {
        setTimeout(() => {
          onDone?.();
        }, 300);
      }}
    >
      {" "}
      {secondAnimal}
    </motion.div>
  );
};
