import { useState } from "react";
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
        fromX: 230,
        fromY: 200,
        effect: "fadeInOut",
        delay: 1500,
        duration: 2500,
      },
    },
    {
      name: "brownBearFace",
      animation: {
        fromX: 80,
        fromY: 130,
        effect: "fadeInOut",
        delay: 3200,
        duration: 2500,
      },
    },
  ]);

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
                      },
                    }
                  : animal
              )
            );
            if (index === tutorialAnimatedAnimals.length - 1) {
              onComplete();
            }
          }}
        />
      ))}
    </DottedBox>
  );
};
