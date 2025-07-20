import { colors } from "constants/colors";
import { ComponentProps } from "react";

export const fontSize = {
  t1: "40px",
  t2: "20px",
  t3: "15px",
} as const;

type Typography = keyof typeof fontSize;

interface TextProps extends ComponentProps<"span"> {
  typography?: Typography;
  color?: string;
}

export const Text = ({
  children,
  typography = "t2",
  color = colors.brown900,
  ...props
}: TextProps) => {
  const style = { color, fontSize: fontSize[typography] };
  return (
    <span css={{ ...style }} {...props}>
      {children}
    </span>
  );
};
