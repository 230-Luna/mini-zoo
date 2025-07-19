import { ComponentProps } from "react";
import { fontStyle, Text } from "components/Text";
import { Icon } from "components/Icon";
import { Spacing } from "components/Spacing";

const sizeStyle = {
  standard: { padding: "10px", width: "100px", height: "75px" },
};

interface CardProps extends ComponentProps<"div"> {
  size?: "standard";
  title: string;
  description?: string;
  thumbnail?: string;
}

export const Card = ({
  size = "standard",
  title,
  description,
  thumbnail = "questionMark",
  ...props
}: CardProps) => {
  return (
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
        <Spacing size={fontStyle.subcation.fontSize} />
      ) : (
        <Text typography="subcation">{description}</Text>
      )}
      <Spacing size={4} />
      <Icon name={thumbnail} size={40} />
      <Spacing size={8} />
      <Text typography="cation">{title}</Text>
    </div>
  );
};
