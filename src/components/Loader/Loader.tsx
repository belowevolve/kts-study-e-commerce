import cn from "classnames";
import * as React from "react";
import { LoaderSize } from "./config";
import styles from "./Loader.module.scss";

export type LoaderProps = {
  /** Размер */
  size?: LoaderSize;
  /** Дополнительный класс */
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  size = LoaderSize.large,
  className,
}: LoaderProps) => {
  return (
    <span
      className={cn(styles.loader, styles[`loader_size_${size}`], className)}
    ></span>
  );
};

export default Loader;
