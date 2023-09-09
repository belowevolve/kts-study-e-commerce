import * as React from "react";
import Button from "components/Button";
import Card from "components/Card";
import Input from "components/Input";
import MultiDropdown, { Option } from "components/MultiDropdown";
import PageLabel from "components/PageLabel";
import Text from "components/Text";

import { ReactComponent as Cross } from "styles/svg/cross.svg";

import useProducts from "./Hooks/useProducts";

import styles from "./Products.module.scss";

const Products = () => {
  const { products } = useProducts();
  console.log(products);
  return (
    <>
      <PageLabel
        title="Products"
        description="We display products based on the latest products we have, if you want
to see our old products please enter the name of the item"
      ></PageLabel>

      <div className={styles.products_page}>
        <div className={styles.search_container}>
          <div className={styles.find}>
            <Input
              value=""
              onChange={() => {}}
              afterSlot={<Cross className={styles.cross} />}
              placeholder="Search Products"
            ></Input>
            <Button>Find Now</Button>
          </div>
          <MultiDropdown
            options={[
              { key: "msk", value: "Москва" },
              { key: "spb", value: "Санкт-Петербург" },
              { key: "ekb", value: "Екатеринбург" },
            ]}
            value={[{ key: "msk", value: "Москва" }]}
            onChange={() => {}}
            getTitle={(elements: Option[]) =>
              elements.map((el: Option) => el.key).join()
            }
          ></MultiDropdown>
        </div>
        <div className={styles.total}>
          <Text view="title">Total products</Text>
          <Text view="p-20" color="accent">
            soon
          </Text>
        </div>
        <div className={styles.products}>
          {products.map((product) => (
            <Card
              key={product.id}
              captionSlot={product.category}
              title={product.title}
              subtitle={product.description}
              contentSlot={`${product.price} $`}
              image={product.image}
              actionSlot={<Button>Add to cart</Button>}
              className={styles.product}
            ></Card>
          ))}
        </div>
        <div className={styles.pagination}></div>
      </div>
    </>
  );
};

export default Products;
