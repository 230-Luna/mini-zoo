import { ComponentProps } from "react";
import { fontSize, Text } from "components/Text";
import { Icon } from "components/Icon";
import { Spacing } from "components/Spacing";
import { AnimationWrapper } from "./AnimationWrapper";

const sizeStyle = {
  standard: { padding: "10px", width: "100px", height: "75px" },
};

interface CardProps extends ComponentProps<"div"> {
  size?: "standard";
  title: string;
  description?: string;
  thumbnail?: string;
}

export function Card({
  size = "standard",
  title,
  description,
  thumbnail = "questionMark",
  ...props
}: CardProps) {
  return (
    <AnimationWrapper type="highScaleOnTap">
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          ...sizeStyle[size],
        }}
        {...props}
      >
        {description == null ? (
          <Spacing size={fontSize.t3} />
        ) : (
          <Text typography="t3">{description}</Text>
        )}
        <Spacing size={4} />
        <Icon name={thumbnail} />
        <Spacing size={8} />
        <Text typography="t2">{title}</Text>
      </div>
    </AnimationWrapper>
  );
}
