import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
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
};
