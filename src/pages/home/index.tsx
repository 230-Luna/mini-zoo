import { Card } from "components/Card";
import { Icon } from "components/Icon";
import { Text } from "components/Text";

export function HomePage() {
  return (
    <>
      <Text typography="title">미니쥬</Text>
      <Icon type="nuleongSoobookz" size={40} />
      <Card description="100점" title="순서 기억하기" thumbnail="pigFace" />
      <Card title="장애물 피하기" thumbnail="catFace" />
      <Card description="??점" title="????" />
      <Icon type="nuleongSoobookz" width={100} height={100} />
    </>
  );
}
