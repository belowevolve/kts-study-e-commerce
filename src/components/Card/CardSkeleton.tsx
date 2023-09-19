import * as React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./Card.module.scss";
export type CardSkeletonProps = {
  className?: string;
  amount?: number;
};

const CardSkeleton: React.FC<CardSkeletonProps> = ({
  className,
  amount = 1,
}) => {
  return Array(amount)
    .fill(0)
    .map((_, index) => (
      <div
        className={`${styles.card} ${className}`}
        key={`card-skeleton-${index}`}
      >
        <div className={styles.card__header}>
          <Skeleton
            inline={true}
            className={styles["card__card-img"]}
            style={{ position: "absolute" }}
          />
        </div>
        <div className={styles.card__body}>
          <Skeleton className={styles.card__caption} />

          <Skeleton className={styles.card__title} />
          <div className={styles.card__subtitle}>
            <Skeleton count={3} />
          </div>

          <div className={styles.card__footer}>
            <Skeleton
              containerClassName={styles["flex-1"]}
              className={styles.card__skeleton__content}
              width={"50%"}
            />

            <Skeleton
              containerClassName={styles["flex-1"]}
              className={styles.card__skeleton__action}
            />
          </div>
        </div>
      </div>
    ));
};

export default React.memo(CardSkeleton);
