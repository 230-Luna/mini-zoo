import { AnimationWrapper } from "components/AnimationWrapper";
import { BottomButton } from "components/BottomButton";
import { Flex } from "components/Flex";
import { Icon } from "components/Icon";

import { Spacing } from "components/Spacing";
import { Text } from "components/Text";
import { useRouter } from "next/router";
import { RouteUrls } from "utils/router";
import { sequenceMemoryGameScoreStorage } from "../common/utils/score-storage";
import { usePrefetchPages } from "hooks/usePrefetchPages";
import { usePrefetchImages } from "hooks/usePrefetchImages";
import { emojiFiles } from "constants/emoji";

export function SequenceMemoryGameIntroPage() {
  const router = useRouter();
  usePrefetchPages([
    RouteUrls.sequenceMemoryGame.tutorial.index(),
    RouteUrls.sequenceMemoryGame.playing(),
  ]);

  const { status: imagePrefetchingStatus } = usePrefetchImages(
    emojiFiles.map((emojiFile) => `/emoji/${emojiFile}`)
  );

  return (
    <>
      <Spacing size={64} />
      <Flex justify="center">
        <Text typography="t1">미니쥬</Text>
        <Icon name="nuleongSoobookz" />
      </Flex>
      <Spacing size={16} />
      <Flex justify="center">
        <AnimationWrapper type="flipItems">
          <Text typography="t2">순서 기억하기</Text>
        </AnimationWrapper>
      </Flex>
      <Spacing size={140} />
      <Flex justify="center">
        <AnimationWrapper type="shake">
          <Icon name="newlyHatchedChick" size={100} />
        </AnimationWrapper>
      </Flex>
      <BottomButton
        loading={imagePrefetchingStatus !== "DONE"}
        onClick={() => {
          if (sequenceMemoryGameScoreStorage.get() === null) {
            router.push(RouteUrls.sequenceMemoryGame.tutorial.index());
          } else {
            router.push(RouteUrls.sequenceMemoryGame.playing());
          }
        }}
      >
        시작하기
      </BottomButton>
    </>
  );
}
