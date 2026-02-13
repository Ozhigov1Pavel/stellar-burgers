import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

import styles from '../ui/app-header/app-header.module.css';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.user);

  const isConstructor = pathname === '/' || pathname.startsWith('/ingredients');
  const isFeed = pathname.startsWith('/feed');
  const isProfile = pathname.startsWith('/profile');

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink to='/' className={clsx(styles.link, 'mr-10')}>
            <BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />
            <p
              className={clsx(
                'text text_type_main-default ml-2',
                isConstructor && styles.link_active
              )}
            >
              Конструктор
            </p>
          </NavLink>
          <NavLink to='/feed' className={styles.link}>
            <ListIcon type={isFeed ? 'primary' : 'secondary'} />
            <p
              className={clsx(
                'text text_type_main-default ml-2',
                isFeed && styles.link_active
              )}
            >
              Лента заказов
            </p>
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <NavLink
          to='/profile'
          className={clsx(styles.link, styles.link_position_last)}
        >
          <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
          <p
            className={clsx(
              'text text_type_main-default ml-2',
              isProfile && styles.link_active
            )}
          >
            {user?.name || 'Личный кабинет'}
          </p>
        </NavLink>
      </nav>
    </header>
  );
};
