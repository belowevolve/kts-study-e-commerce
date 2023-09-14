import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import Card from "components/Card";
import Input from "components/Input";
import Loader from "components/Loader";
import MultiDropdown, { Option } from "components/MultiDropdown";
import PageLabel from "components/PageLabel";
import Text, { TextColor, TextView, TextWeight } from "components/Text";
import useFetchCategories from "hooks/useFetchCategories";

import useFetchProducts from "./hooks/useFetchProducts";
import styles from "./Products.module.scss";

const Products: React.FC = () => {
  const [include, setInclude] = React.useState<Option[]>([]);
  const [substring, setSubstring] = React.useState("");
  const [offset, setOffset] = React.useState(0);
  const [limit, setLimit] = React.useState(undefined);
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetchCategories();

  const {
    data: products,
    loading,
    error,
  } = useFetchProducts(
    include.reduce((query, category) => query + String(category.key) + "|", ""),
    substring,
    offset,
    limit
  );

  console.log(setOffset, setLimit, categoriesError, loading, error);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const navigate = useNavigate();
  return (
    <>
      <PageLabel
        title="Products"
        description="We display products based on the latest products we have, if you want
to see our old products please enter the name of the item"
      ></PageLabel>

      <div className={styles.products_page}>
        <div className={styles.search_container}>
          <form onSubmit={handleSubmit} className={styles.find}>
            <Input
              value={substring}
              onChange={(e) => setSubstring(e)}
              placeholder="Search Products"
            />
            <Button type="submit">Find Now</Button>
          </form>
          {categoriesLoading ? (
            <Loader />
          ) : (
            <MultiDropdown
              className={styles.multiDropdown}
              options={categories!.map((category) => ({
                key: category.id,
                value: category.name,
              }))}
              value={include}
              onChange={(e) => {
                setInclude(e);
              }}
              getTitle={(elements: Option[]) =>
                elements.length === 0
                  ? "Choose category"
                  : elements.map((el: Option) => el.value).join(" | ")
              }
            ></MultiDropdown>
          )}
        </div>
        <div className={styles.total}>
          <Text view={TextView.title} className={styles.total__text}>
            Total products
          </Text>
          <Text
            view={TextView.p20}
            color={TextColor.accent}
            weight={TextWeight.bold}
          >
            {products?.length}
          </Text>
        </div>
        <div className={styles.products}>
          {products?.map((product) => (
            <Card
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
              captionSlot={product.category}
              title={product.title}
              subtitle={product.description}
              contentSlot={`${product.price} $`}
              image={product.images[0]}
              actionSlot={<Button>Add to cart</Button>}
              className={styles.product}
            ></Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
