import { DEFAULT_ICON_SIZE } from "constants/layout";
import Image from "next/image";
import { ComponentProps } from "react";

interface IconProps extends Omit<ComponentProps<typeof Image>, "src" | "alt"> {
  name: string;
  size?: number;
}

export const Icon = ({
  name,
  size = DEFAULT_ICON_SIZE,
  ...props
}: IconProps) => {
  return (
    <Image
      src={`/emoji/${name}.svg`}
      alt={`${name} icon`}
      width={size}
      height={size}
      draggable={false}
      {...props}
    />
  );
};
