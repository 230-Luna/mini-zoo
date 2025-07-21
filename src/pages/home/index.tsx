import { AnimationWrapper } from "components/AnimationWrapper";
import { Card } from "components/Card";
import { Flex } from "components/Flex";
import { Icon } from "components/Icon";
import { Spacing } from "components/Spacing";
import { Text } from "components/Text";
import { useRouter } from "next/router";
import { RouteUrls } from "utils/router";

export function HomePage() {
  const router = useRouter();

  return (
    <>
      <Spacing size={64} />
      <AnimationWrapper type="zoomIn">
        <Flex justify="center">
          <Text typography="t1">미니쥬</Text>
          <Icon name="nuleongSoobookz" size={40} />
        </Flex>
      </AnimationWrapper>
      <Spacing size={120} />
      <Flex>
        <Card
          title="순서 기억하기"
          description="..점"
          thumbnail="newlyHatchedChick"
          onClick={() => router.push(RouteUrls.sequenceMemoryGame.intro())}
        />
        <Card title="???" thumbnail="questionMark" />
      </Flex>
    </>
  );
}
