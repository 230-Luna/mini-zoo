import { AnimationWrapper } from "components/AnimationWrapper";
import { Flex } from "components/Flex";
import { Icon } from "components/Icon";
import { Spacing } from "components/Spacing";
import { Text } from "components/Text";
import { PracticeGaameStage } from "./PracticeGaameStage";

export function SequenceMemoryGameOnboardingPage() {
  return (
    <>
      <Spacing size={64} />
      <Flex justify="center">
        <Text typography="t1">연습하기</Text>
        <Icon name="nuleongSoobookz" size={40} />
      </Flex>
      <Spacing size={16} />
      <Flex justify="center">
        <AnimationWrapper type="flipItems">
          <Text typography="t2">나타나는 동물들의 순서를 기억하세요</Text>
        </AnimationWrapper>
      </Flex>
      <Spacing size={64} />
      <PracticeGaameStage />
    </>
  );
}
