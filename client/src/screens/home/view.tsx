import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Layout, Footer, Breadcrumbs } from '../../components';
import { AppDispatch, RootState } from '../../model/store/store';
import { useTranslation } from 'react-i18next';
import { controller } from './controller';
import {
  SmartphoneIcon,
  TabletIcon,
  LaptopIcon,
  HeadphonesIcon,
  TVIcon,
} from '../../assets/images/svg-images';

import style from './style.module.scss';

const PureHome: React.FC<Props> = (props) => {
  const { t } = useTranslation(['home']);

  const {
    categories,
    getBreadcrumbsPaths,
    onCategoryLink,
  } = props;

  const renderCategories = () => {
    return (
      <div className={style.categories}>
        <ul className={style.categoriesList}>
          <li className={style.categoriesItem}>
            <Link
              to={onCategoryLink(categories.smartphones)}
              className={style.categoriesItemLink}
            >
              <SmartphoneIcon />
              {t('smartphones')}
            </Link>
          </li>
          <li className={style.categoriesItem}>
            <Link
              to={onCategoryLink(categories.tablets)}
              className={style.categoriesItemLink}
            >
              <TabletIcon />
              {t('tablets')}
            </Link>
          </li>
          <li className={style.categoriesItem}>
            <Link
              to={onCategoryLink(categories.laptops)}
              className={style.categoriesItemLink}
            >
              <LaptopIcon />
              {t('laptops')}
            </Link>
          </li>
          <li className={style.categoriesItem}>
            <Link
              to={onCategoryLink(categories.headphones)}
              className={style.categoriesItemLink}
            >
              <HeadphonesIcon />
              {t('headphones')}
            </Link>
          </li>
          <li className={style.categoriesItem}>
            <Link
              to={onCategoryLink(categories.televisions)}
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

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={getBreadcrumbsPaths}/>}
    >
      <div className={style.screen}>
        {renderCategories()}
      </div>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
  categories: state.productsApi.categoriesNames,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    getBreadcrumbsPaths: ctrl.getBreadcrumbsPaths(),
    onCategoryLink: ctrl.getCategoryLink,
  };
};

const connector = connect(mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const Home = connector(PureHome);
