import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppDispatch, RootState } from '../../model/store/store';
import { Button } from '../Button';
import { Input } from '../Input';
import { SwitchButtonTheme } from '../SwitchButtonTheme';
import { controller } from './controller';
import classNames from 'classnames';

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

const PureHeader: React.FC<Props> = (props) => {
  const [navMobile, setNavMobile] = useState(false);

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
              to={onHome()}
              className={classNames(style.navLink, style.navLinkAside)}
            >
              <HomeIcon />
              Home
            </NavLink>

            <div className={style.asideHeaderOptions}>
              UA
              <SwitchButtonTheme />
            </div>
          </header>
          <NavLink to={onProducts()} className={style.asideHeaderProfile}>
            <PersonIcon />
            Profile
          </NavLink>
          <NavLink to={onProducts()} className={style.asideHeaderProducts}>
            <DotsIcon />
            Products
          </NavLink>
          <NavLink to={onProducts()} className={style.asideHeaderSelected}>
            <FavoriteIcon />
            Selected
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
          to={onHome()}
          className={style.navLink}
        >
          <HomeIcon />
          Home
        </NavLink>
        <NavLink
          to={onProducts()}
          className={style.navLink}
        >
          <DotsIcon />
          Products
        </NavLink>

        <form className={style.searchForm}>
          <Input
            className={style.searchFormInput}
            value={''}
            placeholder={'Search'}
            onBlur={(value) => onChangeSearch(value)}
          />
          <Button
            onClick={() => onSearch}
            skin='icon'
            size='medium'
            className={style.searchFormButton}
          >
            <SearchIcon />
          </Button>
        </form>

        <ul className={style.navList}>
          <li className={style.navListItem}>
            <NavLink to={onProducts()} className={style.navListItemLink}>
              <PersonIcon />
            </NavLink>
          </li>
          <li className={style.navListItem}>
            <SwitchButtonTheme />
          </li>
          <li className={style.navListItem}>
            <Button
              skin='icon'
              size='medium'
              onClick={() => onSearch}
              className={style.navListItemButton}
            >
              UA
            </Button>
          </li>
          <li className={style.navListItem}>
            <NavLink to={onProducts()} className={style.navListItemLink}>
              <FavoriteIcon />
            </NavLink>
          </li>
          <li className={style.navListItem}>
            <NavLink to={onProducts()} className={style.navListItemLink}>
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
    onHome: ctrl.onHome,
    onProducts: ctrl.onProducts,
    onChangeSearch: ctrl.onChangeSearch,
    onSearch: ctrl.onSearch,
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const Header = connector(PureHeader);
