import cn from "classnames";
import * as React from "react";

import { AiOutlineCloseSquare } from "react-icons/ai";

import { Link, useLocation } from "react-router-dom";

import { navLinks } from "config/navLinks";
import { ReactComponent as Cart } from "styles/svg/cart.svg";
import { ReactComponent as Logo } from "styles/svg/logo.svg";
import { ReactComponent as LogoName } from "styles/svg/logoName.svg";
import { ReactComponent as MenuRight } from "styles/svg/menuRight.svg";
import { ReactComponent as User } from "styles/svg/user.svg";
import NavbarItem from "../NavbarItem";
import navItemStyles from "../NavbarItem/NavbarItem.module.scss";
import styles from "./Navbar.module.scss";

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
            {Object.entries(navLinks).map(([label, to]) => (
              <NavbarItem
                key={to}
                to={to}
                label={label}
                pathName={location.pathname}
              />
            ))}
          </div>
        </div>
        <div>
          <div className={styles["navbar__user-container"]}>
            <Link
              className={cn(
                navItemStyles.nav__item,
                location.pathname === "/cart" ? styles.active : ""
              )}
              to="/cart"
            >
              <Cart />
            </Link>
            <Link
              className={cn(
                navItemStyles.nav__item,
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
