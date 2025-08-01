import { useState } from "react";
import { useTimeout } from "hooks/useTimeout";
import { Icon } from "components/Icon";
import { Animation } from "../../models/Animations";
import { AnimalAnimationWrapper } from "./components/AnimalAnimationWrapper";

export function AnimatedIcon({
  name,
  animation,
  onAnimationComplete,
}: {
  name: string;
  animation: Animation;
  onAnimationComplete: () => void;
}) {
  const [show, setShow] = useState(false);

  useTimeout(() => setShow(true), animation.delay ?? 0);

  return show ? (
    <AnimalAnimationWrapper
      animation={animation}
      onAnimationComplete={onAnimationComplete}
    >
      <Icon name={name} />
    </AnimalAnimationWrapper>
  ) : null;
}
