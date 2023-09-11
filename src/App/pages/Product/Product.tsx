import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "components/Button";
import Card from "components/Card";
import PageLabel from "components/PageLabel";
import Text from "components/Text";
import { ReactComponent as ArrowLeft } from "styles/svg/arrowLeft.svg";
import useFetchProducts from "../Products/hooks/useFetchProducts";
import ImageSlider from "./components/ImageSlider";
import useFetchProductById from "./hooks/useFetchProductById";
import styles from "./Product.module.scss";

const Product: React.FC = () => {
  const { id } = useParams();
  const { data: product, loading, error } = useFetchProductById(id ?? "");
  const {
    data: recs,
    loading: recsLoading,
    error: recsError,
  } = useFetchProducts(0, 4);
  console.log(recs, recsLoading, recsError, error);

  const navigate = useNavigate();
  return (
    <div className={styles.product_page}>
      <div className={styles.back} onClick={() => navigate(-1)}>
        <ArrowLeft style={{ strokeWidth: "1.5" }} />
        <Text view="p-20">Back</Text>
      </div>
      {loading ? (
        <div className={styles.loading}>loading</div>
      ) : (
        <div className={styles.product}>
          <ImageSlider
            images={product!.images.map((image) => ({
              original: image,
            }))}
          />
          <div className={styles.product__info}>
            <PageLabel
              title={product!.title}
              description={product!.description}
              align={"start"}
              margin="0px"
            ></PageLabel>
            <div className={styles.product__buy}>
              <Text view="title">${product?.price}</Text>
              <div className={styles.product__buy_buttons}>
                <Button>Buy Now</Button>
                <Button className={styles.add_to_cart}>Add to Cart</Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.related}>
        <Text view="title" className={styles.related__text}>
          Related Items
        </Text>
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
      </div>
    </div>
  );
};

export default Product;
