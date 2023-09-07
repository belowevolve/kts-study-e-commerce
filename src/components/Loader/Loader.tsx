import * as React from "react";
import "./Loader.css";
export type LoaderProps = {
  /** Размер */
  size?: "s" | "m" | "l";
  /** Дополнительный класс */
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  size = "l",
  className,
}: LoaderProps) => {
  return <span className={`loader ${size} ${className}`}></span>;
};

export default Loader;
