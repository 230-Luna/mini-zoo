import { colors } from "constants/colors";
import { ComponentProps } from "react";

export const fontSize = {
  t1: "40px",
  t2: "24px",
  t3: "16px",
} as const;

type Typography = keyof typeof fontSize;

interface TextProps extends ComponentProps<"span"> {
  typography?: Typography;
  color?: string;
}

export function Text({
  children,
  typography = "t2",
  color = colors.brown900,
  ...props
}: TextProps) {
  const style = { color, fontSize: fontSize[typography] };
  return (
    <span css={{ ...style }} {...props}>
      {children}
    </span>
  );
}
