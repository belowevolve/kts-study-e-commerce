import cn from "classnames";
import * as React from "react";

import Loader, { LoaderSize } from "../Loader";
import Text, { TextView } from "../Text";
import styles from "./Button.module.scss";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;

  className?: string;

  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  className,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(
        className,
        styles.button,
        props.disabled && styles.button_disabled
      )}
      disabled={props.disabled || loading}
    >
      {loading && (
        <Loader size={LoaderSize.small} className={styles.button__loader} />
      )}
      <Text view={TextView.button}>{children}</Text>
    </button>
  );
};

export default React.memo(Button);
