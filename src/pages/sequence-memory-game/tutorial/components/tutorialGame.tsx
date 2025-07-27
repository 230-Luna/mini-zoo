import { useEffect, useState } from "react";
import { TUTORIAL_GAME_BOX_HEIGHT } from "constants/layout";
import { AnimatedAnimalIcon } from "pages/sequence-memory-game/common/components/AnimatedAnimalIcon";
import { AnimalAppearanceInfo } from "pages/sequence-memory-game/common/models/Animations";
import { DottedBox } from "pages/sequence-memory-game/common/components/DottedBox";

export const SequenceMemoryGameTutorialGame = ({
  onComplete,
}: {
  onComplete: () => void;
}) => {
  const [showAnimalList, setSHowAnimalList] = useState<
    Record<string, AnimalAppearanceInfo>
  >(() => {
    return {
      "1": {
        id: "1",
        x: 250,
        y: 100,
        icon: "hamsterFace",
        animationName: "appearAndVanish",
        delay: 2000,
        isDone: false,
      },
      "2": {
        id: "2",
        x: 50,
        y: 150,
        icon: "brownBearFace",
        animationName: "spinMove",
        delay: 3500,
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
    <DottedBox height={TUTORIAL_GAME_BOX_HEIGHT}>
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
