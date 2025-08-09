import { Spacing } from "./Spacing";
import { Portal } from "./Portal";
import { Text } from "./Text";
import { css } from "@emotion/react";
import { colors } from "constants/colors";
import { Button } from "./Button";
import { Flex } from "./Flex";

interface ConfirmDialogProps {
  content?: string;
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
  rejectButtonText: string;
  confirmButtonText: string;
}

export function ConfirmDialog({
  content,
  open,
  onConfirm,
  onClose,
  rejectButtonText = "취소",
  confirmButtonText = "확인",
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <Portal>
      <div css={overlayStyle}>
        <div css={dialogStyle}>
          <Spacing size={36} />
          <Flex justify="center">
            <Text>{content}</Text>
          </Flex>
          <Spacing size={36} />
          <Flex gap={16} justify="center">
            <div css={{ flex: 1 }}>
              <Button
                onClick={onClose}
                css={{
                  backgroundColor: colors.brown300,
                }}
              >
                {rejectButtonText}
              </Button>
            </div>
            <div css={{ flex: 1 }}>
              <Button onClick={onConfirm}>{confirmButtonText}</Button>
            </div>
          </Flex>
        </div>
      </div>
    </Portal>
  );
}

const overlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const dialogStyle = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.peach50};
  padding: 24px;
  border-radius: 16px;
  width: 75%;
`;
