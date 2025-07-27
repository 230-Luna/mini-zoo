import { Icon } from "components/Icon";
import { SequenceMemoryAnimationWrapper } from "./SequenceMemoryAnimationWrapper";
import { AnimalAppearanceInfo } from "pages/sequence-memory-game/common/models/Animations";
import { useState } from "react";
import { useTimeout } from "hooks/useTimeout";

export const AnimatedAnimalIcon = ({
  info,
  onAnimationComplete,
}: {
  info: AnimalAppearanceInfo;
  onAnimationComplete: () => void;
}) => {
  const [show, setShow] = useState(false);

  useTimeout(() => setShow(true), info.delay ?? 0);

  return show ? (
    <SequenceMemoryAnimationWrapper
      info={info}
      onAnimationComplete={onAnimationComplete}
    >
      <Icon name={info.icon} />
    </SequenceMemoryAnimationWrapper>
  ) : null;
};
