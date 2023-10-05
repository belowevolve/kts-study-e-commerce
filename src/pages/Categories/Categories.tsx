import { observer } from "mobx-react-lite";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import AnimationPage from "components/AnimationPage";
import Card from "components/Card";
import PageLabel from "components/PageLabel";
import WithSkeleton from "components/WithSkeleton";
import { Meta } from "config/globalEnums";
import { ROUTES } from "config/routes";
import CategoryStore from "store/CategoryStore";
import { useLocalStore } from "utils/useLocalStore";
import styles from "./Categories.module.scss";

const Categories: React.FC = () => {
  const categoryStore = useLocalStore(() => new CategoryStore());
  const navigate = useNavigate();
  React.useEffect(() => {
    categoryStore.getCategoriesList();
  }, []);

  return (
    <AnimationPage className={styles["categories-page"]}>
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
                navigate(
                  ROUTES.PRODUCTS.index + `?include=${category.id}&page=1`
                )
              }
              title={category.name}
              image={category.image}
            />
          ))}
        </WithSkeleton>
      </div>
    </AnimationPage>
  );
};

export default observer(Categories);
