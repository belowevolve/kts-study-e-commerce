import { toJS } from "mobx";
import { observer, useLocalObservable } from "mobx-react-lite";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "components/Button";
import Card from "components/Card";
import Input from "components/Input";
import MultiDropdown, { Option } from "components/MultiDropdown";
import PageLabel from "components/PageLabel";
import Pagination from "components/Pagination";
import Text, { TextColor, TextView, TextWeight } from "components/Text";
import { Meta } from "config/globalEnums";
import { QUERY_PARAM_INCLUDE, QUERY_PARAM_PAGE } from "config/searchParams";
import CategoryStore from "store/CategoryStore";
import ProductStore from "store/ProductsStore";
import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";
import rootStore from "store/RootStore/instance";
import Cross from "styles/svg/cross.svg";
import styles from "./Products.module.scss";

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  useQueryParamsStoreInit();

  const productStore = useLocalObservable(() => new ProductStore());
  const categoryStore = useLocalObservable(() => new CategoryStore());
  const includedIds = categoryStore.includedIds;

  const [substring, setSubstring] = React.useState(
    () => (rootStore.query.getParam("substring") as string) || ""
  );

  React.useEffect(() => {
    const include = searchParams.get(QUERY_PARAM_INCLUDE) || "";
    productStore.getProductsList({
      substring: substring,
      include: include,
      page: searchParams.get(QUERY_PARAM_PAGE) || "1",
    });

    productStore.getLength({
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

      productStore.getLength({
        substring,
        include: includedIds,
      });
    },

    [setSearchParams, substring, includedIds, productStore]
  );

  return (
    <>
      <PageLabel
        title="Products"
        description="We display products based on the latest products we have, if you want
to see our old products please enter the name of the item"
      ></PageLabel>

      <div className={styles.products_page}>
        <form onSubmit={handleSubmit} className={styles.search_container}>
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
            {productStore.length}
          </Text>
        </div>
        <div className={styles.products}>
          {productStore.meta === Meta.loading &&
            Array(12)
              .fill(0)
              .map((_, index) => (
                <Card
                  className={styles.product}
                  loading
                  key={`card-skeleton-${index}`}
                />
              ))}
          {productStore?.list.map((product) => (
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
            />
          ))}
        </div>
      </div>
      <Pagination
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        itemsLength={toJS(productStore.length)}
        pagesToShow={3}
      />
    </>
  );
};

export default observer(Products);
