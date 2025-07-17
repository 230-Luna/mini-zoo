import { BottomButton } from "components/BottomButton";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { Flex } from "components/Flex";
import { Icon } from "components/Icon";
import { IconButton } from "components/IconButton";
import { Spacing } from "components/Spacing";
import { Text } from "components/Text";
import { useState } from "react";

export function HomePage() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isIconButtonDisabled, setIsIconButtonDisabled] = useState(false);

  return (
    <>
      <Text typography="title">미니쥬</Text>
      <Icon name="nuleongSoobookz" size={40} />
      <Card description="100점" title="순서 기억하기" thumbnail="pigFace" />
      <Button
        loading={isButtonDisabled}
        onClick={() => {
          setIsButtonDisabled(true);
          setTimeout(() => {
            setIsButtonDisabled(false);
          }, 1500);
        }}
      >
        일반 버튼
      </Button>
      <Spacing size={10} />
      <Flex direction="column">
        <Text typography="cation">아이콘버튼</Text>
        <IconButton
          name="nuleongSoobookz"
          size={40}
          onClick={() => {
            setIsButtonDisabled(true);
            setTimeout(() => {
              setIsButtonDisabled(false);
            }, 1500);
          }}
        />
      </Flex>
      <Spacing size={10} />
      <Flex direction="column">
        <Text typography="cation">아이콘버튼</Text>
        <IconButton
          loading={isIconButtonDisabled}
          name="pigFace"
          size={40}
          onClick={() => {
            setIsIconButtonDisabled(true);
            setTimeout(() => {
              setIsIconButtonDisabled(false);
            }, 1500);
          }}
        />{" "}
      </Flex>
      <Card description="??점" title="????" />
      <Icon name="nuleongSoobookz" width={100} height={100} />
      <BottomButton>게임 시작</BottomButton>
    </>
  );
}
