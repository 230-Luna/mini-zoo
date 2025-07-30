import { Spacing } from "components/Spacing";
import { GAME_BOX_HEIGHT } from "constants/layout";
import { AnimatedIcon } from "pages/sequence-memory-game/common/components/animated-icon";
import { DottedBox } from "pages/sequence-memory-game/common/components/DottedBox";
import { emojiAnimalFaceList } from "pages/sequence-memory-game/common/constants/emojiAnimalFaceList";
import { MAX_GAME_LEVEL } from "pages/sequence-memory-game/common/constants/gameParams";
import { Animation } from "pages/sequence-memory-game/common/models/Animations";
import {
  getDurationByLevel,
  getRandomAppearanceEffect,
  getRandomPosition,
} from "pages/sequence-memory-game/common/utils/animationModifiers";
import { useState } from "react";
import { getRandomItem } from "utils/function";

export const Test = () => {
  const [showAnimalList, setShowAnimalList] = useState<
    Record<string, Animation>
  >(() => {
    const baseDelay = 1500;
    const animalMap: Record<string, Animation> = {};

    for (let i = 1; i <= MAX_GAME_LEVEL; i++) {
      const id = i.toString();
      const randomPosition = getRandomPosition();
      const appearanceEffect = getRandomAppearanceEffect();
      const level = i;
      const duration = getDurationByLevel(level);

      animalMap[id] = {
        x: randomPosition.x,
        y: randomPosition.y,
        appearanceEffect,
        delay: baseDelay * i,
        duration,
        isDone: false,
      };
    }

    return animalMap;
  });
  const randomAnimalIcon = getRandomItem(emojiAnimalFaceList);

  return (
    <>
      <Spacing size={84} />
      <DottedBox height={GAME_BOX_HEIGHT}>
        {Object.entries(showAnimalList).map(([id, animation]) => (
          <AnimatedIcon
            key={id}
            name={randomAnimalIcon}
            animation={animation}
            onAnimationComplete={() => {
              setShowAnimalList((prev) => ({
                ...prev,
                [id]: { ...animation, isDone: true },
              }));
            }}
          />
        ))}
      </DottedBox>
    </>
  );
};
