import cn from "classnames";
import * as React from "react";
import { IconColor } from "./config";
import styles from "./Icon.module.scss";
export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: IconColor;
  width?: number;
  height?: number;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  color,
  width = 24,
  height = 24,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={cn(color && styles[`icon_color-${color}`], className)}
      width={width}
      height={height}
      viewBox={`0 0 24 24`}
      preserveAspectRatio="xMidYMid meet"
      style={{ flexShrink: 0 }}
      {...props}
    />
  );
};

export default Icon;
