import React from 'react';
import { ProductCard } from '..';
import { useAppDispatch } from '../../hooks';
import { navigationApi, userApi } from '../../model/apis';
import { IUser, IUserCart } from '../../model/types/IUser';
import { IProduct, IReview } from '../../model/types/IProducts';

import style from './style.module.scss';

interface IProps {
  products: IProduct[];
  user: IUser;
}

export const ShowProducts: React.FC<IProps> = (props) => {
  const dispatch = useAppDispatch();

  const { products, user } = props;

  const amountOfProduct = (amount: number) => {
    return Boolean(amount);
  };
  const onSelect = (userId: string, productId: string) => {
    if (userId !== undefined)
      dispatch(userApi.addProductToSelected({userId, productId}));
  };
  const onRemoveSelected = (userId: string, productId: string) => {
    if (userId !== undefined)
      dispatch(userApi.removeProductFromSelected({userId, productId}));
  };
  const isSelect = (productId: string, selectedProducts: string[]) => {
    if (selectedProducts !== undefined)
      return selectedProducts.some(product => product === productId);

    return false;
  };
  const onCart = (userId: string, productId: string) => {
    if (userId !== undefined)
      dispatch(userApi.addProductToCart({userId, productId}));
  };
  const isCart = (productId: string, cart: IUserCart[]) => {
    if (cart !== undefined)
      return cart.some(product => product.id === productId);

    return false;
  };
  const totalRating = (reviews: IReview[]) => {
    if (reviews.length > 0) {
      let sum = 0;

      reviews.forEach(review => sum += review.rating);

      const rating = Math.round((sum / reviews.length) * 10) / 10 ;

      return rating;
    }

    return 0;
  };

  return (
    <div className={style.products}>
      <ul className={style.productsList}>
        {products.map((product) => {
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
            <li key={productId}>
              <ProductCard
                name={name}
                image={image[0]}
                price={price.toLocaleString()}
                productLink={
                  navigationApi.toProduct(category, brand, productId)
                }
                onSelect={() => onSelect(user.id, productId)}
                onRemoveSelected={() => onRemoveSelected(user.id, productId)}
                isSelect={isSelect(productId, user.selectedProducts)}
                onCart={() => onCart(user.id, productId)}
                linkToCart={navigationApi.toAccountCart()}
                isCart={isCart(productId, user.cart)}
                loginLink={navigationApi.toAccountLogin()}
                isUser={user.isAuth}
                amount={amountOfProduct(amount)}
                rating={totalRating(reviews)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
