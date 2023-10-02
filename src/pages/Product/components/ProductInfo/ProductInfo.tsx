import * as React from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "components/AddToCartButton";
import Button from "components/Button";
import PageLabel from "components/PageLabel";
import Text, { TextView } from "components/Text";
import WithSkeleton from "components/WithSkeleton";
import { ROUTES } from "config/routes";
import rootStore from "store/RootStore/instance";
import { ProductItemModel } from "store/models/products";
import ImageSlider from "../ImageSlider";
import sliderStyles from "../ImageSlider/ImageSlider.module.scss";
import styles from "./ProductInfo.module.scss";
import "react-loading-skeleton/dist/skeleton.css";

export type ProductInfoProps = {
  product: ProductItemModel;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.product}>
      <WithSkeleton
        showSkeleton={!product.images[0]}
        skeleton={
          <div className={styles.skeleton__slider}>
            <Skeleton inline={true} className={styles.skeleton__slider__img} />
          </div>
        }
      >
        <ImageSlider
          className={styles.product__slider}
          images={product.images.map((image) => ({
            original: image,
            bulletClass: sliderStyles.slider__bullet,
          }))}
        />
      </WithSkeleton>

      <div className={styles.product__info}>
        <PageLabel
          title={product.title}
          description={product.description}
          className={styles.product__label}
        />

        <div className={styles.product__price}>
          <Text view={TextView.title}>
            {product.price ? `$${product.price}` : <Skeleton />}
          </Text>
        </div>

        <div className={styles.product__buy}>
          <WithSkeleton
            showSkeleton={!product.id}
            skeleton={
              <Skeleton
                containerClassName={styles["skeleton__flex-1"]}
                className={styles.skeleton__button}
              />
            }
          >
            <Button
              onClick={() => {
                rootStore.cartStore.buyNow(product);
                navigate(ROUTES.CART);
              }}
            >
              Buy Now
            </Button>
          </WithSkeleton>

          <WithSkeleton
            showSkeleton={!product.id}
            skeleton={
              <Skeleton
                containerClassName={styles["skeleton__flex-1"]}
                className={styles.skeleton__button}
              />
            }
          >
            <AddToCartButton
              product={product}
              className={styles["product__buy__add-to-cart"]}
            />
          </WithSkeleton>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductInfo);
