import { motion } from "framer-motion";
import { css } from "@emotion/react";
import { useGetRandomAnimalIcon } from "pages/sequence-memory-game/common/hooks/useGetRandomAnimal";

type ShowFirstAnimalProps = {
  x: number;
  y: number;
  onDone: () => void;
};

export const ShowFirstAnimal = ({ x, y, onDone }: ShowFirstAnimalProps) => {
  const firstAnimal = useGetRandomAnimalIcon();

  return (
    <motion.div
      css={css`
        position: absolute;
        left: ${x}vw;
        top: ${y}vh;
        width: 50px;
        height: 50px;
        pointer-events: none;
      `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={(definition) => {
        if (definition === "exit") onDone();
      }}
    >
      {firstAnimal}
    </motion.div>
  );
};
