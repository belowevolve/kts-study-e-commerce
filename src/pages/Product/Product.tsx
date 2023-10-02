import { observer } from "mobx-react-lite";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import RelatedItems from "components/RelatedItems";
import Text, { TextView } from "components/Text";
import WithSkeleton from "components/WithSkeleton";
import { Meta } from "config/globalEnums";
import ProductStore from "store/ProductStore";
import { getInitialProductItemModel } from "store/models/products";
import ArrowLeft from "styles/svg/arrowLeft.svg";
import { useLocalStore } from "utils/useLocalStore";
import ProductInfo from "./components/ProductInfo";
import styles from "./Product.module.scss";

const Product: React.FC = () => {
  const { id } = useParams();
  const productStore = useLocalStore(() => new ProductStore());
  React.useEffect(() => {
    productStore.getProduct({ id: id || "" });
  }, [id, productStore]);

  const navigate = useNavigate();

  return (
    <div className={styles["product-page"]}>
      <div className={styles.back} onClick={() => navigate(-1)}>
        <ArrowLeft style={{ strokeWidth: "1.5" }} />
        <Text view={TextView.p20}>Back</Text>
      </div>
      <WithSkeleton
        showSkeleton={productStore.meta === Meta.loading}
        skeleton={<ProductInfo product={getInitialProductItemModel()} />}
      >
        <ProductInfo product={productStore.product} />
      </WithSkeleton>
      <RelatedItems id={id} title="Related Items" />
    </div>
  );
};

export default observer(Product);
