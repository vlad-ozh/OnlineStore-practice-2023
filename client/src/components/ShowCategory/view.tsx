import React from 'react';
import { IProductsCategory } from '../../model/types/IProducts';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import style from './style.module.scss';

interface IProps {
  category: IProductsCategory;
  categoryParam: string | undefined;
  toProducts: (category: string | undefined, brand: string) => string;
}

export const ShowCategory: React.FC<IProps> = (props) => {
  const { category, toProducts, categoryParam } = props;

  const { t } = useTranslation(['products']);

  return (
    <div className={style.category}>
      <div className={style.categoryInfo}>
        <h2 className={style.categoryTitle}>
          {category && t(category.name)}
        </h2>
        <h3 className={style.categoryTitleBrands}>
          {t('brands')}
        </h3>
        <ul className={style.categoryBrands}>
          {category && category.brands.map((brand, index) => {
            return (
              <li key={index} className={style.categoryBrandsItem}>
                <Link
                  to={toProducts(categoryParam, brand)}
                  className={style.categoryBrandsItemLink}
                >
                  {brand}
                </Link>
              </li>
            );
          })}
          <li className={style.categoryBrandsItem}>
            <Link
              to={toProducts(categoryParam, 'all')}
              className={style.categoryBrandsItemLink}
            >
              {t('all')}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
