import { Icon } from "components/Icon";
import { AnimationWrapper } from "./AnimationWrapper";
import { AnimatedAnimalInfo } from "pages/sequence-memory-game/common/models/Animations";
import { useState } from "react";
import { useTimeout } from "hooks/useTimeout";

export function AnimatedAnimalIcon({
  animatedAnimalInfo,
  onAnimationComplete,
}: {
  animatedAnimalInfo: AnimatedAnimalInfo;
  onAnimationComplete: () => void;
}) {
  const [show, setShow] = useState(false);

  useTimeout(() => setShow(true), animatedAnimalInfo.delay ?? 0);

  return show ? (
    <AnimationWrapper
      animatedAnimalInfo={animatedAnimalInfo}
      onAnimationComplete={onAnimationComplete}
    >
      <Icon name={animatedAnimalInfo.icon} />
    </AnimationWrapper>
  ) : null;
}
