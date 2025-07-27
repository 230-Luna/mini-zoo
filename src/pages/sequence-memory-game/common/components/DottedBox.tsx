import { colors } from "constants/colors";
import { PAGE_PADDING } from "constants/layout";
import { ReactNode } from "react";
import { px } from "utils/css-unit";

export const DottedBox = ({
  height,
  children,
  className,
}: {
  height: number;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      css={{
        position: "relative",
        width: `calc(100vw- ${px(PAGE_PADDING * 2)})`,
        height,
        overflow: "hidden",
        border: `5px dashed ${colors.brown900}`,
        borderRadius: 20,
      }}
      className={className}
    >
      {children}
    </div>
  );
};
