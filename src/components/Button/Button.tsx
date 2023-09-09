import cn from "classnames";
import * as React from "react";

import Loader from "../Loader";
import Text from "../Text";
import button from "./Button.module.scss";

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
      className={cn(
        button.button,
        className,
        props.disabled === true && button.disabled
      )}
      {...props}
      disabled={props.disabled || loading}
    >
      {loading && <Loader size="s" className="button-loader" />}
      <Text view="button">{children}</Text>
    </button>
  );
};

export default Button;
