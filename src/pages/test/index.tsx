import { Spacing } from "components/Spacing";
import { GAME_BOX_HEIGHT } from "constants/layout";
import { AnimatedAnimalIcon } from "pages/sequence-memory-game/common/components/AnimatedAnimalIcon";
import { DottedBox } from "pages/sequence-memory-game/common/components/DottedBox";
import { AnimatedAnimalInfo } from "pages/sequence-memory-game/common/models/Animations";
import {
  getDurationByLevel,
  getRandomAppearanceEffect,
  getRandomMovementEffect,
  getRandomPosition,
  getSpeedByLevel,
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
      // const appearanceEffect = getRandomAppearanceEffect();
      const movementEffect = getRandomMovementEffect();
      const level = i;
      const speed = getSpeedByLevel(level);
      const duration = getDurationByLevel(level);

      animalMap[id] = {
        id,
        x: randomPosition.x,
        y: randomPosition.y,
        icon: randomAnimal,
        appearanceEffect: "shake",
        movementEffect: movementEffect,
        delay: baseDelay * i,
        duration,
        speed,
        isDone: false,
      };
    }

    return animalMap;
  });
  console.log(showAnimalList);

  return (
    <>
      <Spacing size={84} />
      <DottedBox height={GAME_BOX_HEIGHT}>
        {Object.entries(showAnimalList).map(([id, animalAppearanceInfo]) => (
          <AnimatedAnimalIcon
            key={id}
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
