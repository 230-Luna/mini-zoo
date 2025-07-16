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
  margin?: CSSProperties["margin"];
  marginRight?: CSSProperties["marginRight"];
  marginTop?: CSSProperties["marginTop"];
  marginLeft?: CSSProperties["marginLeft"];
  marginBottom?: CSSProperties["marginBottom"];
  padding?: CSSProperties["padding"];
  paddingTop?: CSSProperties["paddingTop"];
  paddingRight?: CSSProperties["paddingRight"];
  paddingBottom?: CSSProperties["paddingBottom"];
  paddingLeft?: CSSProperties["paddingLeft"];
  border?: CSSProperties["border"];
  borderRadius?: CSSProperties["borderRadius"];
  borderColor?: CSSProperties["borderColor"];
  borderTop?: CSSProperties["borderTop"];
  borderRight?: CSSProperties["borderRight"];
  borderBottom?: CSSProperties["borderBottom"];
  borderLeft?: CSSProperties["borderLeft"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  position?: CSSProperties["position"];
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
  margin,
  marginRight,
  marginTop,
  marginLeft,
  marginBottom,
  padding,
  paddingRight,
  paddingBottom,
  paddingLeft,
  border,
  borderRadius,
  borderColor,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  width,
  height,
  position,
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
        margin,
        marginRight,
        marginTop,
        marginLeft,
        marginBottom,
        padding,
        paddingRight,
        paddingBottom,
        paddingLeft,
        border,
        borderRadius,
        borderColor,
        borderTop,
        borderRight,
        borderBottom,
        borderLeft,
        width,
        height,
        position,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
