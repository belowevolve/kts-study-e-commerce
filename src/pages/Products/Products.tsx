import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddToCartButton from "components/AddToCartButton";
import Button from "components/Button";
import Card from "components/Card";
import Input from "components/Input";
import MultiDropdown, { Option } from "components/MultiDropdown";
import PageLabel from "components/PageLabel";
import Text, { TextColor, TextView, TextWeight } from "components/Text";
import WithSkeleton from "components/WithSkeleton";
import { Meta } from "config/globalEnums";
import { QUERY_PARAMS } from "config/queryParams";
import { ROUTES } from "config/routes";
import CategoryStore from "store/CategoryStore";
import ProductsStore from "store/ProductsStore";
import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";
import rootStore from "store/RootStore/instance";
import Cross from "styles/svg/cross.svg";
import { useLocalStore } from "utils/useLocalStore";
import Pagination from "./components/Pagination";
import styles from "./Products.module.scss";

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  useQueryParamsStoreInit();

  const productsStore = useLocalStore(() => new ProductsStore());
  const categoryStore = useLocalStore(() => new CategoryStore());
  const includedIds = categoryStore.includedIds;

  const [substring, setSubstring] = React.useState(
    () => (rootStore.query.getParam("substring") as string) || ""
  );

  React.useEffect(() => {
    const include = searchParams.get(QUERY_PARAMS.INCLUDE) || "";
    productsStore.getProductsList({
      substring: substring,
      include: include,
      page: searchParams.get(QUERY_PARAMS.PAGE) || "1",
    });

    productsStore.getLength({
      substring,
      include: include,
    });

    categoryStore.getCategoriesList(include);
  }, []);

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setSearchParams(
        `?substring=${substring.toLowerCase()}&include=${includedIds}&page=1`
      );

      productsStore.getLength({
        substring,
        include: includedIds,
      });
    },

    [setSearchParams, substring, includedIds, productsStore]
  );

  return (
    <div className={styles["products-page"]}>
      <PageLabel
        title="Products"
        description="We display products based on the latest products we have, if you want
to see our old products please enter the name of the item"
      ></PageLabel>

      <form onSubmit={handleSubmit} className={styles["search-container"]}>
        <div className={styles.find}>
          <Input
            value={substring}
            onChange={(e) => setSubstring(e)}
            placeholder="Search Products"
            afterSlot={
              substring && (
                <Cross
                  className={styles.cross}
                  onClick={() => setSubstring("")}
                />
              )
            }
          />
          <Button type="submit">Find Now</Button>
        </div>
        <MultiDropdown
          className={styles["multi-dropdown"]}
          options={categoryStore.options}
          onChange={categoryStore.setIncluded}
          value={toJS(categoryStore.included)}
          getTitle={(elements: Option[]) =>
            elements.length === 0
              ? "Choose category"
              : elements.map((el: Option) => el.value).join(" | ")
          }
        />
      </form>
      <div className={styles.total}>
        <Text view={TextView.title} className={styles.total__text}>
          Total products
        </Text>
        <Text
          view={TextView.p20}
          color={TextColor.accent}
          weight={TextWeight.bold}
        >
          {productsStore.length}
        </Text>
      </div>
      <div className={styles.products}>
        <WithSkeleton
          showSkeleton={productsStore.meta === Meta.loading}
          skeleton={Array(12)
            .fill(0)
            .map((_, index) => (
              <Card loading key={`card-skeleton-${index}`} />
            ))}
        >
          {productsStore?.list.map((product) => (
            <Card
              key={product.id}
              onClick={() => navigate(ROUTES.PRODUCTS.index + "/" + product.id)}
              captionSlot={product.category}
              title={product.title}
              subtitle={product.description}
              contentSlot={`${product.price} $`}
              image={product.images[0]}
              actionSlot={<AddToCartButton product={product} />}
            />
          ))}
        </WithSkeleton>
      </div>
      {productsStore.meta === Meta.success && productsStore.length && (
        <Pagination
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          itemsLength={productsStore.length}
          pagesToShow={3}
        />
      )}
    </div>
  );
};

export default observer(Products);
