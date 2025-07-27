import { Icon } from "components/Icon";
import { SequenceMemoryAnimationWrapper } from "./SequenceMemoryAnimationWrapper";
import { AnimalAppearanceInfo } from "pages/sequence-memory-game/common/models/Animations";
import { useState } from "react";
import { useTimeout } from "hooks/useTimeout";

export const AnimatedAnimalIcon = ({
  info,
  onDone,
}: {
  info: AnimalAppearanceInfo;
  onDone: () => void;
}) => {
  const [show, setShow] = useState(false);

  useTimeout(() => setShow(true), info.delay ?? 0);

  return show ? (
    <SequenceMemoryAnimationWrapper info={info} onDone={onDone}>
      <Icon name={info.icon} />
    </SequenceMemoryAnimationWrapper>
  ) : null;
};
