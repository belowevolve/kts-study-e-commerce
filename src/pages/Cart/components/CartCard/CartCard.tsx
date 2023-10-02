import cn from "classnames";
import { observer } from "mobx-react-lite";
import * as React from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "components/AddToCartButton";
import Text, { TextColor, TextView, TextWeight } from "components/Text";
import WithSkeleton from "components/WithSkeleton";
import { ROUTES } from "config/routes";
import rootStore from "store/RootStore/instance";
import { CartItemModel } from "store/models/products";
import Trash from "styles/svg/trash.svg";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./CartCard.module.scss";

export type CartCardProps = {
  item: CartItemModel;
  miniCart?: boolean;
  className?: string;
};

const CartCard: React.FC<CartCardProps> = ({
  item,
  className,
  miniCart = false,
}) => {
  const { product, quantity } = item;
  const { id, title, category, description, images, price } = product;
  const navigate = useNavigate();

  const useNavigateToProduct = React.useCallback(
    () => navigate(ROUTES.PRODUCTS.index + "/" + id),
    [id, navigate]
  );

  return (
    <div className={cn(styles["cart-card"], className)}>
      <div
        className={styles["product__image-container"]}
        onClick={useNavigateToProduct}
      >
        <WithSkeleton
          showSkeleton={!images[0]}
          skeleton={<Skeleton className={styles.product__image} />}
        >
          <img className={styles.product__image} src={images[0]} />
        </WithSkeleton>
      </div>
      <div className={styles.product__info} onClick={useNavigateToProduct}>
        <Text
          className={styles.product__info__title}
          view={TextView.p20}
          color={TextColor.primary}
          weight={TextWeight.medium}
          maxLines={2}
        >
          {title || <Skeleton />}
        </Text>
        <Text
          className={styles.product__info__category}
          view={TextView.p14}
          color={TextColor.secondary}
          weight={TextWeight.medium}
        >
          {category || <Skeleton />}
        </Text>
        {!miniCart && (
          <Text
            className={styles.product__info__description}
            view={TextView.p16}
            color={TextColor.secondary}
            maxLines={3}
          >
            {description || <Skeleton count={3} />}
          </Text>
        )}
      </div>

      <div className={styles.price}>
        <Text
          view={TextView.p20}
          color={TextColor.accent}
          weight={TextWeight.medium}
          className={styles.price_text}
        >
          {quantity ? (
            `$${price * quantity}`
          ) : (
            <Skeleton style={{ width: "50%" }} />
          )}
        </Text>
      </div>
      <div className={styles.button}>
        <WithSkeleton
          showSkeleton={!quantity}
          skeleton={<Skeleton className={styles.skeleton__button} />}
        >
          <AddToCartButton product={product} inCart={true} />
        </WithSkeleton>
      </div>
      {quantity > 1 && (
        <div className={styles["price-per-unit"]}>
          <Text view={TextView.p16} color={TextColor.secondary}>
            {price}$ / per unit
          </Text>
        </div>
      )}
      <button
        className={styles.trash}
        onClick={() => rootStore.cartStore.removeFromCart(id)}
      >
        <Trash className={styles["trash-icon"]} />
      </button>
    </div>
  );
};

export default React.memo(CartCard);
export const ObserverCartCard = observer(CartCard);
