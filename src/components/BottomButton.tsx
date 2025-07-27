import { Button, ButtonProps } from "components/Button";
import { PAGE_PADDING, PAGE_MAX_WIDTH } from "constants/layout";
import { px } from "./../utils/css-unit";

export function BottomButton({ children, ...props }: ButtonProps) {
  return (
    <div
      css={{
        position: "fixed",
        maxWidth: px(PAGE_MAX_WIDTH),
        width: `calc(100% - ${px(PAGE_PADDING * 2)})`,
        bottom: px(PAGE_PADDING),
      }}
    >
      <Button {...props}>{children}</Button>
    </div>
  );
}
