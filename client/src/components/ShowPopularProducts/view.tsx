import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppDispatch, RootState } from '../../model/store/store';
import { useTranslation } from 'react-i18next';
import { Loader } from '../Loader';
import { controller } from './controller';
import { ProductCard } from '../ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/free-mode';
import style from './style.module.scss';

const PureShowPopularProducts: React.FC<Props> = (props) => {
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
        <h2 className={style.productsTitle}>
          {t('popularProducts')}
        </h2>
        <Swiper
          freeMode={true}
          navigation={false}
          slidesPerView={4}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            970: {
              slidesPerView: 4,
            },
            730: {
              slidesPerView: 3,
            },
            500: {
              slidesPerView: 2,
            },
            100: {
              slidesPerView: 1,
            },
          }}
          spaceBetween={15}
          modules={[FreeMode, Pagination]}
          className={style.swiper}
        >
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
              <SwiperSlide key={product.id} className={style.swiperSlide}>
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
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  };

  const isProducts = Boolean(products.length);

  return (
    <>
      {loading && <Loader />}
      {!loading && isProducts && renderProducts()}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  products: state.productsApi.popularProducts,
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

export const ShowPopularProducts = connector(PureShowPopularProducts);
