import cn from "classnames";
import * as React from "react";
import CheckIcon from "../icons/CheckIcon";
import styles from "./CheckBox.module.scss";

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  onChange,
  className,
  disabled,
  ...props
}) => {
  const onChangeHandler = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked);
    },
    [onChange]
  );

  return (
    <label
      className={cn(
        styles["checkbox-wrapper"],
        disabled && styles["checkbox-wrapper_disabled"],
        className
      )}
    >
      <input
        type="checkbox"
        className={styles.checkbox}
        onChange={onChangeHandler}
        checked={checked}
        disabled={disabled}
        {...props}
      />
      <CheckIcon width={40} height={40} className={styles.checkbox__mark} />
    </label>
  );
};

export default React.memo(CheckBox);
