import { Spacing } from "components/Spacing";
import { GAME_BOX_HEIGHT } from "constants/layout";
import { AnimatedIcon } from "pages/sequence-memory-game/common/components/animated-icon";
import { DottedBox } from "pages/sequence-memory-game/common/components/DottedBox";
import { effects } from "pages/sequence-memory-game/common/constants/appearanceEffects";
import { emojiAnimalFaceList } from "pages/sequence-memory-game/common/constants/emojiAnimalFaceList";
import { MAX_GAME_LEVEL } from "pages/sequence-memory-game/common/constants/game";
import { Animation } from "pages/sequence-memory-game/common/models/Animations";
import {
  getDurationByLevel,
  getRandomGameBoxPosition,
} from "pages/sequence-memory-game/common/utils/animationModifiers";
import { useState } from "react";
import { getRandomItem } from "utils/random";

export const Test = () => {
  const [showAnimalList, setShowAnimalList] = useState<
    Record<string, Animation>
  >(() => {
    const baseDelay = 1500;
    const animalMap: Record<string, Animation> = {};

    for (let i = 1; i <= MAX_GAME_LEVEL; i++) {
      const id = i.toString();
      const randomPosition = getRandomGameBoxPosition();
      const appearanceEffect = getRandomItem(effects);
      const level = i;
      const duration = getDurationByLevel(level);

      animalMap[id] = {
        fromX: randomPosition.x,
        fromY: randomPosition.y,
        effect: appearanceEffect,
        delay: baseDelay * i,
        duration,
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
                [id]: { ...animation },
              }));
            }}
          />
        ))}
      </DottedBox>
    </>
  );
};
