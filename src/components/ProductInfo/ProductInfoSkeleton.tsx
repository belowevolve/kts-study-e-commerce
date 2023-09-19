import * as React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./ProductInfo.module.scss";

const ProductInfoSkeleton: React.FC = () => {
  return (
    <div className={styles.product}>
      <div className={styles.skeleton__slider}>
        <Skeleton
          inline={true}
          style={{ position: "absolute" }}
          className={styles.skeleton__slider__img}
        />
      </div>
      <div className={styles.skeleton__info}>
        <Skeleton className={styles.skeleton__label} />
        <div className={styles.skeleton__description}>
          <Skeleton count={5} />
        </div>
        <div className={styles.skeleton__description}>
          <Skeleton className={styles.skeleton__label} />
        </div>
        <div className={styles.skeleton__buy}>
          <Skeleton
            containerClassName={styles["skeleton__flex-1"]}
            className={styles.skeleton__label}
          />
          <Skeleton
            containerClassName={styles["skeleton__flex-1"]}
            className={styles.skeleton__label}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInfoSkeleton;
