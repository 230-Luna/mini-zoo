import { useIsMounted } from "hooks/useIsMounted";
import { ReactNode } from "react";

export function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const mounted = useIsMounted();
  return mounted ? children : fallback;
}
