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
    onRemoveSelected,
    user,
    isSelect,
    onCart,
    linkToCart,
    isCart,
    loginLink,
    totalRating,
  } = props;

  const renderProducts = () => {
    return (
      <div className={style.products}>
        <ul className={style.productsList}>
          {products.map((product) => {
            const {
              id,
              brand,
              category,
              image,
              name,
              price,
              reviews,
              amount,
            } = product;

            return (
              <li key={id}>
                <ProductCard
                  name={name}
                  image={image[0]}
                  price={price.toLocaleString()}
                  productLink={productLink(category, brand, id)}
                  onSelect={() => onSelect(user.id, id)}
                  onRemoveSelected={() => onRemoveSelected(user.id, id)}
                  isSelect={isSelect(id, user.selectedProducts)}
                  onCart={() => onCart(user.id, id)}
                  linkToCart={linkToCart}
                  isCart={isCart(id, user.cart)}
                  loginLink={loginLink}
                  isUser={user.isAuth}
                  amount={Boolean(amount)}
                  rating={totalRating(reviews)}
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
    onRemoveSelected: ctrl.onRemoveSelected,
    isSelect: ctrl.isSelect,
    onCart: ctrl.onCart,
    linkToCart: ctrl.getLinkToCart(),
    isCart: ctrl.isCart,
    productLink: ctrl.getProductLink,
    loginLink: ctrl.getLoginLink(),
    totalRating: ctrl.getRating,
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const ShowProducts = connector(PureShowProducts);
