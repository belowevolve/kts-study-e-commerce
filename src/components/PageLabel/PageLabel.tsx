import * as React from "react";
import Text from "components/Text";
import styles from "./PageLabel.module.scss";

export type PageLabelProps = {
  title: string;
  description: string;
  align?: "start" | "end" | "left" | "right" | "center";
  margin?: string;
};

const PageLabel: React.FC<PageLabelProps> = ({
  title,
  description,
  align = "center",
  margin = "100px auto 0",
}) => {
  return (
    <div
      className={styles.page_label}
      style={{
        textAlign: align,
        margin: margin,
      }}
    >
      <Text view="title">{title}</Text>
      <Text view="p-20" color="secondary">
        {description}
      </Text>
    </div>
  );
};

export default PageLabel;
