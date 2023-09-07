import * as React from "react";
import "./Input.css";

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
    <label className={`input-container ${props.className}`}>
      <input
        type="text"
        {...props}
        ref={ref}
        value={value}
        onChange={handleChange}
        className="input-field"
      />
      {!!afterSlot && afterSlot}
    </label>
  );
});

export default Input;
