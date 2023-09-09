import cn from "classnames";
import * as React from "react";
import text from "./Text.module.scss";

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: "title" | "button" | "p-20" | "p-18" | "p-16" | "p-14";
  /** Html-тег */
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "p" | "span";
  /** Начертание шрифта */
  weight?: "normal" | "medium" | "semiBold" | "bold";
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: "primary" | "secondary" | "accent";
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag: TextTag = "p",
  weight,
  children,
  color,
  maxLines,
}) => {
  return (
    <TextTag
      className={cn(
        text.text,
        view && text[view],
        color && text[color],
        className
      )}
      style={{
        fontWeight:
          weight === "medium" ? 500 : weight === "semiBold" ? 600 : weight,
        WebkitLineClamp: maxLines,
      }}
    >
      {children}
    </TextTag>
  );
};

export default Text;
