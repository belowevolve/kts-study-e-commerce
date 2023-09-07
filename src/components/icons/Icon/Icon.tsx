import * as React from "react";

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: "primary" | "secondary" | "accent";
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
      color={color ? `var(--text-${color})` : "currentColor"}
      fill="none"
      className={className}
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
