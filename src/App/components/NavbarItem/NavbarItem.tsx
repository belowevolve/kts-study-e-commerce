import cn from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";
import Text from "components/Text";
import styles from "./NavbarItem.module.scss";

export type NavbarItemProps = {
  to: string;
  label: string;
  pathName: string;
};

const NavbarItem: React.FC<NavbarItemProps> = ({ to, label, pathName }) => {
  const isActive = pathName.includes(to);
  return (
    <Link
      className={cn(styles.nav__item, isActive ? styles.active : "")}
      to={to}
    >
      <Text view="p-18">{label}</Text>
      <div className={cn(styles.link, isActive ? styles.active : "")}></div>
    </Link>
  );
};

export default React.memo(NavbarItem);
