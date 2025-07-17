import { css, keyframes } from "@emotion/react";
import { colors } from "constants/colors";

export const BottomButton = ({
  children,
  onClick,
  disabled = false,
  loading = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      css={buttonStyle(isDisabled)}
      onClick={onClick}
      disabled={isDisabled}
    >
      {loading ? (
        <div css={spinnerContainerStyle}>
          <Spinner />
          <span css={{ marginLeft: 8 }}></span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

const buttonStyle = (disabled: boolean) => css`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px 0;
  background-color: ${disabled ? colors.brown300 : colors.brown900};
  color: #fff;
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

const spinnerContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = () => (
  <div
    css={css`
      padding: 3.5px;
      width: 18px;
      height: 18px;
      border: 2px solid white;
      border-top-color: transparent;
      border-radius: 50%;
      animation: ${spin} 0.6s linear infinite;
    `}
  />
);
