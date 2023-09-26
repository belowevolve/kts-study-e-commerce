import { observer, useLocalObservable } from "mobx-react-lite";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductInfo from "components/ProductInfo";
import RelatedItems from "components/RelatedItems";
import Text, { TextView } from "components/Text";
import WithSkeleton from "components/WithSkeleton";
import { Meta } from "config/globalEnums";
import ProductStore from "store/ProductStore";
import ProductsStore from "store/ProductsStore";
import { getInitialProductItemModel } from "store/models/product";
import ArrowLeft from "styles/svg/arrowLeft.svg";

import styles from "./Product.module.scss";

const Product: React.FC = () => {
  const { id } = useParams();
  const productStore = useLocalObservable(() => new ProductStore());
  const productsStore = useLocalObservable(() => new ProductsStore());

  React.useEffect(() => {
    productStore.getProduct(id || "");
    productsStore.getProductsList({
      page: String(Math.floor(Math.random() * 10) + 1),
    });
  }, [id]);

  const navigate = useNavigate();

  return (
    <div className={styles["product-page"]}>
      <div className={styles.back} onClick={() => navigate(-1)}>
        <ArrowLeft style={{ strokeWidth: "1.5" }} />
        <Text view={TextView.p20}>Back</Text>
      </div>
      <WithSkeleton
        showSkeleton={productStore.meta === Meta.loading}
        skeleton={
          <ProductInfo loading product={getInitialProductItemModel()} />
        }
      >
        <ProductInfo product={productStore.product} />
      </WithSkeleton>
      <RelatedItems productsStore={productsStore} title="Related Items" />
    </div>
  );
};

export default observer(Product);
