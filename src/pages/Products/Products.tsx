import { observer, useLocalObservable } from "mobx-react-lite";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "components/Button";
import Card from "components/Card";
import CardSkeleton from "components/Card/CardSkeleton";
import Input from "components/Input";
import MultiDropdown, { Option } from "components/MultiDropdown";
import PageLabel from "components/PageLabel";
import Pagination from "components/Pagination";
import Text, { TextColor, TextView, TextWeight } from "components/Text";
import { Meta } from "config/globalEnums";
import { QUERY_PARAM_PAGE } from "config/searchParams";
import CategoryStore from "store/CategoryStore";
import ProductStore from "store/ProductStore";
import rootStore from "store/RootStore";
import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";
import Cross from "styles/svg/cross.svg";
import styles from "./Products.module.scss";

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  useQueryParamsStoreInit();

  const productStore = useLocalObservable(() => new ProductStore());
  const categoryStore = useLocalObservable(() => new CategoryStore());

  const [include, setInclude] = React.useState<Option[]>([]);
  const [substring, setSubstring] = React.useState(
    () => (rootStore.query.getParam("substring") as string) || ""
  );

  const includeIds: string = React.useMemo(
    () =>
      include.reduce(
        (query, category) => query + String(category.key) + "|",
        ""
      ),
    [include]
  );

  React.useEffect(() => {
    productStore.getProductsList({
      substring: substring,
      include: (rootStore.query.getParam("include") as string) || "",
      page: searchParams.get(QUERY_PARAM_PAGE) || "1",
    });

    productStore.getLength({
      substring,
      include: (rootStore.query.getParam("include") as string) || "",
    });

    const fetchCategories = async () => {
      await categoryStore.getCategoriesList();
      setInclude(() =>
        ((rootStore.query.getParam("include") as string) || "")
          .split("|")
          .filter((id) => id.trim() !== "")
          .map((el) => ({
            key: el,
            value: categoryStore.collectionList.entities[el].name,
          }))
      );
    };
    fetchCategories();
  }, []);

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setSearchParams(`?substring=${substring}&include=${includeIds}&page=1`);
      productStore.getLength({
        substring,
        include: includeIds,
      });
    },

    [setSearchParams, substring, includeIds, productStore]
  );

  const OPTIONS = React.useMemo(
    () =>
      categoryStore.list!.map((category) => ({
        key: category.id,
        value: category.name,
      })),
    [categoryStore.list]
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
            options={OPTIONS}
            onChange={setInclude}
            value={include}
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
          {productStore.meta === Meta.loading && (
            <CardSkeleton className={styles.product} amount={12} />
          )}
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
            ></Card>
          ))}
        </div>
      </div>
      <Pagination
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        itemsLength={productStore.length}
        pagesToShow={3}
      />
    </>
  );
};

export default observer(Products);
