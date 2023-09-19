import { observer } from "mobx-react-lite";
import * as React from "react";

import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import Card from "components/Card";

import CardSkeleton from "components/Card/CardSkeleton";
import Text, { TextView } from "components/Text";
import { Meta } from "config/globalEnums";
import ProductStore from "store/ProductStore";
import styles from "./RelatedItems.module.scss";

export type RelatedItemsProps = { title?: string; productStore: ProductStore };

const RelatedItems: React.FC<RelatedItemsProps> = ({ title, productStore }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    productStore.getProductsList({
      include: productStore.product.category,
      page: String(Math.floor(Math.random() * 10) + 1),
    });
  }, []);

  return (
    <div className={styles.related}>
      {title && (
        <Text view={TextView.title} className={styles.related__text}>
          {title}
        </Text>
      )}
      <div className={styles.related__recs}>
        {productStore.meta === Meta.loading && (
          <CardSkeleton className={styles.related__recs__product} amount={12} />
        )}
        {productStore.list?.map((product) => (
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
          ></Card>
        ))}
      </div>
    </div>
  );
};

export default observer(RelatedItems);
