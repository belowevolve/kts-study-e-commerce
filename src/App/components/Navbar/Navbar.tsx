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

const Navbar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const menuToggler = () => setMenuOpen((p) => !p);

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__content}>
        <div className={styles.logo}>
          <Logo />
          <LogoName />
        </div>

        <div>
          <div className={cn(styles.nav, menuOpen ? styles["nav--open"] : "")}>
            <Link
              className={cn(
                styles.nav__item,
                location.pathname === "/products" ? styles.active : ""
              )}
              to="/products"
            >
              <Text view="p-18">Products</Text>
              <div
                className={cn(
                  styles.link,
                  location.pathname === "/products" ? styles.active : ""
                )}
              ></div>
            </Link>

            <Link
              className={cn(
                styles.nav__item,
                location.pathname === "/categories" ? styles.active : ""
              )}
              to="/categories"
            >
              <Text view="p-18">Categories</Text>
              <div
                className={cn(
                  styles.link,
                  location.pathname === "/categories" ? styles.active : ""
                )}
              ></div>
            </Link>
            <Link
              className={cn(
                styles.nav__item,
                location.pathname === "/about" ? styles.active : ""
              )}
              to="/about"
            >
              <Text view="p-18">About us</Text>
              <div
                className={cn(
                  styles.link,
                  location.pathname === "/about" ? styles.active : ""
                )}
              ></div>
            </Link>
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
