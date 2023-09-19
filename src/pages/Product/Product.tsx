import { observer, useLocalObservable } from "mobx-react-lite";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductInfo from "components/ProductInfo";
import ProductInfoSkeleton from "components/ProductInfo/ProductInfoSkeleton";
import RelatedItems from "components/RelatedItems";
import Text, { TextView } from "components/Text";
import { Meta } from "config/globalEnums";
import ProductStore from "store/ProductStore";
import { ReactComponent as ArrowLeft } from "styles/svg/arrowLeft.svg";

import styles from "./Product.module.scss";

const Product: React.FC = () => {
  const { id } = useParams();
  const productStore = useLocalObservable(() => new ProductStore());

  React.useEffect(() => {
    productStore.getProduct(id || "");
  }, [id]);

  const navigate = useNavigate();
  return (
    <div className={styles["product-page"]}>
      <div className={styles.back} onClick={() => navigate(-1)}>
        <ArrowLeft style={{ strokeWidth: "1.5" }} />
        <Text view={TextView.p20}>Back</Text>
      </div>
      {productStore.metaProduct === Meta.loading ? (
        <ProductInfoSkeleton />
      ) : (
        <ProductInfo product={productStore.product} />
      )}

      <RelatedItems productStore={productStore} title="Related Items" />
    </div>
  );
};

export default observer(Product);
