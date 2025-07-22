import { useState } from "react";

import { useTimeout } from "hooks/useTimeout";
import { AnimationWrapper } from "components/AnimationWrapper";
import { Icon } from "components/Icon";
import { getRandomPosition } from "pages/sequence-memory-game/common/utils/position";
import { useGetRandomAnimalIcon } from "pages/sequence-memory-game/common/hooks/useGetRandomAnimal";

interface Animal {
  x: number;
  y: number;
  icon: string;
  animationName: string;
  delay: number;
}

export const PracticeGaameStage = () => {
  const showAnimalList: Animal[] = [
    {
      x: getRandomPosition().x,
      y: getRandomPosition().y,
      icon: useGetRandomAnimalIcon(),
      animationName: "zoomIn",
      delay: 2000,
    },
    {
      x: getRandomPosition().x,
      y: getRandomPosition().y,
      icon: useGetRandomAnimalIcon(),
      animationName: "zoomIn",
      delay: 4000,
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {showAnimalList.map((animal) => (
        <AnimalIcon key={animal.icon} animal={animal} />
      ))}
    </div>
  );
};

function AnimalIcon({
  animal: { x, y, icon, animationName, delay },
}: {
  animal: Animal;
}) {
  const [show, setShow] = useState(false);
  useTimeout(() => setShow(true), delay);

  return show ? (
    <AnimationWrapper type={animationName}>
      <Icon name={icon} css={{ position: "absolute", top: y, left: x }} />
    </AnimationWrapper>
  ) : null;
}
