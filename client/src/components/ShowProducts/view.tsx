import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppDispatch, RootState } from '../../model/store/store';
import { useTranslation } from 'react-i18next';
import { Loader } from '../Loader';
import { controller } from './controller';

import style from './style.module.scss';
import { ProductCard } from '../ProductCard';

const PureShowProducts: React.FC<Props> = (props) => {
  const { t } = useTranslation(['products']);

  const {
    products,
    loading,
    productLink,
    onSelect,
    user,
    isSelect,
  } = props;

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
                  onSelect={() => onSelect(user.id, product.id)}
                  onCart={() => console.log('second')}
                  isSelect={isSelect(product.id, user.selectedProducts)}
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
    <>
      {loading && <Loader />}
      {!loading && isProducts && renderProducts()}
      {!loading && !isProducts && renderNoData()}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  products: state.productsApi.products,
  user: state.userApi.user,
  loading: state.productsApi.loading,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    onSelect: ctrl.onSelect,
    productLink: ctrl.getProductLink,
    isSelect: ctrl.isSelect,
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const ShowProducts = connector(PureShowProducts);
