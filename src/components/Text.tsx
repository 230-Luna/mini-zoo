import { colors } from "constants/colors";
import { HTMLAttributes } from "react";

const fontStyle = {
  title: { fontSize: "40px" },
  subtitle: { fontSize: "25px" },
  cation: { fontSize: "20px" },
  subcation: { fontSize: "15px" },
  label: { fontSize: "25px" },
  icon: { fontSize: "100px" },
} as const;

type Typography = keyof typeof fontStyle;

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  typography?: Typography;
  color?: string;
}

export function Text({
  children,
  typography = "subtitle",
  color = colors.brown900,
  ...props
}: TextProps) {
  const style = { ...fontStyle[typography], color };
  return (
    <span css={{ ...style }} {...props}>
      {children}
    </span>
  );
}
