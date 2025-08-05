import ErrorPage from "../_error";

const TestErrorCustomPage = () => {
  return (
    <ErrorPage statusCode={403} error={new Error("테스트용 커스텀 에러")} />
  );
};

export default TestErrorCustomPage;
