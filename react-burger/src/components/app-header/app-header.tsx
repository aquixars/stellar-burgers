import { useMemo } from "react";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./app-header.module.css";

const AppHeader = () => {
    const location = useLocation();
    const pathname = useMemo(() => location.pathname, [location.pathname]);

    return (
        <header className={cn(styles.root)}>
            <div className={styles.container}>
                <div className={styles.linksContainer}>
                    <Link className={styles.logo} to="/">
                        <Logo />
                    </Link>

                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) => cn(styles.link, { [styles.link_active]: isActive })}>
                        <BurgerIcon type={pathname === "/" ? "primary" : "secondary"} />
                        <p className="text text_type_main-default ml-2">Конструктор</p>
                    </NavLink>

                    <NavLink
                        to="/profile/orders"
                        end
                        className={({ isActive }) => cn(styles.link, { [styles.link_active]: isActive })}>
                        <ListIcon type={pathname === "/profile/orders" ? "primary" : "secondary"} />
                        <p className="text text_type_main-default ml-2">Лента заказов</p>
                    </NavLink>

                    <NavLink
                        to="/profile"
                        end
                        className={({ isActive }) =>
                            cn(styles.link, styles.link_right, { [styles.link_active]: isActive })
                        }>
                        <ProfileIcon type={pathname === "/profile" ? "primary" : "secondary"} />
                        <p className="text text_type_main-default ml-2">Личный кабинет</p>
                    </NavLink>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
