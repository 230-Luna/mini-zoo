interface SpacingProps {
  size: number | string;
  direction?: "vertical" | "horizontal";
  inline?: boolean;
}

export const Spacing = ({
  size,
  direction = "vertical",
  inline = false,
}: SpacingProps) => {
  const isVertical = direction === "vertical";
  return (
    <div
      css={{
        backgroundColor: "red",
        display: inline ? "inline-block" : "block",
        width: isVertical
          ? "100%"
          : typeof size === "number"
          ? `${size}px`
          : size,
        height: isVertical
          ? typeof size === "number"
            ? `${size}px`
            : size
          : "100%",
        flexShrink: 0,
      }}
    />
  );
};
