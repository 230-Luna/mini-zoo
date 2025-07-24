import { useEffect, useState } from "react";
import { useTimeout } from "hooks/useTimeout";
import { Icon } from "components/Icon";
import { getRandomPosition } from "pages/sequence-memory-game/common/utils/position";
import {
  AnimationName,
  SequenceMemoryAnimationWrapper,
} from "pages/sequence-memory-game/common/components/SequenceMemoryAnimationWrapper";

export interface AnimalAppearanceInfo {
  x: number;
  y: number;
  icon: string;
  animationName: AnimationName;
  delay?: number;
}

export const SequenceMemoryGameTutorialGame = ({
  onDone,
}: {
  onDone: () => void;
}) => {
  const showAnimalList: AnimalAppearanceInfo[] = [
    {
      x: getRandomPosition().x,
      y: getRandomPosition().y,
      icon: "hamsterFace",
      animationName: "appearAndVanish",
      delay: 2000,
    },
    {
      x: getRandomPosition().x,
      y: getRandomPosition().y,
      icon: "brownBearFace",
      animationName: "spinMove",
      delay: 3500,
    },
  ];

  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    if (doneCount === showAnimalList.length) {
      onDone?.();
    }
  }, [doneCount, showAnimalList.length, onDone]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vW",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {showAnimalList.map((animalAppearanceInfo) => (
        <AnimalIcon
          key={animalAppearanceInfo.icon}
          info={animalAppearanceInfo}
          onDone={() => setDoneCount((prev) => prev + 1)}
        />
      ))}
    </div>
  );
};

function AnimalIcon({
  info,
  onDone,
}: {
  info: AnimalAppearanceInfo;
  onDone: () => void;
}) {
  const [show, setShow] = useState(false);

  useTimeout(() => setShow(true), info.delay ?? 0);

  return show ? (
    <SequenceMemoryAnimationWrapper info={info} onDone={onDone}>
      <Icon
        name={info.icon}
        css={{ position: "absolute", top: info.y, left: info.x }}
      />
    </SequenceMemoryAnimationWrapper>
  ) : null;
}
