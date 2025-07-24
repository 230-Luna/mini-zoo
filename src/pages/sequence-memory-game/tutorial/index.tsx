import { AnimationWrapper } from "components/AnimationWrapper";
import { Flex } from "components/Flex";
import { Icon } from "components/Icon";
import { Spacing } from "components/Spacing";
import { Text } from "components/Text";
import { SequenceMemoryGameTutorialGame } from "./tutorialGame";
import { useRouter } from "next/router";
import { RouteUrls } from "utils/router";

export function SequenceMemoryGameTutorialPage() {
  const router = useRouter();

  const handleTutorialGameDone = () => {
    router.push(RouteUrls.sequenceMemoryGame.tutorial.answer());
  };

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
      <SequenceMemoryGameTutorialGame onDone={handleTutorialGameDone} />
    </>
  );
}
