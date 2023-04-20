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
    onSearch,
    onHome,
    onProducts,
    onAccount,
    onSelected,
    onChangeSearch,
    onCart,
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
            to={onAccount}
            className={style.asideHeaderProfile}
          >
            <PersonIcon />
            {t('profile')}
          </Link>
          <Link to={onProducts} className={style.asideHeaderProducts}>
            <DotsIcon />
            {t('products')}
          </Link>
          <Link to={onSelected} className={style.asideHeaderSelected}>
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

  const renderSearchForm = () => {
    return (
      <form className={style.searchForm}>
        <Input
          value={''}
          type='search'
          name='search'
          onBlur={(value) => onChangeSearch(value)}
          placeholder={t('search')}
          required={false}
          className={style.searchFormInput}
        />
        <Link
          to={onSearch('iphone 12 pro')}
          className={style.searchFormLink}
        >
          <SearchIcon />
        </Link>
      </form>
    );
  };

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
        {renderNavMobile()}

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

        {renderSearchForm()}

        <ul className={style.navList}>
          <li className={style.navListItem}>
            <Link to={onAccount} className={style.navListItemLink}>
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
            <Link to={onSelected} className={style.navListItemLink}>
              <FavoriteIcon />
            </Link>
          </li>
          <li className={style.navListItem}>
            <Link to={onCart} className={style.navListItemLink}>
              <CartIcon />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    onHome: ctrl.getHomeLink(),
    onProducts: ctrl.getProductsLink(),
    onAccount: ctrl.getAccountLink(),
    onChangeSearch: ctrl.onChangeSearch,
    onSearch: ctrl.getSearchProductsLink,
    onSelected: ctrl.getSelectedProductsLink(),
    onCart: ctrl.getAccountCartLink(),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const Header = connector(PureHeader);
