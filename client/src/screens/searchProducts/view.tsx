import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Header,
  Layout,
  Footer,
  Breadcrumbs,
  ProductCard,
  Loader,
} from '../../components';
import { AppDispatch, RootState } from '../../model/store/store';
import { controller } from './controller';

import style from './style.module.scss';
import { useParams } from 'react-router-dom';

const PureSearchProducts: React.FC<Props> = (props) => {
  const { t } = useTranslation(['home']);
  const { data } = useParams();
  const {
    loading,
    products,
    getProducts,
    getBreadcrumbsPaths,
    productLink,
  } = props;

  React.useEffect(() => {
    getProducts();
  }, [data, getProducts]);

  const renderProducts = () => {
    return (
      <div className={style.products}>
        <ul className={style.productsList}>
          {products.map((product) => {
            return (
              <li key={product.id}>
                <ProductCard
                  name={product.name}
                  image={product.image[0]}
                  price={product.price}
                  productLink={
                    productLink(product.category, product.brand, product.id)
                  }
                  addToSelected={() => console.log('first')}
                  addToCart={() => console.log('second')}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  const renderNoData = () => {
    return (
      <h3 className={style.noProducts}>
        {t('noProducts')}
      </h3>
    );
  };

  const isProducts = Boolean(products.length);

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={getBreadcrumbsPaths()}/>}
    >
      <div className={style.screen}>
        {loading && <Loader />}
        {!loading && isProducts && renderProducts()}
        {!loading && !isProducts && renderNoData()}
      </div>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
  products: state.productsApi.products,
  loading: state.productsApi.loading,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    getBreadcrumbsPaths: ctrl.getBreadcrumbsPaths,
    getProducts: ctrl.getProducts,
    productLink: ctrl.getProductLink,
  };
};

const connector = connect(mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const SearchProducts = connector(PureSearchProducts);
