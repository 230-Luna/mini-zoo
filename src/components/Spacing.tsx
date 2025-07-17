export const Spacing = ({ size }: { size: number | string }) => {
  return (
    <div
      css={{
        width: "100%",
        height: typeof size === "number" ? `${size}px` : size,
      }}
    />
  );
};
