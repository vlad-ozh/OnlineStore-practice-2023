import React from 'react';
import { ICommonProductsLogic, IProduct } from '../../model/types/IProducts';
import { IUser } from '../../model/types/IUser';
import { useTranslation } from 'react-i18next';
import { CommonProducts, SelectButton, BuyButton } from '..';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

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

                    <SelectButton
                      onSelect={() => onSelect(userId, product.id)}
                      onRemoveSelected={
                        () => onRemoveSelected(userId, product.id)
                      }
                      isSelect={isSelect(product.id, selectedProducts)}
                      isUser={isAuth}
                    />
                  </div>
                  <div className={style.productMainInfoBuy}>
                    <h3 className={style.productMainInfoPrice}>
                      {product.price.toLocaleString()} ₴
                    </h3>
                    <BuyButton
                      amount={amountOfProduct(product.amount)}
                      isCart={isCart(product.id, cart)}
                      isUser={isAuth}
                      onCart={() => onCart(userId, product.id)}
                      withText={true}
                    />
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
