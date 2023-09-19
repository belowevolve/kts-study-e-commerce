import * as React from "react";
import Text, { TextView, TextColor, TextWeight } from "../Text";

import styles from "./Card.module.scss";
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
  className = "",
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <div className={`${styles.card} ${className}`} onClick={onClick}>
      <div className={styles.card__header}>
        <img className={styles["card__card-img"]} src={image} alt="" />
      </div>

      <div className={styles.card__body}>
        {captionSlot && (
          <Text
            className={styles.card__caption}
            view={TextView.p14}
            color={TextColor.secondary}
            weight={TextWeight.medium}
          >
            {captionSlot}
          </Text>
        )}

        <Text
          className={styles.card__title}
          view={TextView.p20}
          color={TextColor.primary}
          weight={TextWeight.medium}
          maxLines={2}
        >
          {title}
        </Text>

        <Text
          className={styles.card__subtitle}
          view={TextView.p16}
          color={TextColor.secondary}
          maxLines={3}
        >
          {subtitle}
        </Text>

        <div className={styles.card__footer}>
          {contentSlot && (
            <Text
              view={TextView.p18}
              color={TextColor.primary}
              weight={TextWeight.medium}
            >
              {contentSlot}
            </Text>
          )}

          <div className={styles.card__action}>{actionSlot}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);
