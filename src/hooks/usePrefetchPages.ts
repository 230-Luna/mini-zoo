import { useRouter } from "next/router";
import { useEffect } from "react";

export const usePrefetchPages = (pages: string[]) => {
  const router = useRouter();

  useEffect(() => {
    pages.forEach((page) => router.prefetch(page));
  }, [router, pages]);
};
