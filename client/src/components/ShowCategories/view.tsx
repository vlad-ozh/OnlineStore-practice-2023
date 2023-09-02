import React from 'react';
import { IProductsCategories } from '../../model/types/IProducts';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  HeadphonesIcon,
  LaptopIcon,
  SmartphoneIcon,
  TVIcon,
  TabletIcon,
} from '../../assets/images/svg-images';

import style from './style.module.scss';

interface IProps {
  toProductsCategory: (category: string) => string;
  categories: IProductsCategories;
}

export const ShowCategories: React.FC<IProps> = (props) => {
  const { toProductsCategory, categories } = props;

  const { t } = useTranslation(['home']);

  return (
    <div className={style.categories}>
      <ul className={style.categoriesList}>
        <li className={style.categoriesItem}>
          <Link
            to={toProductsCategory(categories.smartphones)}
            className={style.categoriesItemLink}
          >
            <SmartphoneIcon />
            {t('smartphones')}
          </Link>
        </li>
        <li className={style.categoriesItem}>
          <Link
            to={toProductsCategory(categories.tablets)}
            className={style.categoriesItemLink}
          >
            <TabletIcon />
            {t('tablets')}
          </Link>
        </li>
        <li className={style.categoriesItem}>
          <Link
            to={toProductsCategory(categories.laptops)}
            className={style.categoriesItemLink}
          >
            <LaptopIcon />
            {t('laptops')}
          </Link>
        </li>
        <li className={style.categoriesItem}>
          <Link
            to={toProductsCategory(categories.headphones)}
            className={style.categoriesItemLink}
          >
            <HeadphonesIcon />
            {t('headphones')}
          </Link>
        </li>
        <li className={style.categoriesItem}>
          <Link
            to={toProductsCategory(categories.televisions)}
            className={style.categoriesItemLink}
          >
            <TVIcon />
            {t('televisions')}
          </Link>
        </li>
      </ul>
    </div>
  );
};
