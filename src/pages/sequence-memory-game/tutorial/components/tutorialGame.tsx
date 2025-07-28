import { useEffect, useState } from "react";
import { GAME_BOX_HEIGHT } from "constants/layout";
import { AnimatedAnimalIcon } from "pages/sequence-memory-game/common/components/AnimatedAnimalIcon";
import { AnimatedAnimalInfo } from "pages/sequence-memory-game/common/models/Animations";
import { DottedBox } from "pages/sequence-memory-game/common/components/DottedBox";

export const SequenceMemoryGameTutorialGame = ({
  onComplete,
}: {
  onComplete: () => void;
}) => {
  const [showAnimalList, setSHowAnimalList] = useState<
    Record<string, AnimatedAnimalInfo>
  >(() => {
    return {
      "1": {
        id: "1",
        x: 200,
        y: 100,
        icon: "hamsterFace",
        animationName: "fadeInOut",
        delay: 1500,
        duration: 1.7,
        isDone: false,
      },
      "2": {
        id: "2",
        x: 80,
        y: 200,
        icon: "brownBearFace",
        animationName: "fadeInOut",
        delay: 3200,
        duration: 1.7,
        isDone: false,
      },
    };
  });

  useEffect(() => {
    if (
      Object.values(showAnimalList).every((animal) => animal.isDone === true)
    ) {
      onComplete();
    }
  }, [showAnimalList, onComplete]);

  return (
    <DottedBox height={GAME_BOX_HEIGHT}>
      {Object.entries(showAnimalList).map(([id, animalAppearanceInfo]) => (
        <AnimatedAnimalIcon
          key={animalAppearanceInfo.icon}
          info={animalAppearanceInfo}
          onAnimationComplete={() => {
            setSHowAnimalList((prev) => ({
              ...prev,
              [id]: { ...animalAppearanceInfo, isDone: true },
            }));
          }}
        />
      ))}
    </DottedBox>
  );
};
