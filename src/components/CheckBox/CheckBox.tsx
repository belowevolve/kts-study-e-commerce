import * as React from "react";
import CheckIcon from "../icons/CheckIcon";
import "./CheckBox.css";

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, ...props }) => {
  const [isChecked, setIsChecked] = React.useState(props.checked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);

    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <label className={`checkbox-label ${props.className}`}>
      <input
        type="checkbox"
        onChange={handleChange}
        checked={isChecked}
        {...props}
        className=""
      />
      <span className="checkbox-custom">
        {isChecked && <CheckIcon width={40} height={40} />}
      </span>
    </label>
  );
};

export default CheckBox;
