import { useAnimation } from "motion/react";
import { Children, ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useInterval } from "hooks/useInterval";

type AnimationType =
  | "zoomIn"
  | "lowScaleOnTap"
  | "highScaleOnTap"
  | "flipItems"
  | "shake";

export function AnimationWrapper({
  children,
  type,
}: {
  children: ReactNode;
  type: AnimationType;
}) {
  if (type === "zoomIn") {
    return <ZoomInAnimation>{children}</ZoomInAnimation>;
  }
  if (type === "lowScaleOnTap") {
    return <ScaleAnimation level="low">{children}</ScaleAnimation>;
  }
  if (type === "highScaleOnTap") {
    return <ScaleAnimation level="high">{children}</ScaleAnimation>;
  }
  if (type === "flipItems") {
    return <FlipItemsAnimation>{children}</FlipItemsAnimation>;
  }
  if (type === "shake") {
    return <ShakeAnimation>{children}</ShakeAnimation>;
  }

  throw new Error("정의되지 않은 애니메이션 타입입니다");
}

function ZoomInAnimation({ children }: { children: ReactNode }) {
  const controls = useAnimation();

  useEffect(() => {
    async function sequence() {
      await controls.start({ scale: 2 }, { type: "spring" });
      await controls.start({ scale: 1 }, { type: "spring" });
    }

    sequence();
  }, [controls]);

  return (
    <motion.div initial={{ scale: 0.2 }} animate={controls}>
      {children}
    </motion.div>
  );
}

function ScaleAnimation({
  children,
  level,
}: {
  children: ReactNode;
  level: "low" | "high";
}) {
  if (level === "low") {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        {children}
      </motion.div>
    );
  }
  if (level === "high") {
    return (
      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
        {children}
      </motion.div>
    );
  }

  throw new Error("정의되지 않은 level 입니다");
}

function FlipItemsAnimation({
  children,
  interval = 2000,
}: {
  children: ReactNode;
  interval?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const childArray = Children.toArray(children);

  useInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % childArray.length);
  }, interval);

  return (
    <>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function ShakeAnimation({ children }: { children: ReactNode }) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      rotate: [0, -1, -5, 10, -15, 10, -5, 0],
      transformOrigin: "center",
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
      },
    });
  }, [controls]);

  return <motion.div animate={controls}>{children}</motion.div>;
}
