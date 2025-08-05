import { Flex } from "components/Flex";
import { BottomButton } from "components/BottomButton";
import { Icon } from "components/Icon";
import { NextPageContext } from "next";
import { Spacing } from "components/Spacing";
import { Text } from "components/Text";
import { AnimationWrapper } from "components/AnimationWrapper";

export default function ErrorPage({
  statusCode,
  error,
}: {
  statusCode: number;
  error: Error;
}) {
  if (statusCode === 404) {
    return <NotFoundErrorPage />;
  }

  if (statusCode === 500) {
    return <ServerErrorPage />;
  }

  return <DefaultErrorPage error={error} />;
}

function NotFoundErrorPage() {
  return (
    <>
      <Spacing size={64} />
      <Flex justify="center">
        <Text typography="t1">페이지를 찾을 수 없어요</Text>
        <Icon name="nuleongSoobookz" />
      </Flex>
      <Spacing size={140} />
      <Flex justify="center">
        <AnimationWrapper type="shake">
          <Icon name="thinkingFace" size={100} />
        </AnimationWrapper>
      </Flex>
      <BottomButton onClick={() => (window.location.href = "/")}>
        홈으로 돌아가기
      </BottomButton>
    </>
  );
}

function ServerErrorPage() {
  return (
    <>
      <Spacing size={64} />
      <Flex justify="center">
        <Text typography="t1">서버에 문제가 있어요</Text>
        <Icon name="nuleongSoobookz" />
      </Flex>
      <Spacing size={16} />
      <Flex justify="center">
        <Text typography="t2">잠시 후 다시 시도해주세요</Text>
      </Flex>
      <Spacing size={140} />
      <Flex justify="center">
        <AnimationWrapper type="shake">
          <Icon name="dizzyFace" size={100} />
        </AnimationWrapper>
      </Flex>
      <BottomButton onClick={() => window.location.reload()}>
        다시 시도하기
      </BottomButton>
    </>
  );
}

function DefaultErrorPage({ error }: { error?: Error }) {
  return (
    <>
      <Spacing size={64} />
      <Flex justify="center">
        <Text typography="t1">문제가 발생했어요</Text>
        <Icon name="nuleongSoobookz" />
      </Flex>
      <Spacing size={16} />
      <Flex justify="center">
        <Text typography="t2">{error?.message ?? "알수없는 에러에요"}</Text>
      </Flex>
      <Spacing size={140} />
      <Flex justify="center">
        <AnimationWrapper type="shake">
          <Icon name="pleadingFace" size={100} />
        </AnimationWrapper>
      </Flex>
      <BottomButton onClick={() => window.location.reload()}>
        다시 시도하기
      </BottomButton>
    </>
  );
}

ErrorPage.getInitialProps = (ctx: NextPageContext) => {
  const { res, err: error } = ctx;
  const statusCode = res ? res.statusCode : error ? error.statusCode : 404;
  return { statusCode, error };
};
