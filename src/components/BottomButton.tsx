import { Button, ButtonProps } from "./Button";

export const BottomButton = ({
  children,
  onClick,
  disabled = false,
  loading = false,
}: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      css={{ position: "fixed", bottom: 0, left: 0 }}
    >
      {children}
    </Button>
  );
};
