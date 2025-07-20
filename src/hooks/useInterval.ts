import { useEffect } from "react";

export const useInterval = (callback: () => void, interval: number) => {
  useEffect(() => {
    const intervalId = setInterval(callback, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [callback, interval]);
};
