import { Spacing } from "./Spacing";
import { Portal } from "./Portal";
import { Text } from "./Text";
import { css } from "@emotion/react";
import { colors } from "constants/colors";
import { Button } from "./Button";
import { Flex } from "./Flex";

interface AlertDialogProps {
  content: string;
  open: boolean;
  onConfirm: () => void;
  confirmButtonText: string;
}

export function AlertDialog({
  content,
  open,
  onConfirm,
  confirmButtonText,
}: AlertDialogProps) {
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
          <Button onClick={onConfirm}>{confirmButtonText}</Button>
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
