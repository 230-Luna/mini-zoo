import { AnimationWrapper } from "components/AnimationWrapper";
import { BottomButton } from "components/BottomButton";
import { Flex } from "components/Flex";
import { Icon } from "components/Icon";

import { Spacing } from "components/Spacing";
import { Text } from "components/Text";
import { useRouter } from "next/router";
import { RouteUrls } from "utils/router";

export function SequenceMemoryGameIntroPage() {
  const router = useRouter();

  return (
    <>
      <Spacing size={66} />
      <Flex justify="center">
        <Text typography="t1">미니쥬</Text>
        <Icon name="nuleongSoobookz" size={40} />
      </Flex>
      <Flex justify="center">
        <AnimationWrapper type="flipItems">
          <Text typography="t2">순서 기억하기</Text>
        </AnimationWrapper>
      </Flex>
      <Spacing size={155} />
      <Flex justify="center">
        <AnimationWrapper type="shake">
          <Icon name="newlyHatchedChick" size={100} />
        </AnimationWrapper>
      </Flex>
      <BottomButton
        onClick={() => router.push(RouteUrls.sequenceMemoryGame.onboarding())}
      >
        시작하기
      </BottomButton>
    </>
  );
}
