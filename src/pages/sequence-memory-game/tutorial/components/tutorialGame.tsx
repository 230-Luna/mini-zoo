import { useEffect, useState } from "react";
import { GAME_BOX_HEIGHT } from "constants/layout";
import { DottedBox } from "pages/sequence-memory-game/common/components/DottedBox";
import { AnimatedIcon } from "pages/sequence-memory-game/common/components/animated-icon";
import { Effects } from "pages/sequence-memory-game/common/models/Animations";

interface TutorialAnimatedAnimals {
  name: string;
  animation: {
    fromX: number;
    fromY: number;
    effect: Effects;
    delay: number;
    duration: number;
    isDone: boolean;
  };
}

export const SequenceMemoryGameTutorialGame = ({
  onComplete,
}: {
  onComplete: () => void;
}) => {
  const [tutorialAnimatedAnimals, setTutorialAnimatedAnimals] = useState<
    TutorialAnimatedAnimals[]
  >([
    {
      name: "hamsterFace",
      animation: {
        fromX: 200,
        fromY: 100,
        effect: "fadeInOut",
        delay: 1500,
        duration: 2500,
        isDone: false,
      },
    },
    {
      name: "brownBearFace",
      animation: {
        fromX: 80,
        fromY: 200,
        effect: "fadeInOut",
        delay: 3200,
        duration: 2500,
        isDone: false,
      },
    },
  ]);

  useEffect(() => {
    if (
      tutorialAnimatedAnimals.every(
        (animatedAnimal) => animatedAnimal.animation.isDone === true
      )
    ) {
      onComplete();
    }
  }, [tutorialAnimatedAnimals, onComplete]);

  return (
    <DottedBox height={GAME_BOX_HEIGHT}>
      {tutorialAnimatedAnimals.map((animatedAnimal, index) => (
        <AnimatedIcon
          key={index}
          name={animatedAnimal.name}
          animation={animatedAnimal.animation}
          onAnimationComplete={() => {
            setTutorialAnimatedAnimals((prev) =>
              prev.map((animal, i) =>
                i === index
                  ? {
                      ...animal,
                      animation: {
                        ...animal.animation,
                        isDone: true,
                      },
                    }
                  : animal
              )
            );
          }}
        />
      ))}
    </DottedBox>
  );
};
