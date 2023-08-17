import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button, SearchForm } from '..';
import { ISearch } from '../../model/types/IProducts';
import { SwitchButtonLanguage } from '../SwitchLanguageButton';
import { SwitchButtonTheme } from '../SwitchThemeButton';
import { useTranslation } from 'react-i18next';
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

import {
  CartIcon,
  FavoriteIcon,
  PersonIcon,
  DotsIcon,
  HomeIcon,
  MenuIcon,
} from '../../assets/images/svg-images';

import style from './style.module.scss';

interface IProps {
  isAuth: boolean;
  onHome: string;
  onProducts: string;
  onAccount: (isAuth: boolean) => string;
  onSelected: (isAuth: boolean) => string;
  onCart: (isAuth: boolean) => string;
  isSelectedProducts: boolean;
  isCartProducts: boolean;
  totalSelectedProducts: number;
  totalProductsInCart: number;
  register: UseFormRegister<ISearch>;
  handleSubmit: UseFormHandleSubmit<ISearch, undefined>;
  onSubmit: SubmitHandler<ISearch>;
}

export const HeaderContent: React.FC<IProps> = (props) => {
  const [navMobile, setNavMobile] = useState(false);
  const { t } = useTranslation(['header']);

  const {
    isAuth,
    onHome,
    onProducts,
    onAccount,
    onSelected,
    onCart,
    isSelectedProducts,
    isCartProducts,
    totalSelectedProducts,
    totalProductsInCart,
    handleSubmit,
    onSubmit,
    register,
  } = props;

  return (
    <div className={style.header}>
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
              [style.noCount]: !isSelectedProducts,
            })}>
              {totalSelectedProducts}
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

        <SearchForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
        />

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
                [style.noCount]: !isSelectedProducts,
              })}>
                {totalSelectedProducts}
              </span>
              <FavoriteIcon />
            </Link>
          </li>
          <li className={style.navListItem}>
            <Link to={onCart(isAuth)} className={style.navListItemLink}>
              <span className={classNames(style.counter, style.cartCounter, {
                [style.noCount]: !isCartProducts,
              })}>
                {totalProductsInCart}
              </span>
              <CartIcon />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
