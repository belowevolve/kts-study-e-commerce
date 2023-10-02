import { observer } from "mobx-react-lite";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "components/AddToCartButton";
import Card from "components/Card";
import Text, { TextView } from "components/Text";
import WithSkeleton from "components/WithSkeleton";
import { Meta } from "config/globalEnums";
import { ROUTES } from "config/routes";
import ProductsStore from "store/ProductsStore";
import rootStore from "store/RootStore/instance";
import { useLocalStore } from "utils/useLocalStore";
import styles from "./RelatedItems.module.scss";

export type RelatedItemsProps = {
  id?: string;
  title?: string;
};

const RelatedItems: React.FC<RelatedItemsProps> = ({ id, title }) => {
  const productsStore = useLocalStore(() => new ProductsStore());
  React.useEffect(() => {
    productsStore.getProductsList({
      page: String(Math.floor(Math.random() * 10) + 1),
    });
  }, [id, productsStore]);

  const navigate = useNavigate();

  return (
    <div className={styles.related}>
      {title && (
        <Text view={TextView.title} className={styles.related__text}>
          {title}
        </Text>
      )}
      <div className={styles.related__recs}>
        <WithSkeleton
          showSkeleton={productsStore.meta === Meta.loading}
          skeleton={Array(12)
            .fill(0)
            .map((_, index) => (
              <Card
                key={`related-skeleton-${index}`}
                className={styles.related__recs__product}
                loading
              />
            ))}
        >
          {productsStore.list.map((product) => (
            <React.Fragment key={`related-${product.id}`}>
              {!rootStore.cartStore.cartIncludeItem(product.id) &&
                id !== product.id.toString() && (
                  <Card
                    onClick={() =>
                      navigate(ROUTES.PRODUCTS.index + "/" + product.id)
                    }
                    captionSlot={product.category}
                    title={product.title}
                    subtitle={product.description}
                    contentSlot={`${product.price} $`}
                    image={product.images[0]}
                    actionSlot={<AddToCartButton product={product} />}
                    className={styles.related__recs__product}
                  />
                )}
            </React.Fragment>
          ))}
        </WithSkeleton>
      </div>
    </div>
  );
};

export default observer(RelatedItems);
