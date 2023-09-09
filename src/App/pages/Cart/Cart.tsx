import * as React from "react";
import PageLabel from "components/PageLabel";
import styles from "./Cart.module.scss";

export type CartProps = {};

const Cart: React.FC<CartProps> = ({}) => {
  return (
    <div>
      <PageLabel title="Cart" description="Under maintenance"></PageLabel>
    </div>
  );
};

export default Cart;
