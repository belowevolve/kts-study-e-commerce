import cn from "classnames";
import * as React from "react";
import Text, { TextColor, TextView } from "components/Text";
import styles from "./PageLabel.module.scss";

export type PageLabelProps = {
  title: string;
  description: string;
  className?: string;
};

const PageLabel: React.FC<PageLabelProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div className={cn(styles["page-label"], className)}>
      <Text view={TextView.title}>{title}</Text>
      <Text view={TextView.p20} color={TextColor.secondary}>
        {description}
      </Text>
    </div>
  );
};

export default PageLabel;
