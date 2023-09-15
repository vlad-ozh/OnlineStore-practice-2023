import React from 'react';
import { ICommonProductsLogic, IProduct } from '../../model/types/IProducts';
import { IUser } from '../../model/types/IUser';
import { useTranslation } from 'react-i18next';
import { CommonProducts, Button } from '..';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import {
  CartIcon,
  DoneIcon,
  FavoriteIcon,
} from '../../assets/images/svg-images';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import style from './style.module.scss';

interface IProps {
  user: IUser;
  product: IProduct;
}

export const ProductMain: React.FC<IProps> = React.memo((props) => {
  const {
    user,
    product,
  } = props;

  const {
    id: userId,
    selectedProducts,
    isAuth,
    cart,
  } = user;

  const { t } = useTranslation(['products']);

  return (
    <>
      <CommonProducts>
        {({
          onSelect,
          isSelect,
          toLogin,
          toCart,
          isCart,
          onCart,
          totalRating,
          onRemoveSelected,
          amountOfProduct,
        }: ICommonProductsLogic) => (
          <>
            <h2 className={style.productTitle}>
              {product.name}
            </h2>
            <div className={style.productMain}>
              <div className={style.productMainImages}>
                <Swiper
                  loop={true}
                  navigation={true}
                  pagination={{
                    clickable: true,
                  }}
                  spaceBetween={10}
                  modules={[Navigation, Pagination]}
                  className={style.swiper}
                >
                  {product.image.map((image, index) => {
                    return (
                      <SwiperSlide key={index} className={style.swiperSlide}>
                        <img
                          src={image}
                          alt={product.name}
                          className={style.swiperImage}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>

              <div className={style.productMainInfo}>
                <div className={style.productMainInfoInner}>
                  <div className={style.productMainInfoRating}>
                    {t('rating')}: {totalRating(product.reviews)}
                  </div>
                  <div className={style.productMainInfoAvailable}>
                    {amountOfProduct(product.amount) ?
                      t('available')
                      :
                      t('notAvailable')
                    }

                    <Button
                      size='medium'
                      skin='icon'
                      onClick={() => onSelect(userId, product.id)}
                      className={classNames(style.select, {
                        [style.noShow]:
                          isSelect(product.id, selectedProducts) || !isAuth,
                      })}
                    >
                      <FavoriteIcon />
                    </Button>
                    <Button
                      size='medium'
                      skin='icon'
                      onClick={() => onRemoveSelected(userId, product.id)}
                      className={classNames(style.select, {
                        [style.noShow]: !isSelect(product.id, selectedProducts),
                        [style.selectOn]:
                          isSelect(product.id, selectedProducts),
                      })}
                    >
                      <FavoriteIcon />
                    </Button>
                    <Link
                      to={toLogin()}
                      className={classNames(style.selectLink, {
                        [style.noShow]: isAuth,
                      })}
                    >
                      <FavoriteIcon />
                    </Link>
                  </div>
                  <div className={style.productMainInfoBuy}>
                    <h3 className={style.productMainInfoPrice}>
                      {product.price.toLocaleString()} ₴
                    </h3>
                    <Button
                      size='medium'
                      skin='text'
                      onClick={() => onCart(userId, product.id)}
                      disabled={!amountOfProduct(product.amount)}
                      className={classNames(style.cart, {
                        [style.noShow]: isCart(product.id, cart) || !isAuth,
                        [style.cartNoActive]: !amountOfProduct(product.amount),
                      })}
                    >
                      <CartIcon /> {t('buy')}
                    </Button>
                    <Link
                      to={toCart()}
                      className={classNames(style.cartLink, {
                        [style.noShow]: !isCart(product.id, cart),
                      })}
                    >
                      <DoneIcon /> {t('inCart')}
                    </Link>
                    <Link
                      to={toLogin()}
                      className={classNames(style.cartLink, {
                        [style.noShow]: isAuth,
                      })}
                    >
                      <CartIcon /> {t('buy')}
                    </Link>
                  </div>
                  <div className={style.productMainInfoDescription}>
                    <h3 className={style.productMainInfoDescTitle}>
                      {t('description')}
                    </h3>
                    <p>{t(product.description)}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </CommonProducts>
    </>
  );
});
