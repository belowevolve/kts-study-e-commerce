import cn from "classnames";
import * as React from "react";
import Skeleton from "react-loading-skeleton";
import Text, { TextColor, TextView } from "components/Text";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./PageLabel.module.scss";

export type PageLabelProps = {
  title?: string;
  description?: string;
  className?: string;
};

const PageLabel: React.FC<PageLabelProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div className={cn(styles["page-label"], className)}>
      <Text view={TextView.title}>{title || <Skeleton />}</Text>
      <Text view={TextView.p20} color={TextColor.secondary}>
        {description || <Skeleton count={3} />}
      </Text>
    </div>
  );
};

export default PageLabel;
