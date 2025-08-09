import { ConfirmDialog } from "components/ConfirmDialog";
import { useOverlay } from "./useOverlay";

export const useConfirmDialog = () => {
  const overlay = useOverlay();

  return {
    open: ({
      content,
      rejectButtonText,
      confirmButtonText,
    }: {
      content: string;
      rejectButtonText: string;
      confirmButtonText: string;
    }) => {
      return new Promise<boolean>((resolve) => {
        overlay.open(({ isOpen, close }) => (
          <ConfirmDialog
            content={content}
            open={isOpen}
            onClose={() => {
              resolve(false);
              close();
            }}
            onConfirm={() => {
              resolve(true);
              close();
            }}
            rejectButtonText={rejectButtonText}
            confirmButtonText={confirmButtonText}
          />
        ));
      });
    },
  };
};
