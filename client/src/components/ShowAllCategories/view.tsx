import React from 'react';
import { IProductsCategory } from '../../model/types/IProducts';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import style from './style.module.scss';

interface IProps {
  categories: IProductsCategory[];
  toProducts: (category: string, brand: string) => string;
}

export const ShowAllCategories: React.FC<IProps> = (props) => {
  const { categories, toProducts } = props;

  const { t } = useTranslation(['products']);

  return (
    <ul className={style.categories}>
      {categories.map(category => {
        return (
          <li key={category.name} className={style.category}>
            <h2 className={style.categoryTitle}>
              {t(category.name)}
            </h2>
            <h3 className={style.categoryTitleBrands}>
              {t('brands')}
            </h3>
            <ul className={style.categoryBrands}>
              {category.brands.map((brand, index) => {
                return (
                  <li key={index} className={style.categoryBrandsItem}>
                    <Link
                      to={toProducts(category.name, brand)}
                      className={style.categoryBrandsItemLink}
                    >
                      {brand}
                    </Link>
                  </li>
                );
              })}
              <li className={style.categoryBrandsItem}>
                <Link
                  to={toProducts(category.name, 'all')}
                  className={style.categoryBrandsItemLink}
                >
                  {t('all')}
                </Link>
              </li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
};
