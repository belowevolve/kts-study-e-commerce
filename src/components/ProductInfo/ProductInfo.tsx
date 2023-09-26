import * as React from "react";
import Skeleton from "react-loading-skeleton";
import Button from "components/Button";
import ImageSlider from "components/ImageSlider";
import PageLabel from "components/PageLabel";
import Text, { TextView } from "components/Text";
import { ProductItemModel } from "store/models/product";
import styles from "./ProductInfo.module.scss";
import "react-loading-skeleton/dist/skeleton.css";

export type ProductInfoProps = {
  product: ProductItemModel;
  loading?: boolean;
};

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  loading = false,
}) => {
  return (
    <div className={styles.product}>
      {loading ? (
        <div className={styles.skeleton__slider}>
          <Skeleton
            inline={true}
            style={{ position: "absolute" }}
            className={styles.skeleton__slider__img}
          />
        </div>
      ) : (
        <ImageSlider
          className={styles.product__slider}
          images={product.images.map((image) => ({
            original: image,
          }))}
        />
      )}
      <div className={loading ? styles.skeleton__info : styles.product__info}>
        {loading ? (
          <>
            <Skeleton className={styles.skeleton__label} />
            <div className={styles.skeleton__description}>
              <Skeleton count={5} />
            </div>
          </>
        ) : (
          <PageLabel
            title={product.title}
            description={product.description}
            className={styles.product__label}
          />
        )}

        <div className={styles.product__price}>
          {loading ? (
            <div className={styles.skeleton__price}>
              <Skeleton className={styles.skeleton__label} />
            </div>
          ) : (
            <Text view={TextView.title}>${product.price}</Text>
          )}
        </div>
        <div className={styles.product__buy}>
          {loading ? (
            <Skeleton
              containerClassName={styles["skeleton__flex-1"]}
              className={styles.skeleton__label}
            />
          ) : (
            <Button>Buy Now</Button>
          )}
          {loading ? (
            <Skeleton
              containerClassName={styles["skeleton__flex-1"]}
              className={styles.skeleton__label}
            />
          ) : (
            <Button className={styles["product__buy__add-to-cart"]}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductInfo);
