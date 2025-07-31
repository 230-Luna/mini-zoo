import { AnimationWrapper } from "components/AnimationWrapper";
import { Flex } from "components/Flex";
import { Icon } from "components/Icon";
import { Spacing } from "components/Spacing";
import { Text } from "components/Text";
import { ANSWER_BOX_HEIGHT } from "constants/layout";
import { useState } from "react";
import { match } from "ts-pattern";
import { noop } from "utils/function";
import { IconButton } from "components/IconButton";
import { BottomButton } from "components/BottomButton";
import { useRouter } from "next/router";
import { RouteUrls } from "utils/router";
import { chunk } from "es-toolkit";
import { DottedBox } from "pages/sequence-memory-game/common/components/DottedBox";

export const SequenceMemoryGameTutorialAnswer = () => {
  const [tutorialFlow, setTutorialFlow] = useState<
    | "INITIAL"
    | "USER_CLICKED_KOALA"
    | "USER_RESTORED_KOALA"
    | "USER_CLICKED_HAMSTER"
    | "USER_CLICKED_BEAR"
  >("INITIAL");

  const router = useRouter();

  return (
    <>
      <Spacing size={64} />
      <Flex justify="center">
        <Text typography="t1">연습하기</Text>
        <Icon name="nuleongSoobookz" />
      </Flex>
      <Spacing size={16} />

      {match(tutorialFlow)
        .with("INITIAL", () => (
          <>
            <Flex justify="center" css={{ textAlign: "center" }}>
              <AnimationWrapper type="flipItems">
                <Text typography="t2">
                  나타나는 동물을 순서대로 선택해봅시다
                  <br />
                  코알라를 선택해보세요
                </Text>
              </AnimationWrapper>
            </Flex>
            <Spacing size={64} />
            <Flex justify="space-around">
              <IconButton name="questionMark" size={80} />
              <IconButton name="questionMark" size={80} />
            </Flex>
            <Spacing size={56} />
            <AnswerOptions
              onClickItem={({ iconType }) => {
                if (iconType !== "koalaFace") {
                  return;
                }

                setTutorialFlow("USER_CLICKED_KOALA");
              }}
            />
          </>
        ))
        .with("USER_CLICKED_KOALA", () => (
          <>
            <Flex justify="center" css={{ textAlign: "center" }}>
              <AnimationWrapper type="flipItems">
                <Text typography="t2">
                  삐익! 틀렸어요
                  <br />
                  코알라를 선택해서 되돌려보세요
                </Text>
              </AnimationWrapper>
            </Flex>
            <Spacing size={64} />
            <Flex justify="space-around">
              <IconButton
                name="koalaFace"
                size={80}
                onClick={() => setTutorialFlow("USER_RESTORED_KOALA")}
              />
              <IconButton name="questionMark" size={80} />
            </Flex>
            <Spacing size={56} />
            <AnswerOptions />
          </>
        ))
        .with("USER_RESTORED_KOALA", () => (
          <>
            <Flex justify="center" css={{ textAlign: "center" }}>
              <AnimationWrapper type="flipItems">
                <Text typography="t2">햄스터를 선택해보세요</Text>
              </AnimationWrapper>
            </Flex>
            <Spacing size={64} />
            <Flex justify="space-around">
              <IconButton name="questionMark" size={80} />
              <IconButton name="questionMark" size={80} />
            </Flex>
            <Spacing size={56} />
            <AnswerOptions
              onClickItem={({ iconType }) => {
                if (iconType !== "hamsterFace") {
                  return;
                }
                setTutorialFlow("USER_CLICKED_HAMSTER");
              }}
            />
          </>
        ))
        .with("USER_CLICKED_HAMSTER", () => (
          <>
            <Flex justify="center" css={{ textAlign: "center" }}>
              <AnimationWrapper type="flipItems">
                <Text typography="t2">
                  딩동댕~ 맞았어요
                  <br />
                  갈색 곰을 선택해보세요
                </Text>
              </AnimationWrapper>
            </Flex>
            <Spacing size={64} />
            <Flex justify="space-around">
              <IconButton name="hamsterFace" size={80} />
              <IconButton name="questionMark" size={80} />
            </Flex>
            <Spacing size={56} />
            <AnswerOptions
              onClickItem={({ iconType }) => {
                if (iconType !== "brownBearFace") {
                  return;
                }
                setTutorialFlow("USER_CLICKED_BEAR");
              }}
            />
          </>
        ))
        .with("USER_CLICKED_BEAR", () => (
          <>
            <Flex justify="center" css={{ textAlign: "center" }}>
              <AnimationWrapper type="flipItems">
                <Text typography="t2">
                  잘했어요!
                  <br />
                  자, 이제 게임을 하러 가볼까요?
                </Text>
              </AnimationWrapper>
            </Flex>
            <Spacing size={64} />
            <Flex justify="space-around">
              <IconButton name="hamsterFace" size={80} />
              <IconButton name="brownBearFace" size={80} />
            </Flex>
            <Spacing size={56} />
            <AnswerOptions />
            <BottomButton
              onClick={() =>
                router.push(RouteUrls.sequenceMemoryGame.playing())
              }
            >
              시작하기
            </BottomButton>
          </>
        ))
        .exhaustive()}
    </>
  );
};

function AnswerOptions({
  onClickItem = noop,
}: {
  onClickItem?: (params: { iconType: string }) => void;
}) {
  const iconTypes = [
    "foxFace",
    "hamsterFace",
    "chickenFace",
    "horseFace",
    "brownBearFace",
    "koalaFace",
  ];
  return (
    <DottedBox height={ANSWER_BOX_HEIGHT}>
      <Flex direction="column" justify="space-evenly" css={{ height: "100%" }}>
        {chunk(iconTypes, 3).map((iconTypes, idx) => (
          <Flex justify="space-evenly" key={idx}>
            {iconTypes.map((iconType) => (
              <IconButton
                key={iconType}
                name={iconType}
                onClick={() => onClickItem({ iconType })}
              />
            ))}
          </Flex>
        ))}
      </Flex>
    </DottedBox>
  );
}
