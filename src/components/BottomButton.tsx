import { Button, ButtonProps } from "components/Button";
import { PAGE_PADDING, PAGE_MAX_WIDTH } from "constants/layout";
import { px } from "./../utils/css-unit";

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
      css={{
        position: "fixed",
        maxWidth: px(PAGE_MAX_WIDTH),
        width: `calc(100% - ${px(PAGE_PADDING * 2)})`,
        bottom: px(PAGE_PADDING),
      }}
    >
      {children}
    </Button>
  );
};
