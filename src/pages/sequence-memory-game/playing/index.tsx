import { AnimationWrapper } from "components/AnimationWrapper";
import { Flex } from "components/Flex";
import { Spacing } from "components/Spacing";
import { Text } from "components/Text";
import { useEffect, useState } from "react";
import { match } from "ts-pattern";
import { DottedBox } from "../common/components/DottedBox";
import { useTimeout } from "hooks/useTimeout";
import { Icon } from "components/Icon";
import { BottomButton } from "components/BottomButton";
import { useRouter } from "next/router";
import { RouteUrls } from "utils/router";
import { sequenceMemoryGameScoreStorage } from "../common/utils/score-storage";
import { ANSWER_BOX_HEIGHT, GAME_BOX_HEIGHT } from "constants/layout";
import { AnimatedAnimalIcon } from "../common/components/AnimatedAnimalIcon";
import { AnimatedAnimalInfo } from "../common/models/Animations";
import { IconButton } from "components/IconButton";
import { chunk } from "es-toolkit";
import { noop } from "utils/function";

export function SequenceMemoryGamePlayingPage() {
  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState(0);
  const router = useRouter();

  return (
    <>
      <Spacing size={64} />
      <Flex justify="center">
        <Text typography="t1">순서 기억하기</Text>
        <Icon name="nuleongSoobookz" />
      </Flex>
      <Spacing size={16} />
      <Stage
        key={level}
        level={level}
        onComplete={({ gameResult }) => {
          const maxScore = sequenceMemoryGameScoreStorage.get();

          if (gameResult === "SUCCESS") {
            const currentScore = score + 1;

            if (maxScore == null || maxScore < currentScore) {
              sequenceMemoryGameScoreStorage.set(currentScore);
            }

            setScore(currentScore);
            setLevel((prev) => prev + 1);
          } else {
            if (maxScore == null) {
              sequenceMemoryGameScoreStorage.set(score);
            }
            router.push(RouteUrls.home());
          }
        }}
      />
    </>
  );
}

function Stage({
  level,
  onComplete,
}: {
  level: number;
  onComplete: (params: { gameResult: "SUCCESS" | "FAIL" }) => void;
}) {
  const [gameFlow, setGameFlow] = useState<
    "LOADING" | "QUESTION" | "ANSWER" | "SUCCESS" | "FAIL"
  >("LOADING");

  return (
    <>
      {match(gameFlow)
        .with("LOADING", () => (
          <Loading onComplete={() => setGameFlow("QUESTION")} level={level} />
        ))
        .with("QUESTION", () => (
          <Question onComplete={() => setGameFlow("ANSWER")} level={level} />
        ))
        .with("ANSWER", () => (
          <Answer
            onCorrect={() => {
              setGameFlow("SUCCESS");
            }}
            onWrong={() => {
              setGameFlow("FAIL");
            }}
            level={level}
          />
        ))
        .with("SUCCESS", () => (
          <SucessResult
            onComplete={() => onComplete({ gameResult: "SUCCESS" })}
          />
        ))
        .with("FAIL", () => (
          <FailResult onComplete={() => onComplete({ gameResult: "FAIL" })} />
        ))
        .otherwise(() => null)}
    </>
  );
}

function Loading({
  onComplete,
  level,
}: {
  onComplete: () => void;
  level: number;
}) {
  useTimeout(() => onComplete(), 1500);

  return (
    <>
      <Spacing size={120} />
      <Flex justify="center">
        <AnimationWrapper type="flipItems">
          <Text typography="t1">{level}단계~</Text>
        </AnimationWrapper>
      </Flex>
      <Spacing size={120} />
      <Flex justify="center">
        <AnimationWrapper type="flipItems">
          <Text typography="t1">start!!!</Text>
        </AnimationWrapper>
      </Flex>
    </>
  );
}

function Question({
  onComplete,
  level,
}: {
  onComplete: () => void;
  level: number;
}) {
  const [showAnimalList, setSHowAnimalList] = useState<
    Record<string, AnimatedAnimalInfo>
  >(() => {
    return {
      "1": {
        id: "1",
        x: 250,
        y: 100,
        icon: "hamsterFace",
        animationName: "fadeInOut",
        delay: 1500,
        isDone: false,
      },
      "2": {
        id: "2",
        x: 50,
        y: 150,
        icon: "brownBearFace",
        animationName: "fadeInOut",
        delay: 3000,
        isDone: false,
      },
    };
  });

  useEffect(() => {
    if (
      Object.values(showAnimalList).every((animal) => animal.isDone === true)
    ) {
      onComplete();
    }
  }, [showAnimalList, onComplete]);

  return (
    <>
      <Spacing size={84} />
      <DottedBox height={GAME_BOX_HEIGHT}>
        {Object.entries(showAnimalList).map(([id, animalAppearanceInfo]) => (
          <AnimatedAnimalIcon
            key={animalAppearanceInfo.icon}
            info={animalAppearanceInfo}
            onAnimationComplete={() => {
              setSHowAnimalList((prev) => ({
                ...prev,
                [id]: { ...animalAppearanceInfo, isDone: true },
              }));
            }}
          />
        ))}
      </DottedBox>
    </>
  );
}

function Answer({
  onCorrect,
  onWrong,
  level,
}: {
  onCorrect: () => void;
  onWrong: () => void;
  level: number;
}) {
  return (
    <>
      <Flex justify="center">
        <AnimationWrapper type="flipItems">
          <Text typography="t2">동물을 순서대로 선택해주세요</Text>
        </AnimationWrapper>
      </Flex>
      <Spacing size={64} />
      <Flex justify="space-around">
        <IconButton name="questionMark" size={80} />
      </Flex>
      <Spacing size={56} />
      <AnswerOptions
        onClickItem={({ iconType }) => {
          if (iconType === "brownBearFace") {
            onCorrect();
          } else {
            onWrong();
          }
        }}
      />
    </>
  );
}

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

function SucessResult({ onComplete }: { onComplete: () => void }) {
  return (
    <>
      <Flex justify="center">
        <AnimationWrapper type="flipItems">
          <Text typography="t2">잘했어요!</Text>
        </AnimationWrapper>
      </Flex>
      <Spacing size={120} />
      <Flex justify="center">
        <AnimationWrapper type="flipItems">
          <Icon name="partyPopper" />
        </AnimationWrapper>
      </Flex>
      <Spacing size={28} />
      <Flex justify="center">
        <Text typography="t1">+1</Text>
      </Flex>
      <BottomButton onClick={onComplete}>다음 단계로</BottomButton>
    </>
  );
}

function FailResult({ onComplete }: { onComplete: () => void }) {
  return (
    <>
      <Flex justify="center">
        <AnimationWrapper type="flipItems">
          <Text typography="t2">아쉬워요</Text>
        </AnimationWrapper>
      </Flex>
      <Spacing size={120} />
      <Flex justify="center">
        <AnimationWrapper type="flipItems">
          <Icon name="smilingFaceWithOpenMouthAndColdSweat" />
        </AnimationWrapper>
      </Flex>
      <Spacing size={28} />
      <Flex justify="center">
        <Text typography="t1">-1</Text>
      </Flex>
      <BottomButton onClick={onComplete}>메인 화면으로</BottomButton>
    </>
  );
}
