import * as React from "react";
import Input from "../Input";
import Text from "../Text";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import "./MultiDropdown.css";

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);

  const dropdownRef = React.useRef<null | HTMLDivElement>(null);

  const [searchTerm, setSearchTerm] = React.useState<string>("");

  React.useEffect(() => {
    if (dropdownRef.current === null) return;

    function handleClickOutside(event: MouseEvent) {
      if (!dropdownRef.current!.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    setIsDropdownOpen(false);
  }, [disabled]);

  const openDropdown = () => {
    !disabled && setIsDropdownOpen(true);
  };

  const handleOptionClick = (option: Option) => {
    const newValue = [...value];

    if (newValue.some((v) => v.key === option.key)) {
      newValue.splice(
        newValue.findIndex((v) => v.key === option.key),
        1
      );
    } else {
      newValue.push(option);
    }

    onChange(newValue);
    setSearchTerm("");
  };

  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`multi-dropdown ${className || ""}`}
      ref={dropdownRef}
      onFocus={openDropdown}
      onClick={openDropdown}
    >
      <Input
        className="multi-dropdown-input"
        value={
          isDropdownOpen ? searchTerm : value.length ? getTitle(value) : ""
        }
        onChange={(value) => setSearchTerm(value)}
        disabled={disabled}
        placeholder={getTitle(value)}
        afterSlot={<ArrowDownIcon color="secondary" />}
      />
      {isDropdownOpen && (
        <div className="multi-dropdown-options">
          {filteredOptions.map((option) => (
            <div
              key={option.key}
              className={`multi-dropdown-option ${
                value.some((v) => v.key === option.key) ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              <Text view="p-16">{option.value}</Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;