import { observer } from "mobx-react-lite";
import * as React from "react";
import AnimationPage from "components/AnimationPage";
import PageLabel from "components/PageLabel";
import RelatedItems from "components/RelatedItems";
import WithSkeleton from "components/WithSkeleton";
import { Meta } from "config/globalEnums";
import rootStore from "store/RootStore/instance";
import { getInitialCartItemModel } from "store/models/products";
import CartCard, { ObserverCartCard } from "./components/CartCard";
import CartCheckout from "./components/CartCheckout";
import styles from "./Cart.module.scss";

const Cart: React.FC = () => {
  const cartEmptyAndNotLoading: boolean =
    rootStore.cartStore.totalItems === 0 &&
    rootStore.cartStore.meta !== Meta.loading;
  return (
    <AnimationPage className={styles["cart-page"]}>
      <PageLabel
        title="Cart"
        description={cartEmptyAndNotLoading ? "Your cart is empty" : " "}
      />
      <div className={styles.cart}>
        <div className={styles.cart__items}>
          <WithSkeleton
            showSkeleton={rootStore.cartStore.meta === Meta.loading}
            skeleton={Array(5)
              .fill(0)
              .map((_, index) => (
                <CartCard
                  key={`cart-card-skeleton-${index}`}
                  item={getInitialCartItemModel()}
                />
              ))}
          >
            {rootStore.cartStore.cartItems.map((item) => (
              <ObserverCartCard
                key={`cart-card-${item.product.id}`}
                item={item}
              />
            ))}
          </WithSkeleton>
        </div>
        {!cartEmptyAndNotLoading && <CartCheckout />}
      </div>

      <RelatedItems id={""} title="You might Like" />
    </AnimationPage>
  );
};

export default observer(Cart);
