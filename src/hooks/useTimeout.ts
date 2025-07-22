import { useEffect } from "react";

export function useTimeout(callback: () => void, delay: number) {
  useEffect(() => {
    const delayTime = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(delayTime);
    };
  }, []);
}
