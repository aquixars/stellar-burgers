import cn from "classnames";
import styles from "./profile-sidebar.module.css";

import { useAppDispatch } from "../../services/hooks";
import { logout } from "../../services/slices/user";
import { NavLink } from "react-router-dom";

const ProfileSidebar = () => {
    const dispatch = useAppDispatch();
    const handleLogoutClick = () => {
        dispatch(logout());
    };

    return (
        <aside className={styles.root}>
            <ul className={styles.tabs}>
                <li>
                    <NavLink
                        to="/profile"
                        end
                        className={({ isActive }) =>
                            cn("text text_type_main-medium pt-4 pb-4", styles.link, { [styles.link_active]: isActive })
                        }>
                        Профиль
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/profile/orders"
                        end
                        className={({ isActive }) =>
                            cn(styles.link, "text text_type_main-medium pt-4 pb-4", { [styles.link_active]: isActive })
                        }>
                        История заказов
                    </NavLink>
                </li>
                <li>
                    <button
                        onClick={handleLogoutClick}
                        className={cn(styles.button, "text text_type_main-medium text_color_inactive pt-4 pb-4")}>
                        Выход
                    </button>
                </li>
            </ul>
            <p className="text text_type_main-default text_color_inactive mt-20">
                В этом разделе вы можете изменить свои персональные данные
            </p>
        </aside>
    );
};

export default ProfileSidebar;
