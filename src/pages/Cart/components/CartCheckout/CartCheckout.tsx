import cn from "classnames";
import { observer } from "mobx-react-lite";
import * as React from "react";
import Button from "components/Button";
import Text, { TextColor, TextView, TextWeight } from "components/Text";
import { Meta } from "config/globalEnums";
import rootStore from "store/RootStore";
import styles from "./CartCheckout.module.scss";

export type CartCheckoutProps = {
  className?: string;
};

const CartCheckout: React.FC<CartCheckoutProps> = ({ className }) => {
  return (
    <div className={cn(styles.cart__checkout, className)}>
      <div className={styles.cart__checkout__total}>
        <Text view={TextView.p20} weight={TextWeight.bold}>
          Total:
        </Text>
        <Text
          view={TextView.p20}
          color={TextColor.accent}
          weight={TextWeight.medium}
        >
          {rootStore.cartStore.totalPrice}$
        </Text>
      </div>
      <div className={styles.cart__checkout__button}>
        <Button
          loading={rootStore.cartStore.meta === Meta.loading}
          className={styles["cart__checkout__button-btn"]}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default observer(CartCheckout);
