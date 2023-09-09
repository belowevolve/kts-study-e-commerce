import * as React from "react";
import PageLabel from "components/PageLabel";
import styles from "./Categories.module.scss";

export type CategoriesProps = {};

const Categories: React.FC<CategoriesProps> = ({}) => {
  return (
    <div>
      <PageLabel
        title="Categories"
        description="Still building categories"
      ></PageLabel>
    </div>
  );
};

export default Categories;
