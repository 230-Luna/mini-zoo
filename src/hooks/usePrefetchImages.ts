import { useEffect, useState } from "react";

export const usePrefetchImages = (imageUrls: string[]) => {
  const [status, setStatus] = useState<"IDLE" | "FETCHING" | "DONE">("IDLE");

  useEffect(() => {
    setStatus("FETCHING");
    Promise.all(imageUrls.map((imageUrl) => fetch(imageUrl))).finally(() =>
      setStatus("DONE")
    );
  }, [imageUrls, setStatus]);

  return { status };
};
