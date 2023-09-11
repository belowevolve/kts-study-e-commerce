import cn from "classnames";
import * as React from "react";

import { AiOutlineCloseSquare } from "react-icons/ai";

import { Link, useLocation } from "react-router-dom";
import Text from "components/Text";
import { ReactComponent as Cart } from "styles/svg/cart.svg";
import { ReactComponent as Logo } from "styles/svg/logo.svg";
import { ReactComponent as LogoName } from "styles/svg/logoName.svg";
import { ReactComponent as MenuRight } from "styles/svg/menuRight.svg";
import { ReactComponent as User } from "styles/svg/user.svg";
import styles from "./Navbar.module.scss";

export type NavbarItemProps = {
  to: string;
  text: string;
  pathName: string;
};

const NavbarItem: React.FC<NavbarItemProps> = ({ to, text, pathName }) => {
  const isActive = pathName.includes(to);
  return (
    <Link
      className={cn(styles.nav__item, isActive ? styles.active : "")}
      to={to}
    >
      <Text view="p-18">{text}</Text>
      <div className={cn(styles.link, isActive ? styles.active : "")}></div>
    </Link>
  );
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const menuToggler = () => setMenuOpen((p) => !p);

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__content}>
        <div>
          <Link to="/" className={styles.logo}>
            <Logo />
            <LogoName />
          </Link>
        </div>

        <div>
          <div className={cn(styles.nav, menuOpen ? styles["nav--open"] : "")}>
            <NavbarItem
              to="/products"
              text="Products"
              pathName={location.pathname}
            />
            <NavbarItem
              to="/categories"
              text="Categories"
              pathName={location.pathname}
            />
            <NavbarItem
              to="/about"
              text="About us"
              pathName={location.pathname}
            />
          </div>
        </div>
        <div>
          <div className={styles.navbar__user_container}>
            <Link
              className={cn(
                styles.nav__item,
                location.pathname === "/cart" ? styles.active : ""
              )}
              to="/cart"
            >
              <Cart />
            </Link>
            <Link
              className={cn(
                styles.nav__item,
                location.pathname === "/user" ? styles.active : ""
              )}
              to="/user"
            >
              <User />
            </Link>
            <button className={styles.navbar__toggler} onClick={menuToggler}>
              {!menuOpen ? <MenuRight /> : <AiOutlineCloseSquare />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
