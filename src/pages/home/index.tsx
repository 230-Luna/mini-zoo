import { BottomButton } from "components/BottomButton";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { Icon } from "components/Icon";
import { Text } from "components/Text";
import { useState } from "react";

export function HomePage() {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <>
      <Text typography="title">미니쥬</Text>
      <Icon type="nuleongSoobookz" size={40} />
      <Card description="100점" title="순서 기억하기" thumbnail="pigFace" />
      <Button
        loading={isDisabled}
        onClick={() => {
          setIsDisabled(true);
          setTimeout(() => {
            setIsDisabled(false);
          }, 1500);
        }}
      >
        일반 버튼
      </Button>
      <Card title="장애물 피하기" thumbnail="catFace" />
      <Card description="??점" title="????" />
      <Icon type="nuleongSoobookz" width={100} height={100} />
      <BottomButton>게임 시작</BottomButton>
    </>
  );
}
