import styles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.first_third_part}>
          <BurgerIcon type={'primary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
            </p>
          <ListIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.profile}>
          <ProfileIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>Личный кабинет</p>
        </div>
      </nav>
    </header>
  );
};