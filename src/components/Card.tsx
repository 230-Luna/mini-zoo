import { colors } from "constants/colors";
import { HTMLAttributes, ReactNode } from "react";

const baseStyle = {
  display: "flex",
  borderRadius: "8px",
  backgroundColor: colors.peach200,
};

const variantStyle = {
  outlined: { border: `2px solid  ${colors.brown900}` },
  elevated: { boxShadow: `0 2px 8px ${colors.brown900}` },
};

const sizeStyle = {
  sm: { padding: "8px", width: "100px", height: "100px" },
  md: { padding: "16px", width: "300px", height: "200px" },
  lg: { padding: "24px", width: "500px", height: "300px" },
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "outlined" | "elevated";
  size?: "sm" | "md" | "lg";
}

export function Card({
  children,
  variant = "outlined",
  size = "sm",
  ...props
}: CardProps) {
  return (
    <div css={[baseStyle, variantStyle[variant], sizeStyle[size]]} {...props}>
      {children}
    </div>
  );
}
