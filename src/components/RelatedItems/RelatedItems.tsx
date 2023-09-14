import * as React from "react";

import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import Card from "components/Card";
import Loader from "components/Loader";
import Text, { TextView } from "components/Text";
import useFetchProducts from "pages/Products/hooks/useFetchProducts";
import styles from "./RelatedItems.module.scss";

export type RelatedItemsProps = { title?: string };

const RelatedItems: React.FC<RelatedItemsProps> = ({ title }) => {
  const {
    data: recs,
    loading: recsLoading,
    error: recsError,
  } = useFetchProducts("", "", 0, 4);
  const navigate = useNavigate();
  console.log(recs, recsLoading, recsError);
  return (
    <div className={styles.related}>
      {title && (
        <Text view={TextView.title} className={styles.related__text}>
          {title}
        </Text>
      )}
      {recsLoading ? (
        <Loader />
      ) : (
        <div className={styles.related__recs}>
          {recs?.map((product) => (
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
      )}
    </div>
  );
};

export default RelatedItems;
