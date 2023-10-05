import * as React from "react";
import Skeleton from "react-loading-skeleton";
import WithSkeleton from "components/WithSkeleton";
import Text, { TextView, TextColor, TextWeight } from "../Text";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./Card.module.scss";
export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image?: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title?: React.ReactNode;
  /** Описание карточки */
  subtitle?: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;

  loading?: boolean;
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
  loading = false,
}) => {
  return (
    <div className={`${styles.card} ${className}`} onClick={onClick}>
      <div className={styles.card__header}>
        <WithSkeleton
          showSkeleton={loading}
          skeleton={
            <Skeleton
              inline={true}
              className={styles["card__card-img"]}
              style={{ position: "absolute" }}
            />
          }
        >
          <img className={styles["card__card-img"]} src={image} alt="" />
        </WithSkeleton>
      </div>

      <div className={styles.card__body}>
        <WithSkeleton
          showSkeleton={loading}
          skeleton={<Skeleton className={styles.card__caption} />}
        >
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
        </WithSkeleton>

        <WithSkeleton
          showSkeleton={loading}
          skeleton={<Skeleton className={styles.card__title} />}
        >
          <Text
            className={styles.card__title}
            view={TextView.p20}
            color={TextColor.primary}
            weight={TextWeight.medium}
            maxLines={2}
          >
            {title}
          </Text>
        </WithSkeleton>

        <WithSkeleton
          showSkeleton={loading}
          skeleton={
            <div className={styles.card__subtitle}>
              <Skeleton count={3} />
            </div>
          }
        >
          {contentSlot && (
            <Text
              className={styles.card__subtitle}
              view={TextView.p16}
              color={TextColor.secondary}
              maxLines={3}
            >
              {subtitle}
            </Text>
          )}
        </WithSkeleton>

        <div
          className={styles.card__footer}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <WithSkeleton
            showSkeleton={loading}
            skeleton={
              <Skeleton
                containerClassName={styles["flex-1"]}
                className={styles.card__skeleton__content}
                width={"50%"}
              />
            }
          >
            {contentSlot && (
              <Text
                view={TextView.p18}
                color={TextColor.primary}
                weight={TextWeight.medium}
                className={styles.card__content}
              >
                {contentSlot}
              </Text>
            )}
          </WithSkeleton>

          <WithSkeleton
            showSkeleton={loading}
            skeleton={
              <Skeleton
                containerClassName={styles["flex-1"]}
                className={styles.card__skeleton__action}
              />
            }
          >
            {actionSlot && (
              <div
                className={styles.card__action}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                {actionSlot}
              </div>
            )}
          </WithSkeleton>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);
