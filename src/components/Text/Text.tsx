import cn from "classnames";
import * as React from "react";
import { TextColor, TextTag, TextView, TextWeight } from "./config";
import text from "./Text.module.scss";

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: TextView;
  /** Html-тег */
  tag?: TextTag;
  /** Начертание шрифта */
  weight?: TextWeight;
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: TextColor;

  fontSize?: string;
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag: TextTagProp = TextTag.p,
  weight,
  children,
  color,
  maxLines,
}) => {
  return (
    <TextTagProp
      className={cn(
        text.text,
        view && text[`text_view-${view}`],
        color && text[`text_color-${color}`],
        className
      )}
      style={{
        fontWeight:
          weight === "medium" ? 500 : weight === "semiBold" ? 600 : weight,
        WebkitLineClamp: maxLines,
      }}
    >
      {children}
    </TextTagProp>
  );
};

export default Text;
