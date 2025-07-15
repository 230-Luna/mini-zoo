import { Card } from "components/Card";
import Icon from "components/Icon";
import { Text } from "components/Text";

export function HomePage() {
  return (
    <>
      <Text typography="title">미니쥬</Text>
      <Icon type="nuleongSoobookz" size={40} />
      <Card>
        <Text typography="cation">Basic</Text>
      </Card>
      <Card size="sm" variant="elevated">
        <Text typography="cation">sm</Text>
      </Card>
      <Card size="md" variant="outlined">
        <Text typography="cation">md</Text>
      </Card>
      <Card size="lg" variant="elevated">
        <Text typography="cation">lg</Text>
      </Card>
    </>
  );
}
