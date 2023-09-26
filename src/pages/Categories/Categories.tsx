import { observer, useLocalObservable } from "mobx-react-lite";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Card from "components/Card";
import PageLabel from "components/PageLabel";
import WithSkeleton from "components/WithSkeleton";
import { Meta } from "config/globalEnums";
import CategoryStore from "store/CategoryStore";
import styles from "./Categories.module.scss";

const Categories: React.FC = () => {
  const categoryStore = useLocalObservable(() => new CategoryStore());
  const navigate = useNavigate();
  React.useEffect(() => {
    categoryStore.getCategoriesList();
  }, []);
  return (
    <div className={styles["categories-page"]}>
      <PageLabel title="Categories" description="Choose products by category" />
      <div className={styles.categories}>
        <WithSkeleton
          showSkeleton={categoryStore.meta === Meta.loading}
          skeleton={Array(12)
            .fill(0)
            .map((_, index) => (
              <Card loading key={`card-skeleton-${index}`} />
            ))}
        >
          {categoryStore?.list.map((category) => (
            <Card
              key={category.id}
              onClick={() =>
                navigate(`/products?include=${category.id}&page=1`)
              }
              title={category.name}
              image={category.image}
            />
          ))}
        </WithSkeleton>
      </div>
    </div>
  );
};

export default observer(Categories);
