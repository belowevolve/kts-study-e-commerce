import { observer } from "mobx-react-lite";
import * as React from "react";
import Button from "components/Button";
import Input from "components/Input";
import { NUMBER_INPUT_KEYS } from "config/numberInputKeys";
import rootStore from "store/RootStore/instance";
import { ProductItemModel } from "store/models/products";
import styles from "./AddToCartButton.module.scss";

export type AddToCartButtonProps = {
  className?: string;
  product: ProductItemModel;
  inCart?: boolean;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  className,
  product,
  inCart = false,
}) => {
  const id = product.id;
  const quantity = rootStore.cartStore.itemQuantity(id);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = quantity.toString();
    }
  }, [quantity]);

  const handleBlur = React.useCallback(() => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      if (/^[1-9][0-9]?$/.test(inputValue)) {
        rootStore.cartStore.setQuantity(id, +inputValue);
      } else {
        inputRef.current.value = quantity.toString();
      }
    }
  }, [id, quantity]);

  const useDecQuantity = React.useCallback(() => {
    rootStore.cartStore.decQuantity(id);
  }, [id]);

  const useIncQuantity = React.useCallback(() => {
    rootStore.cartStore.incQuantity(id);
  }, [id]);

  const useAddToCart = React.useCallback(() => {
    rootStore.cartStore.addToCart(product);
  }, [product]);

  return (
    <>
      {quantity > 0 ? (
        <div className={styles.stepper}>
          <Button
            className={styles.stepper__button}
            disabled={quantity === 1 && inCart}
            onClick={useDecQuantity}
          >
            -
          </Button>
          <Input
            className={styles.stepper__input}
            ref={inputRef}
            onChange={() => {}}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (!/^\d$/.test(e.key) && !NUMBER_INPUT_KEYS.includes(e.key)) {
                e.preventDefault();
              }
            }}
            type="number"
            min={1}
            max={99}
            maxLength={2}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onPaste={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
          <Button
            className={styles.stepper__button}
            disabled={quantity >= 99 && inCart}
            onClick={useIncQuantity}
          >
            +
          </Button>
        </div>
      ) : (
        <Button className={className} onClick={useAddToCart}>
          Add To Cart
        </Button>
      )}
    </>
  );
};

export default observer(AddToCartButton);
