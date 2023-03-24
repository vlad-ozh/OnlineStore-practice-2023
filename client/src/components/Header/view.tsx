import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppDispatch, RootState } from '../../model/store/store';
import { Button } from '../Button';
import { Input } from '../Input';
import { controller } from './controller';
import { useAppTheme } from '../../hooks';
import classNames from 'classnames';

import {
  CartIcon,
  FavoriteIcon,
  PersonIcon,
  SearchIcon,
  DarkModeIcon,
  LightModeIcon,
  DotsIcon,
  HomeIcon,
  MenuIcon,
} from '../../assets/images/header-images';

import style from './style.module.scss';

const PureHeader: React.FC<Props> = (props) => {
  const [navMobile, setNavMobile] = useState(false);
  const { theme, setTheme } = useAppTheme();

  const { onSearch, onHome, onProducts } = props;

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
        <div className={classNames(
          style.navigationMobileDisabled, {
            [style.navigationMobileAbled]: navMobile,
          })}
        >
          sdadsadsadsd
        </div>
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
            // onBlur={() => }
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
            {
              theme === 'light' ?
                <Button
                  skin='icon'
                  size='medium'
                  onClick={() => setTheme('dark')}
                  className={style.navListItemButton}
                >
                  <LightModeIcon />
                </Button>
                :
                <Button
                  skin="icon"
                  size="medium"
                  onClick={() => setTheme('light')}
                  className={style.navListItemButton}
                >
                  <DarkModeIcon />
                </Button>
            }
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
    onSearch: ctrl.onSearch,
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const Header = connector(PureHeader);
