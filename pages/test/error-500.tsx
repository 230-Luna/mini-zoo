import DefaultErrorPage from "../_error";

const TestErrorDirectPage = () => {
  return (
    <div>
      <DefaultErrorPage statusCode={500} error={new Error("Default 에러")} />
    </div>
  );
};

export default TestErrorDirectPage;
