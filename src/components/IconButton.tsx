import { ComponentProps } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";

interface IconButtonProps extends ComponentProps<"button"> {
  onClick?: () => void;
  disabled?: boolean;
  name: string;
  size?: number;
}

export const IconButton = ({
  onClick,
  disabled = false,
  name,
  size = 40,
  ...props
}: IconButtonProps) => {
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
};
