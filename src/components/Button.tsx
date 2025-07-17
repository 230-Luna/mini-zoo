import { css, keyframes } from "@emotion/react";
import { colors } from "constants/colors";
import { ComponentProps, ReactNode } from "react";

export interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const Button = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      css={buttonStyle(isDisabled)}
      onClick={onClick}
      disabled={isDisabled}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

const buttonStyle = (disabled: boolean) => css`
  width: 100%;
  padding: 16px 0;
  background-color: ${disabled ? colors.brown300 : colors.brown900};
  color: ${colors.white50};
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  border: none;
  cursor: ${disabled ? "not-allowed" : "pointer"};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${disabled ? colors.brown300 : colors.brown400};
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = () => (
  <div
    css={{ display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <div
      css={{
        padding: "3.5px",
        width: "18px",
        height: "18px",
        border: "2px solid white",
        borderTopColor: "transparent",
        borderRadius: "50%",
        animation: `${spin} 0.6s linear infinite`,
      }}
    />
    <span css={{ marginLeft: 8 }} />
  </div>
);
