import { AnimationWrapper } from "components/AnimationWrapper";
import { Card } from "components/Card";
import { ClientOnly } from "components/ClientOnly";
import { Flex } from "components/Flex";
import { Icon } from "components/Icon";
import { Spacing } from "components/Spacing";
import { Text } from "components/Text";
import { useAlertDialog } from "hooks/useAlertDialog";
import { useRouter } from "next/router";
import { sequenceMemoryGameScoreStorage } from "pages/sequence-memory-game/common/utils/score-storage";
import { RouteUrls } from "utils/router";

export function HomePage() {
  const alertDialog = useAlertDialog();

  const handleComingSoonClick = async () => {
    await alertDialog.open({
      content: "다음 게임을 준비 중이에요",
      confirmButtonText: "확인",
    });
  };

  return (
    <>
      <Spacing size={64} />
      <AnimationWrapper type="zoomIn">
        <Flex justify="center">
          <Text typography="t1">미니쥬</Text>
          <Icon name="nuleongSoobookz" />
        </Flex>
      </AnimationWrapper>
      <Spacing size={120} />
      <Flex>
        <ClientOnly
          fallback={
            <Card
              title="순서 기억하기"
              description="?점"
              thumbnail="newlyHatchedChick"
            />
          }
        >
          <SequenceMemoryGameCard />
        </ClientOnly>
        <Card
          title="???"
          thumbnail="questionMark"
          onClick={handleComingSoonClick}
        />
      </Flex>
    </>
  );
}

function SequenceMemoryGameCard() {
  const router = useRouter();

  return (
    <Card
      title="순서 기억하기"
      description={`${sequenceMemoryGameScoreStorage.get() ?? "?"}점`}
      thumbnail="newlyHatchedChick"
      onClick={() => router.push(RouteUrls.sequenceMemoryGame.intro())}
    />
  );
}
