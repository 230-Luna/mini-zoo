import { PAGE_PADDING, PAGE_MAX_WIDTH } from "constants/layout";
import { ReactNode } from "react";
import { px } from "./../utils/css-unit";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      css={{
        maxWidth: px(PAGE_MAX_WIDTH),
        margin: "0 auto",
        padding: `0 ${px(PAGE_PADDING)}`,
      }}
    >
      {children}
    </div>
  );
}
