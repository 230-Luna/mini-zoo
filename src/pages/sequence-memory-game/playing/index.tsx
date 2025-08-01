import { Flex } from "components/Flex";
import { Spacing } from "components/Spacing";
import { Text } from "components/Text";
import { useState } from "react";
import { match } from "ts-pattern";
import { DottedBox } from "../common/components/DottedBox";
import { useTimeout } from "hooks/useTimeout";
import { Icon } from "components/Icon";
import { BottomButton } from "components/BottomButton";
import { useRouter } from "next/router";
import { RouteUrls } from "utils/router";
import { sequenceMemoryGameScoreStorage } from "../common/utils/score-storage";
import { ANSWER_BOX_HEIGHT, GAME_BOX_HEIGHT } from "constants/layout";
import { Animation } from "../common/models/Animations";
import { IconButton } from "components/IconButton";
import { chunk } from "es-toolkit";
import { noop } from "utils/function";
import {
  getDurationByLevel,
  getRandomGameBoxPosition,
} from "../common/utils/animationModifiers";
import { emojiAnimalFaceList } from "../common/constants/emojiAnimalFaceList";
import { AnimatedIcon } from "../common/components/animated-icon";
import { BASE_DELAY } from "../common/constants/game";
import { AnimationWrapper } from "components/AnimationWrapper";
import { getRandomItem } from "utils/random";
import { effects } from "../common/constants/appearanceEffects";
import { getIconCountByLevel } from "./common/utils/gameSetting";

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
  const [iconSequence, setIconSequence] = useState<string[]>([]);

  return (
    <>
      {match(gameFlow)
        .with("LOADING", () => (
          <Loading onComplete={() => setGameFlow("QUESTION")} level={level} />
        ))
        .with("QUESTION", () => (
          <Question
            level={level}
            onComplete={(sequence) => {
              setIconSequence(sequence);
              setGameFlow("ANSWER");
            }}
          />
        ))
        .with("ANSWER", () => (
          <Answer
            level={level}
            iconSequence={iconSequence}
            onCorrect={() => {
              setGameFlow("SUCCESS");
            }}
            onWrong={() => {
              setGameFlow("FAIL");
            }}
          />
        ))
        .with("SUCCESS", () => (
          <SuccessResult
            level={level}
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
        <AnimationWrapper type="textWave">
          <Text typography="t1">{level}단계~</Text>
          <Spacing size={120} />
          <Text typography="t1">start!!!</Text>
        </AnimationWrapper>
      </Flex>
    </>
  );
}

function Question({
  level,
  onComplete,
}: {
  level: number;
  onComplete: (sequence: string[]) => void;
}) {
  const iconCount = getIconCountByLevel(level);
  const duration = getDurationByLevel(level);

  const [iconSequence] = useState<string[]>(() => {
    const usedIcons = new Set<string>();
    const sequence: string[] = [];

    for (let i = 0; i < iconCount; i++) {
      let icon;
      do {
        icon = getRandomItem(emojiAnimalFaceList);
      } while (usedIcons.has(icon));
      usedIcons.add(icon);
      sequence.push(icon);
    }

    return sequence;
  });

  const [animationList, setAnimationList] = useState<Animation[]>(() => {
    return Array.from({ length: iconCount }, (_, index) => {
      const position = getRandomGameBoxPosition();
      const effect = getRandomItem(effects);

      return {
        fromX: position.x,
        fromY: position.y,
        effect,
        delay: BASE_DELAY * level + index * duration,
        duration,
      };
    });
  });

  return (
    <>
      <Spacing size={84} />
      <DottedBox height={GAME_BOX_HEIGHT}>
        {animationList.map((animation, index) => (
          <AnimatedIcon
            key={index}
            name={iconSequence[index]}
            animation={animation}
            onAnimationComplete={() => {
              setAnimationList((prev) =>
                prev.map((animation, i) =>
                  i === index ? { ...animation } : animation
                )
              );
              if (index === animationList.length - 1) {
                onComplete(iconSequence);
              }
              return;
            }}
          />
        ))}
      </DottedBox>
    </>
  );
}

function Answer({
  level,
  iconSequence,
  onCorrect,
  onWrong,
}: {
  level: number;
  iconSequence: string[];
  onCorrect: () => void;
  onWrong: () => void;
}) {
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const iconCount = getIconCountByLevel(level);

  const handleIconClick = (index: number) => {
    setUserSequence((prev) => {
      const newSequence = [...prev];
      newSequence.splice(index, 1);
      return newSequence;
    });
  };

  const handleItemsClick = (iconType: string) => {
    const newSequence = [...userSequence, iconType];
    setUserSequence(newSequence);

    if (newSequence.length === iconCount) {
      const isCorrect = newSequence.every(
        (icon, index) => icon === iconSequence[index]
      );
      if (isCorrect) {
        onCorrect();
      } else {
        onWrong();
      }
    }
  };

  return (
    <>
      <Flex justify="center">
        <AnimationWrapper type="textWave">
          <Text typography="t2">동물을 순서대로 선택해주세요</Text>
        </AnimationWrapper>
      </Flex>
      <Spacing size={64} />
      <Flex
        direction="column"
        justify="space-evenly"
        css={{ height: "100%" }}
        gap={32}
      >
        {chunk(Array.from({ length: iconCount }), 10).map((_, idx) => (
          <Flex justify="space-evenly" key={idx}>
            {Array.from({ length: iconCount }).map((_, index) => (
              <IconButton
                key={index}
                name={userSequence[index] || "questionMark"}
                onClick={() => userSequence[index] && handleIconClick(index)}
              />
            ))}
          </Flex>
        ))}
      </Flex>
      <Spacing size={56} />
      <AnswerOptions
        iconSequence={iconSequence}
        onClickItem={handleItemsClick}
      />
    </>
  );
}

function AnswerOptions({
  iconSequence,
  onClickItem = noop,
}: {
  iconSequence: string[];
  onClickItem?: (iconType: string) => void;
}) {
  const [randomIconTypes] = useState<string[]>(() => {
    const usedIcons = new Set<string>();
    const icons: string[] = [];

    iconSequence.forEach((icon) => {
      usedIcons.add(icon);
      icons.push(icon);
    });

    while (icons.length < 9) {
      const icon = getRandomItem(emojiAnimalFaceList);
      if (!usedIcons.has(icon)) {
        usedIcons.add(icon);
        icons.push(icon);
      }
    }

    return icons.sort(() => Math.random() - 0.5);
  });

  return (
    <DottedBox height={ANSWER_BOX_HEIGHT}>
      <Flex direction="column" justify="space-evenly" css={{ height: "100%" }}>
        {chunk(randomIconTypes, 3).map((iconTypes, idx) => (
          <Flex justify="space-evenly" key={idx}>
            {iconTypes.map((iconType) => (
              <IconButton
                key={iconType}
                name={iconType}
                onClick={() => onClickItem(iconType)}
              />
            ))}
          </Flex>
        ))}
      </Flex>
    </DottedBox>
  );
}

function SuccessResult({
  level,
  onComplete,
}: {
  level: number;
  onComplete: () => void;
}) {
  const router = useRouter();

  return (
    <>
      <Flex justify="center">
        <AnimationWrapper type="textWave">
          <Text typography="t2">잘했어요!</Text>
        </AnimationWrapper>
      </Flex>
      <Spacing size={120} />
      <Flex justify="center">
        <AnimationWrapper type="flipItems">
          <Icon name="partyPopper" size={100} />
        </AnimationWrapper>
      </Flex>
      <Spacing size={28} />
      <Flex justify="center">
        <Text typography="t1">+1</Text>
      </Flex>
      {level < 3 ? (
        <BottomButton onClick={onComplete}>다음 단계로</BottomButton>
      ) : (
        <>
          <Spacing size={28} />
          <Flex justify="center">
            <Text typography="t2">최종 단계까지 성공했어요!</Text>
          </Flex>
          <Spacing size={28} />
          <BottomButton
            onClick={() => {
              router.push(RouteUrls.home());
            }}
          >
            메인 화면으로
          </BottomButton>
        </>
      )}
    </>
  );
}

function FailResult({ onComplete }: { onComplete: () => void }) {
  const previousScore = sequenceMemoryGameScoreStorage.get();
  const currentScore = previousScore && previousScore > 0 ? "-1" : null;
  return (
    <>
      <Flex justify="center">
        <AnimationWrapper type="textWave">
          <Text typography="t2">아쉬워요</Text>
        </AnimationWrapper>
      </Flex>
      <Spacing size={120} />
      <Flex justify="center">
        <AnimationWrapper type="flipItems">
          <Icon name="smilingFaceWithOpenMouthAndColdSweat" size={100} />
        </AnimationWrapper>
      </Flex>
      <Spacing size={28} />
      <Flex justify="center">
        <Text typography="t1">{currentScore}</Text>
      </Flex>
      <BottomButton onClick={onComplete}>메인 화면으로</BottomButton>
    </>
  );
}
