import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCardInCart } from '..';
import { IProduct } from '../../model/types/IProducts';
import { useTranslation } from 'react-i18next';
import { IUser, IUserCart } from '../../model/types/IUser';

import style from './style.module.scss';

interface IProps {
  user: IUser;
  products: IProduct[];
  removeProduct: (userId: string, productId: string) => void;
  toCheckout: string;
  toProduct: (category: string, brand: string, productId: string) => string;
  amountProductInCart: (cart: IUserCart[], productId: string) => number
  changeAmount:
    (userId: string, productId: string, amount: number, value: number) => void;
  productPrice:
    (cart: IUserCart[], productId: string, productPrice: number) => string;
  totalPrice: (cart: IUserCart[], products: IProduct[]) => string;
}

export const CartContent: React.FC<IProps> = (props) => {
  const { t } = useTranslation(['products']);

  const {
    user,
    products,
    removeProduct,
    toCheckout,
    toProduct,
    amountProductInCart,
    changeAmount,
    productPrice,
    totalPrice,
  } = props;

  return (
    <div className={style.cart}>
      <ul className={style.cartList}>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <ProductCardInCart
                product={product}
                userId={user.id}
                cart={user.cart}
                toProduct={
                  toProduct(product.category, product.brand, product.id)
                }
                changeAmount={changeAmount}
                amountProductInCart={amountProductInCart}
                productPrice={
                  productPrice(user.cart, product.id, product.price)
                }
                removeProduct={removeProduct}
              />
            </li>
          );
        })}
      </ul>

      <div className={style.cartOrder}>
        <div className={style.cartTotalPrice}>
          <h3 className={style.cartText}>
            {t('totalPrice')}
          </h3>
          <h3 className={style.cartPrice}>
            {totalPrice(user.cart, products)} ₴
          </h3>
        </div>
        <Link
          to={toCheckout}
          className={style.cartOrderLink}
        >
          {t('order')}
        </Link>
      </div>
    </div>
  );
};
