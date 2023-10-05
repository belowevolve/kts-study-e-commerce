import cn from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { Link } from "react-router-dom";
import Text, { TextTag, TextView } from "components/Text";
import { ROUTES } from "config/routes";
import { ObserverCartCard } from "pages/Cart/components/CartCard";
import CartCheckout from "pages/Cart/components/CartCheckout";
import rootStore from "store/RootStore";
import Cart from "styles/svg/cart.svg";
import navItemStyles from "../NavbarItem/NavbarItem.module.scss";
import styles from "./MiniCart.module.scss";

export type MiniCartProps = {
  pathName: string;
};
const MiniCart: React.FC<MiniCartProps> = ({ pathName }) => {
  const [miniCartOpen, setMiniCartOpen] = React.useState<boolean>(false);
  const miniCartToggler = React.useCallback(() => {
    setMiniCartOpen((prevMiniCartOpen) => !prevMiniCartOpen);
  }, []);
  return (
    <span
      className={styles["mini-cart"]}
      onMouseEnter={miniCartToggler}
      onMouseLeave={miniCartToggler}
    >
      <Link
        className={cn(
          navItemStyles.nav__item,
          pathName === ROUTES.CART ? navItemStyles.active : ""
        )}
        to={ROUTES.CART}
      >
        <div className={styles["mini-cart__total-items"]}>
          <Text
            tag={TextTag.span}
            view={TextView.p14}
            className={styles["mini-cart__total-items__text"]}
          >
            {rootStore.cartStore.totalItems || ""}
          </Text>
        </div>
        <Cart className={styles["mini-cart__svg"]} />
      </Link>
      <AnimatePresence>
        {pathName !== ROUTES.CART &&
          rootStore.cartStore.totalItems > 0 &&
          miniCartOpen && (
            <motion.div
              className={styles["mini-cart__container"]}
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CartCheckout
                className={styles["mini-cart__container__checkout"]}
              />
              <div className={styles["mini-cart__container__items"]}>
                {rootStore.cartStore.cartItems.map((item) => (
                  <ObserverCartCard
                    key={`cart-card-${item.product.id}`}
                    item={item}
                    className={styles["mini-cart__container__items_item"]}
                    miniCart
                  />
                ))}
              </div>
            </motion.div>
          )}
      </AnimatePresence>
    </span>
  );
};

export default observer(MiniCart);
