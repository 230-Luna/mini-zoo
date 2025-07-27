import { ComponentProps } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { DEFAULT_ICON_SIZE } from "constants/layout";

interface IconButtonProps extends ComponentProps<"button"> {
  onClick?: () => void;
  disabled?: boolean;
  name: string;
  size?: number;
}

export function IconButton({
  onClick,
  disabled = false,
  name,
  size = DEFAULT_ICON_SIZE,
  ...props
}: IconButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      css={{
        width: size,
        height: size,
        backgroundColor: "transparent",
        padding: "1px",
        disableHover: false,
      }}
      {...props}
    >
      <Icon name={name} size={size} />
    </Button>
  );
}
