import { Button, ButtonProps } from "components/Button";
import { Flex } from "./Flex";

export const BottomButton = ({
  children,
  onClick,
  disabled = false,
  loading = false,
}: ButtonProps) => {
  return (
    <Flex justify="center">
      <Button
        onClick={onClick}
        disabled={disabled}
        loading={loading}
        css={{ position: "fixed", bottom: 12 }}
      >
        {children}
      </Button>
    </Flex>
  );
};
