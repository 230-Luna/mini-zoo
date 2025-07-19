import { AnimationWrapper } from "components/AnimationWrapper";
import { Card } from "components/Card";
import { Flex } from "components/Flex";
import { Icon } from "components/Icon";
import { Spacing } from "components/Spacing";
import { Text } from "components/Text";

export function HomePage() {
  return (
    <>
      <Spacing size={66} />
      <AnimationWrapper type="zoomIn">
        <Flex justify="center">
          <Text typography="title">미니쥬</Text>
          <Icon name="nuleongSoobookz" size={40} />
        </Flex>
      </AnimationWrapper>
      <Spacing size={155} />
      <Flex>
        <Card
          title="순서 기억하기"
          description="..점"
          thumbnail="newlyHatchedChick"
        />
        <Card title="???" thumbnail="questionMark" />
      </Flex>
    </>
  );
}
