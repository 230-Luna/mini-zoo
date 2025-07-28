import { Spacing } from "components/Spacing";
import { GAME_BOX_HEIGHT } from "constants/layout";
import { AnimatedAnimalIcon } from "pages/sequence-memory-game/common/components/AnimatedAnimalIcon";
import { DottedBox } from "pages/sequence-memory-game/common/components/DottedBox";
import { AnimatedAnimalInfo } from "pages/sequence-memory-game/common/models/Animations";
import {
  getRandomAppearanceEffect,
  getRandomMovementEffect,
  getRandomPosition,
} from "pages/sequence-memory-game/common/utils/animationModifiers";
import { getRandomAnimalIcon } from "pages/sequence-memory-game/common/utils/randomAnimal";
import { useState } from "react";

export const Test = () => {
  const [showAnimalList, setShowAnimalList] = useState<
    Record<string, AnimatedAnimalInfo>
  >(() => {
    const baseDelay = 1500;
    const animalMap: Record<string, AnimatedAnimalInfo> = {};

    for (let i = 1; i <= 10; i++) {
      const id = i.toString();
      const randomPosition = getRandomPosition();
      const randomAnimal = getRandomAnimalIcon();
      const appearanceEffect = getRandomAppearanceEffect();
      const movementEffect = getRandomMovementEffect();

      animalMap[id] = {
        id,
        x: randomPosition.x,
        y: randomPosition.y,
        icon: randomAnimal,
        appearanceEffect: appearanceEffect,
        movementEffect: movementEffect,
        level: i,
        delay: baseDelay * i,
        isDone: false,
      };
    }

    return animalMap;
  });

  return (
    <>
      <Spacing size={84} />
      <DottedBox height={GAME_BOX_HEIGHT}>
        {Object.entries(showAnimalList).map(([id, animalAppearanceInfo]) => (
          <AnimatedAnimalIcon
            key={animalAppearanceInfo.icon}
            animatedAnimalInfo={animalAppearanceInfo}
            onAnimationComplete={() => {
              setShowAnimalList((prev) => ({
                ...prev,
                [id]: { ...animalAppearanceInfo, isDone: true },
              }));
            }}
          />
        ))}
      </DottedBox>
    </>
  );
};
