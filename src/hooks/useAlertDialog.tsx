import { AlertDialog } from "components/AlertDialog";
import { useOverlay } from "./useOverlay";

export const useAlertDialog = () => {
  const overlay = useOverlay();

  return {
    open: ({
      content,
      confirmButtonText,
    }: {
      content: string;
      confirmButtonText: string;
    }) => {
      return new Promise<boolean>((resolve) => {
        overlay.open(({ isOpen, close }) => (
          <AlertDialog
            content={content}
            open={isOpen}
            onConfirm={() => {
              close();
              resolve(true);
            }}
            confirmButtonText={confirmButtonText}
          />
        ));
      });
    },
  };
};
