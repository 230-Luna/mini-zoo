import { useAnimation } from "motion/react";
import { ReactNode, useEffect } from "react";
import { motion } from "motion/react";

type AnimationType = "zoomIn" | "scaleOnTap";

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
  if (type === "scaleOnTap") {
    return <ScaleAnimation>{children}</ScaleAnimation>;
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

function ScaleAnimation({ children }: { children: ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
      {children}
    </motion.div>
  );
}
