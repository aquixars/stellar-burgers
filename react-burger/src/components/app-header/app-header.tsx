import { BurgerIcon, ListIcon, Logo, LogoutIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"

export const AppHeader = () => {
    return <div>
        <BurgerIcon type={"primary"}/> Конструктор
        <ListIcon type={"secondary"}/> Лента заказов
        <Logo />
        <ProfileIcon type={"secondary"} />Личный кабинет
    </div>
}