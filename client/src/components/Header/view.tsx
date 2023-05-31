import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../model/store/store';
import classNames from 'classnames';

import { Button } from '../Button';
import { Input } from '../Input';
import { SwitchButtonLanguage } from '../SwitchLanguageButton';
import { SwitchButtonTheme } from '../SwitchThemeButton';
import { useTranslation } from 'react-i18next';

import { controller } from './controller';

import {
  CartIcon,
  FavoriteIcon,
  PersonIcon,
  SearchIcon,
  DotsIcon,
  HomeIcon,
  MenuIcon,
} from '../../assets/images/svg-images';

import style from './style.module.scss';

const PureHeader: React.FC<Props> = (props) => {
  const [navMobile, setNavMobile] = useState(false);
  const { t } = useTranslation(['header']);

  const {
    isAuth,
    onSearch,
    onHome,
    onProducts,
    onAccount,
    onSelected,
    onChangeSearch,
    onCart,
    searchData,
    cart,
    selectedProducts,
    totalSelectedProducts,
    totalProductsInCart,
  } = props;

  const renderNavMobile = () => {
    return (
      <>
        <aside className={classNames(
          style.navigationMobileDisabled, {
            [style.navigationMobileAbled]: navMobile,
          })}
        >
          <header className={style.asideHeader}>
            <Link
              to={onHome}
              className={classNames(style.link, style.linkAside)}
            >
              <HomeIcon />
              {t('home')}
            </Link>

            <div className={style.asideHeaderOptions}>
              <SwitchButtonLanguage />
              <SwitchButtonTheme />
            </div>
          </header>
          <Link
            to={onAccount(isAuth)}
            className={style.asideHeaderProfile}
          >
            <PersonIcon />
            {t('profile')}
          </Link>
          <Link to={onProducts} className={style.asideHeaderProducts}>
            <DotsIcon />
            {t('products')}
          </Link>
          <Link to={onSelected(isAuth)} className={style.asideHeaderSelected}>
            <span className={classNames(style.counter, {
              [style.noCount]: !totalSelectedProducts(selectedProducts),
            })}>
              {totalSelectedProducts(selectedProducts)}
            </span>
            <FavoriteIcon />
            {t('selected')}
          </Link>
        </aside>

        <button
          onClick={() => setNavMobile(false)}
          className={classNames(
            style.navigationMobileDisabledBlur, {
              [style.navigationMobileAbledBlur]: navMobile,
            }
          )}
        />
      </>
    );
  };

  return (
    <div className={style.header}>
      {renderNavMobile()}
      <nav className={style.navigation}>
        <Button
          skin='icon'
          size='medium'
          onClick={() => setNavMobile(!navMobile)}
          className={style.navBurgerButton}
        >
          <MenuIcon />
        </Button>

        <Link
          to={onHome}
          className={style.link}
        >
          <HomeIcon />
          {t('home')}
        </Link>
        <Link
          to={onProducts}
          className={style.link}
        >
          <DotsIcon />
          {t('products')}
        </Link>

        <div className={style.searchForm}>
          <Input
            value={''}
            type='text'
            name='search'
            onBlur={(value) => onChangeSearch(value)}
            placeholder={t('search')}
            required={false}
            className={style.searchFormInput}
          />
          <Link
            to={onSearch(searchData)}
            className={style.searchFormLink}
          >
            <SearchIcon />
          </Link>
        </div>

        <ul className={style.navList}>
          <li className={style.navListItem}>
            <Link to={onAccount(isAuth)} className={style.navListItemLink}>
              <PersonIcon />
            </Link>
          </li>
          <li className={style.navListItem}>
            <SwitchButtonTheme />
          </li>
          <li className={style.navListItem}>
            <SwitchButtonLanguage />
          </li>
          <li className={style.navListItem}>
            <Link to={onSelected(isAuth)} className={style.navListItemLink}>
              <span className={classNames(style.counter, {
                [style.noCount]: !totalSelectedProducts(selectedProducts),
              })}>
                {totalSelectedProducts(selectedProducts)}
              </span>
              <FavoriteIcon />
            </Link>
          </li>
          <li className={style.navListItem}>
            <Link to={onCart(isAuth)} className={style.navListItemLink}>
              <span className={classNames(style.counter, style.cartCounter, {
                [style.noCount]: !totalProductsInCart(cart),
              })}>
                {totalProductsInCart(cart)}
              </span>
              <CartIcon />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  searchData: state.productsApi.search,
  selectedProducts: state.userApi.user.selectedProducts,
  isAuth: state.userApi.user.isAuth,
  cart: state.userApi.user.cart,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    onHome: ctrl.getHomeLink(),
    onProducts: ctrl.getProductsLink(),
    onAccount: ctrl.getAccountLink,
    onChangeSearch: ctrl.onChangeSearch,
    onSearch: ctrl.getSearchProductsLink,
    onSelected: ctrl.getSelectedProductsLink,
    onCart: ctrl.getAccountCartLink,
    totalSelectedProducts: ctrl.getTotalSelectedProducts,
    totalProductsInCart: ctrl.getTotalProductsInCart,
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const Header = connector(PureHeader);
