import React from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper';
import { IUser } from '../../model/types/IUser';
import {
  ICommonProductsLogic,
  IProduct,
} from '../../model/types/IProducts';
import { CommonProducts, ProductCard } from '..';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/free-mode';
import style from './style.module.scss';

interface IProps {
  popularProducts: IProduct[];
  user: IUser;
}

export const ShowPopularProducts: React.FC<IProps> = React.memo((props) => {
  const { popularProducts, user } = props;

  const { t } = useTranslation(['products']);

  return (
    <CommonProducts>
      {(commonLogic: ICommonProductsLogic) => (

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
            {popularProducts.map((product) => {
              const {
                id: productId,
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
                    toProduct={
                      commonLogic.toProduct(category, brand, productId)
                    }
                    onSelect={() => commonLogic.onSelect(user.id, productId)}
                    onRemoveSelected={
                      () => commonLogic.onRemoveSelected(user.id, productId)
                    }
                    isSelect={
                      commonLogic.isSelect(productId, user.selectedProducts)
                    }
                    onCart={() => commonLogic.onCart(user.id, productId)}
                    toCart={commonLogic.toCart()}
                    isCart={commonLogic.isCart(productId, user.cart)}
                    toLogin={commonLogic.toLogin()}
                    isUser={user.isAuth}
                    amount={commonLogic.amountOfProduct(amount)}
                    rating={commonLogic.totalRating(reviews)}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </CommonProducts>
  );
});
