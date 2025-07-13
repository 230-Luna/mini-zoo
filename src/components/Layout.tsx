import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      css={{
        maxWidth: "512px",
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  );
}
