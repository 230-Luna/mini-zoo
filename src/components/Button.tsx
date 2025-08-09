import { css, keyframes } from "@emotion/react";
import { colors } from "constants/colors";
import { ComponentProps } from "react";
import { Text } from "components/Text";
import { noop } from "utils/function";
import { AnimationWrapper } from "components/AnimationWrapper";

export interface ButtonProps extends ComponentProps<"button"> {
  loading?: boolean;
  disableHover?: boolean;
}

export function Button({
  children,
  loading = false,
  onClick,
  disableHover = true,
  ...props
}: ButtonProps) {
  return (
    <AnimationWrapper type="lowScaleOnTap">
      <button
        onClick={loading ? noop : onClick}
        css={buttonStyle({
          disabled: props.disabled ?? false,
          loading,
          disableHover,
        })}
        {...props}
      >
        {loading ? (
          <Spinner />
        ) : (
          <Text typography="t2" color={colors.white50}>
            {children}
          </Text>
        )}
      </button>
    </AnimationWrapper>
  );
}

const buttonStyle = ({
  disabled,
  loading,
  disableHover,
}: {
  disabled: boolean;
  loading: boolean;
  disableHover: boolean;
}) => css`
  max-height: 48px;
  height: 48px;
  width: 100%;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${disabled || loading ? colors.brown300 : colors.brown900};
  text-align: center;
  font-weight: bold;
  border: none;
  cursor: ${disabled || loading ? "not-allowed" : "pointer"};
  transition: background-color 0.3s ease;
  ${!disableHover &&
  `&:hover {
    background-color: ${
      disabled || loading ? colors.brown300 : colors.brown400
    };
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
        width: "14px",
        height: "14px",
        border: "2px solid white",
        borderTopColor: "transparent",
        borderRadius: "50%",
        animation: `${spin} 0.6s linear infinite`,
      }}
    />
    <span css={{ marginLeft: 8 }} />
  </div>
);
