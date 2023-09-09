import * as React from "react";
import Text from "components/Text";
import styles from "./PageLabel.module.scss";

export type PageLabelProps = {
  title: string;
  description: string;
  align?: "start" | "end" | "left" | "right" | "center";
};

const PageLabel: React.FC<PageLabelProps> = ({
  title,
  description,
  align = "center",
}) => {
  return (
    <div className={styles.page_label} style={{ textAlign: align }}>
      <Text view="title">{title}</Text>
      <Text view="p-20" color="secondary">
        {description}
      </Text>
    </div>
  );
};

export default PageLabel;
