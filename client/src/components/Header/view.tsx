import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppDispatch, RootState } from '../../model/store/store';
import classNames from 'classnames';

import { Button } from '../Button';
import { Input } from '../Input';
import { SwitchButtonLanguage } from '../SwitchLanguageButton';
import { SwitchButtonTheme } from '../SwitchThemeButton';

import { controller } from './controller';

import {
  CartIcon,
  FavoriteIcon,
  PersonIcon,
  SearchIcon,
  DotsIcon,
  HomeIcon,
  MenuIcon,
} from '../../assets/images/header-images';

import style from './style.module.scss';
import { useTranslation } from 'react-i18next';

const PureHeader: React.FC<Props> = (props) => {
  const [navMobile, setNavMobile] = useState(false);
  const { t } = useTranslation(['header']);

  const { onSearch, onHome, onProducts, onChangeSearch } = props;

  return (
    <div className={style.header}>
      <nav className={style.navigation}>
        <Button
          skin='icon'
          size='medium'
          onClick={() => setNavMobile(!navMobile)}
          className={style.navBurgerButton}
        >
          <MenuIcon />
        </Button>

        <aside className={classNames(
          style.navigationMobileDisabled, {
            [style.navigationMobileAbled]: navMobile,
          })}
        >
          <header className={style.asideHeader}>
            <NavLink
              to={onHome}
              className={classNames(style.navLink, style.navLinkAside)}
            >
              <HomeIcon />
              {t('home')}
            </NavLink>

            <div className={style.asideHeaderOptions}>
              <SwitchButtonLanguage />
              <SwitchButtonTheme />
            </div>
          </header>
          <NavLink to={onProducts} className={style.asideHeaderProfile}>
            <PersonIcon />
            {t('profile')}
          </NavLink>
          <NavLink to={onProducts} className={style.asideHeaderProducts}>
            <DotsIcon />
            {t('products')}
          </NavLink>
          <NavLink to={onProducts} className={style.asideHeaderSelected}>
            <FavoriteIcon />
            {t('selected')}
          </NavLink>
        </aside>
        <button
          onClick={() => setNavMobile(false)}
          className={classNames(
            style.navigationMobileDisabledBlur, {
              [style.navigationMobileAbledBlur]: navMobile,
            })}
        />

        <NavLink
          to={onHome}
          className={style.navLink}
        >
          <HomeIcon />
          {t('home')}
        </NavLink>
        <NavLink
          to={onProducts}
          className={style.navLink}
        >
          <DotsIcon />
          {t('products')}
        </NavLink>

        <form className={style.searchForm}>
          <Input
            className={style.searchFormInput}
            value={''}
            placeholder={t('search')}
            onBlur={(value) => onChangeSearch(value)}
          />
          <Button
            onClick={onSearch}
            skin='icon'
            size='medium'
            className={style.searchFormButton}
          >
            <SearchIcon />
          </Button>
        </form>

        <ul className={style.navList}>
          <li className={style.navListItem}>
            <NavLink to={onProducts} className={style.navListItemLink}>
              <PersonIcon />
            </NavLink>
          </li>
          <li className={style.navListItem}>
            <SwitchButtonTheme />
          </li>
          <li className={style.navListItem}>
            <SwitchButtonLanguage />
          </li>
          <li className={style.navListItem}>
            <NavLink to={onProducts} className={style.navListItemLink}>
              <FavoriteIcon />
            </NavLink>
          </li>
          <li className={style.navListItem}>
            <NavLink to={onProducts} className={style.navListItemLink}>
              <CartIcon />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  users: state.usersReducer.users,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    onHome: ctrl.onHome(),
    onProducts: ctrl.onProducts(),
    onChangeSearch: ctrl.onChangeSearch,
    onSearch: ctrl.onSearch,
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const Header = connector(PureHeader);
