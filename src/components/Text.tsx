import { colors } from "constants/colors";
import { ComponentProps } from "react";

const fontStyle = {
  title: { fontSize: "40px" },
  subtitle: { fontSize: "25px" },
  cation: { fontSize: "20px" },
  subcation: { fontSize: "15px" },
  label: { fontSize: "25px" },
} as const;

type Typography = keyof typeof fontStyle;

interface TextProps extends ComponentProps<"span"> {
  typography?: Typography;
  color?: string;
}

export const Text = ({
  children,
  typography = "subtitle",
  color = colors.brown900,
  ...props
}: TextProps) => {
  const style = { ...fontStyle[typography], color };
  return (
    <span css={{ ...style }} {...props}>
      {children}
    </span>
  );
};
