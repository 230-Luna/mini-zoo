import { CSSProperties, HTMLAttributes, ReactNode } from "react";

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  alignItems?: CSSProperties["alignItems"];
  alignContent?: CSSProperties["alignContent"];
  justify?: CSSProperties["justifyContent"];
  basis?: CSSProperties["flexBasis"];
  direction?: CSSProperties["flexDirection"];
  grow?: CSSProperties["flexGrow"];
  shrink?: CSSProperties["flexShrink"];
  wrap?: CSSProperties["flexWrap"];
  gap?: CSSProperties["gap"];
}

export const Flex = ({
  children,
  alignItems,
  alignContent,
  justify,
  basis,
  direction,
  grow,
  shrink,
  wrap,
  gap,
  ...props
}: FlexProps) => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: direction,
        alignItems,
        alignContent,
        justifyContent: justify,
        flexWrap: wrap,
        flexBasis: basis,
        flexGrow: grow,
        flexShrink: shrink,
        gap,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
