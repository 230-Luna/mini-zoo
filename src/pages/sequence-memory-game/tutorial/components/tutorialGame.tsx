import { useEffect, useState } from "react";
import { GAME_BOX_HEIGHT } from "constants/layout";
import { DottedBox } from "pages/sequence-memory-game/common/components/DottedBox";
import { AnimatedIcon } from "pages/sequence-memory-game/common/components/animated-icon";
import { AppearanceEffect } from "pages/sequence-memory-game/common/models/Animations";

export const SequenceMemoryGameTutorialGame = ({
  onComplete,
}: {
  onComplete: () => void;
}) => {
  const [tutorialAnimatedAnimals, setTutorialAnimatedAnimals] = useState<
    {
      name: string;
      animation: {
        x: number;
        y: number;
        appearanceEffect: AppearanceEffect;
        delay: number;
        duration: number;
        isDone: boolean;
      };
    }[]
  >([
    {
      name: "hamsterFace",
      animation: {
        x: 200,
        y: 100,
        appearanceEffect: "fadeInOut",
        delay: 1500,
        duration: 2500,
        isDone: false,
      },
    },
    {
      name: "brownBearFace",
      animation: {
        x: 80,
        y: 200,
        appearanceEffect: "fadeInOut",
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
