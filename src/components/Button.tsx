import { css, keyframes } from "@emotion/react";
import { colors } from "constants/colors";
import { ComponentProps, ReactNode } from "react";
import { Text } from "./Text";

export interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  disableHover?: boolean;
}

export const Button = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  disableHover = true,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      css={buttonStyle(isDisabled, disableHover)}
      onClick={onClick}
      disabled={isDisabled}
      {...props}
    >
      {loading ? <Spinner /> : <Text typography="label">{children}</Text>}
    </button>
  );
};

const buttonStyle = (disabled: boolean, disableHover: boolean) => css`
  max-height: "58px";
  width: 100%;
  padding: 14px 0;
  background-color: ${disabled ? colors.brown300 : colors.brown900};
  text-align: center;
  font-weight: bold;
  border: none;
  cursor: ${disabled ? "not-allowed" : "pointer"};
  transition: background-color 0.3s ease;

  ${!disableHover &&
  `&:hover {
    background-color: ${disabled ? colors.brown300 : colors.brown400};
  }`}
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = () => (
  <div
    css={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      maxHeight: "100%",
    }}
  >
    <div
      css={{
        padding: "12px",
        width: "16px",
        height: "16px",
        border: "3px solid white",
        borderTopColor: "transparent",
        borderRadius: "50%",
        animation: `${spin} 0.6s linear infinite`,
      }}
    />
    <span css={{ marginLeft: 8 }} />
  </div>
);
