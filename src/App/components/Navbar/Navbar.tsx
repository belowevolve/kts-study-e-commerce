import cn from "classnames";
import * as React from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { navItemsLinks } from "config/navItemsLinks";
import { ROUTES } from "config/routes";
import Logo from "styles/svg/logo.svg";
import LogoName from "styles/svg/logoName.svg";
import MenuRight from "styles/svg/menuRight.svg";
import User from "styles/svg/user.svg";
import MiniCart from "../MiniCart";
import NavbarItem from "../NavbarItem";
import navItemStyles from "../NavbarItem/NavbarItem.module.scss";
import styles from "./Navbar.module.scss";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const menuToggler = React.useCallback(() => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  }, []);

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__content}>
        <div>
          <Link to="/" className={styles.logo}>
            <Logo className={styles.logo__svg} />
            <LogoName />
          </Link>
        </div>

        <div>
          <div className={cn(styles.nav, menuOpen ? styles["nav--open"] : "")}>
            {Object.entries(navItemsLinks).map(([label, to]) => (
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
            <MiniCart pathName={location.pathname} />
            <Link
              className={cn(
                navItemStyles.nav__item,
                location.pathname === ROUTES.USER ? navItemStyles.active : ""
              )}
              to={ROUTES.PRODUCTS.index}
            >
              <User className={styles["navbar__user-container__svg"]} />
            </Link>
            <button className={styles.navbar__toggler} onClick={menuToggler}>
              {!menuOpen ? (
                <MenuRight className={styles.navbar__toggler__svg} />
              ) : (
                <AiOutlineCloseSquare className={styles.navbar__toggler__svg} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
