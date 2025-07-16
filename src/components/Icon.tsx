import Image from "next/image";
import { ComponentProps } from "react";

interface IconProps extends Omit<ComponentProps<typeof Image>, "src" | "alt"> {
  type: string;
  size?: number;
}

export const Icon = ({ type, size = 40, ...props }: IconProps) => {
  return (
    <Image
      src={`/emoji/${type}.svg`}
      alt={`${type} icon`}
      width={size}
      height={size}
      {...props}
    />
  );
};
