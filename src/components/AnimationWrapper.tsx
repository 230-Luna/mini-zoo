import { useAnimation } from "motion/react";
import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { useInterval } from "hooks/useInterval";
import { BASE_DELAY } from "pages/sequence-memory-game/common/constants/game";
import { fontSize } from "./Text";
import { colors } from "constants/colors";

type AnimationType =
  | "zoomIn"
  | "lowScaleOnTap"
  | "highScaleOnTap"
  | "flipItems"
  | "shake"
  | "wave"
  | "textWave";

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
  if (type === "wave") {
    return <WaveAnimation>{children}</WaveAnimation>;
  }
  if (type === "textWave") {
    return <TextWaveAnimation>{children}</TextWaveAnimation>;
  }

  throw new Error("정의되지 않은 애니메이션 타입입니다");
}

function ZoomInAnimation({ children }: { children: ReactNode }) {
  const controls = useAnimation();

  useEffect(() => {
    async function sequence() {
      await controls.start({ scale: 1.3 }, { type: "spring" });
      await controls.start({ scale: 1 }, { type: "spring" });
    }

    sequence();
  }, [controls]);

  return (
    <motion.div initial={{ scale: 0.1 }} animate={controls}>
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
  interval = BASE_DELAY,
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
          transition={{ duration: 0.7 }}
        >
          {childArray[currentIndex]}
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

function WaveAnimation({ children }: { children: ReactNode }) {
  return (
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}

function TextWaveAnimation({ children }: { children: ReactNode }) {
  const getTypographyFromChildren = (node: ReactNode): string => {
    if (isValidElement(node)) {
      const element = node as ReactElement<{
        typography?: string;
        children?: ReactNode;
      }>;

      if (
        element.type &&
        typeof element.type === "function" &&
        element.type.name === "Text"
      ) {
        return element.props.typography || "t2";
      }

      if (element.props.children) {
        const childTypography = getTypographyFromChildren(
          element.props.children
        );
        if (childTypography) return childTypography;
      }
    }

    if (Array.isArray(node)) {
      for (const child of node) {
        const childTypography = getTypographyFromChildren(child);
        if (childTypography) return childTypography;
      }
    }

    return "t2";
  };

  const typography = getTypographyFromChildren(children);
  const currentFontSize =
    fontSize[typography as keyof typeof fontSize] || fontSize.t2;

  const processTextContent = (
    node: ReactNode,
    startDelay: number = 0
  ): ReactNode => {
    if (typeof node === "string" || typeof node === "number") {
      const text = String(node);
      return Array.from(text).map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 600,
            delay: Math.round((startDelay + index * 0.05) * 100) / 100,
          }}
          style={{
            display: "inline-block",
            color: colors.brown900,
            fontSize: currentFontSize,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ));
    }

    if (Array.isArray(node)) {
      let currentDelay = startDelay;

      return node.map((child, index) => {
        const processed = processTextContent(child, currentDelay);

        if (typeof child === "string" || typeof child === "number") {
          currentDelay += String(child).length * 0.05 + 0.2;
        } else if (
          isValidElement(child) &&
          typeof (child.props as { children?: unknown })?.children === "string"
        ) {
          currentDelay +=
            String((child.props as { children?: unknown }).children).length *
              0.05 +
            0.2;
        } else {
          currentDelay += 0.2;
        }

        return <Fragment key={index}>{processed}</Fragment>;
      });
    }

    if (isValidElement(node)) {
      const element = node as ReactElement<{ children: ReactNode }>;
      return cloneElement(element, {
        ...element.props,
        children: processTextContent(element.props.children, startDelay),
      });
    }

    return null;
  };

  return <motion.div>{processTextContent(children)}</motion.div>;
}
