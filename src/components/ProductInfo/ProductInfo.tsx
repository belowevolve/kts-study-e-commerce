import * as React from "react";
import Button from "components/Button";
import ImageSlider from "components/ImageSlider";
import PageLabel from "components/PageLabel";
import Text, { TextView } from "components/Text";
import { ProductItemModel } from "store/models/product";
import styles from "./ProductInfo.module.scss";

export type ProductInfoProps = {
  product: ProductItemModel;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className={styles.product}>
      <ImageSlider
        className={styles.product__slider}
        images={product.images.map((image) => ({
          original: image,
        }))}
      />
      <div className={styles.product__info}>
        <PageLabel
          title={product.title}
          description={product.description}
          className={styles.product__label}
        ></PageLabel>
        <div className={styles.product__buy}>
          <Text view={TextView.title}>${product.price}</Text>
          <div>
            <Button>Buy Now</Button>
            <Button className={styles["product__buy__add-to-cart"]}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductInfo);
