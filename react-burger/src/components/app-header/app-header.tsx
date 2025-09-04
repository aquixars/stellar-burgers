import styles from "./app-header.module.css";

import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => (
    <header className={styles.headerRoot}>
        {/* логотип бургерной */}
        <a className={styles.logo} href="/">
            <Logo />
        </a>

        {/* блок с конструктором */}
        <a className={`${styles.buttonBlock} ${styles.colorWhite}`} href="/">
            <BurgerIcon type="primary" />

            <p className="text text_type_main-default ml-2">Конструктор</p>
        </a>

        {/* блок с лентой заказов */}
        <a className={`${styles.buttonBlock} text_color_inactive`} href="/">
            <ListIcon type="secondary" />

            <p className="text text_type_main-default ml-2">Лента заказов</p>
        </a>

        {/* блок с личным кабинетом */}
        <a className={`${styles.buttonBlock} text_color_inactive ${styles.mla}`} href="/">
            <ProfileIcon type="secondary" />

            <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </a>
    </header>
);

export default AppHeader;
