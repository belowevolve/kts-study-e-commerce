import cn from "classnames";
import * as React from "react";
import styles from "./Input.module.scss";
export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { value, onChange, afterSlot, ...props },
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <label className={cn(styles.input_container, props.className)}>
      <input
        type="text"
        {...props}
        ref={ref}
        value={value}
        onChange={handleChange}
        className={styles.input_field}
      />
      {!!afterSlot && afterSlot}
    </label>
  );
});

export default Input;
