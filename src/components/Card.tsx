import { ComponentProps } from "react";
import { Text } from "components/Text";
import { Icon } from "components/Icon";

const sizeStyle = {
  standard: { padding: "10px", width: "100px", height: "75px" },
};

interface CardProps extends ComponentProps<"div"> {
  size?: "standard";
  title?: string;
  description?: string;
  thumbnail?: string;
}

export const Card = ({
  size = "standard",
  title = "",
  description = "",
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
      {description == null ? null : (
        <Text typography="subcation">{description}</Text>
      )}
      <Icon type={thumbnail} size={40} />
      {title == null ? null : <Text typography="cation">{title}</Text>}
    </div>
  );
};
