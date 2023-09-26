import { observer } from "mobx-react-lite";
import * as React from "react";

import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import Card from "components/Card";

import Text, { TextView } from "components/Text";
import WithSkeleton from "components/WithSkeleton";
import { Meta } from "config/globalEnums";
import ProductsStore from "store/ProductsStore";
import styles from "./RelatedItems.module.scss";

export type RelatedItemsProps = {
  title?: string;
  category?: string;
  productsStore: ProductsStore;
};

const RelatedItems: React.FC<RelatedItemsProps> = ({
  title,
  productsStore,
}) => {
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
                className={styles.related__recs__product}
                loading
                key={`card-skeleton-${index}`}
              />
            ))}
        >
          {productsStore.list?.map((product) => (
            <Card
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
              captionSlot={product.category}
              title={product.title}
              subtitle={product.description}
              contentSlot={`${product.price} $`}
              image={product.images[0]}
              actionSlot={<Button>Add to cart</Button>}
              className={styles.related__recs__product}
            />
          ))}
        </WithSkeleton>
      </div>
    </div>
  );
};

export default observer(RelatedItems);
