import * as React from "react";
import Button from "components/Button";
import Card from "components/Card";
// import styles from "./Products.module.scss";

export type ProductsProps = {
  lox?: boolean;
};

const Products: React.FC<ProductsProps> = () => {
  return (
    <Card
      title="Card"
      subtitle="subTitle"
      image="/vite.svg"
      actionSlot={<Button>В корзину</Button>}
    ></Card>
  );
};

export default Products;
