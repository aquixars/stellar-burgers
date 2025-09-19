import cn from "classnames";
import styles from "./app-header.module.css";

import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => (
    <header className={cn(styles.root)}>
        <a className={styles.logo} href="/">
            <Logo />
        </a>
        <a className={cn(styles.link, styles.link_active)} href="/">
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default ml-2">Конструктор</p>
        </a>
        <a className={styles.link} href="/">
            <ListIcon type="secondary" />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
        </a>
        <a className={cn(styles.link, styles.link_right)} href="/">
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </a>
    </header>
);

export default AppHeader;
