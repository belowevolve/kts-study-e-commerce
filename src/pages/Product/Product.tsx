import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "components/Button";

import ImageSlider from "components/ImageSlider";
import Loader from "components/Loader";
import PageLabel from "components/PageLabel";
import RelatedItems from "components/RelatedItems";
import Text, { TextView } from "components/Text";
import { ReactComponent as ArrowLeft } from "styles/svg/arrowLeft.svg";
import useFetchProductById from "./hooks/useFetchProductById";
import styles from "./Product.module.scss";

const Product: React.FC = () => {
  const { id } = useParams();
  const { data: product, loading, error } = useFetchProductById(id ?? "");
  console.log(error);
  const navigate = useNavigate();
  return (
    <div className={styles["product-page"]}>
      <div className={styles.back} onClick={() => navigate(-1)}>
        <ArrowLeft style={{ strokeWidth: "1.5" }} />
        <Text view={TextView.p20}>Back</Text>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.product}>
          <ImageSlider
            className={styles.product__slider}
            images={product!.images.map((image) => ({
              original: image,
            }))}
          />
          <div className={styles.product__info}>
            <PageLabel
              title={product!.title}
              description={product!.description}
              className={styles.product__label}
            ></PageLabel>
            <div className={styles.product__buy}>
              <Text view={TextView.title}>${product?.price}</Text>
              <div>
                <Button>Buy Now</Button>
                <Button className={styles["product__buy__add-to-cart"]}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <RelatedItems title="Related Items" />
    </div>
  );
};

export default Product;
