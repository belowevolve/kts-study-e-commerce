import * as React from "react";
import Text from "../Text";

import card from "./Card.module.scss";
export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <div className={`${card.card} ${className ?? ""}`} onClick={onClick}>
      <div className={card.header}>
        <div className={card.cardImgBackground}></div>
        <img className={card.cardImg} src={image} alt="card" />
      </div>

      <div className={card.body}>
        <div className={card.frame1}>
          {captionSlot && (
            <Text view="p-14" color="secondary" weight="medium">
              {captionSlot}
            </Text>
          )}

          <Text view="p-20" weight="medium" color="primary" maxLines={2}>
            {title}
          </Text>

          <Text view="p-16" color="secondary" maxLines={3}>
            {subtitle}
          </Text>
        </div>

        <div className={card.frame2}>
          {contentSlot && (
            <Text view="p-18" color="primary" weight="bold">
              {contentSlot}
            </Text>
          )}

          <div>{actionSlot}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
