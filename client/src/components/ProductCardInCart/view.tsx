import React from 'react';
import { Link } from 'react-router-dom';
import { Button, QuantityInput } from '..';
import { RemoveIcon } from '../../assets/images/svg-images';
import { IUserCart } from '../../model/types/IUser';
import { IProduct } from '../../model/types/IProducts';

import style from './style.module.scss';

interface IProps {
  product: IProduct;
  toProduct: string;
  userId: string;
  cart: IUserCart[];
  productPrice: string;
  removeProduct: (userId: string, productId: string) => void;
  amountProductInCart: (cart: IUserCart[], productId: string) => number
  changeAmount:
    (userId: string, productId: string, amount: number, value: number) => void;
};

export const ProductCardInCart: React.FC<IProps> = (props) => {
  const {
    product,
    toProduct,
    userId,
    cart,
    productPrice,
    removeProduct,
    amountProductInCart,
    changeAmount,
  } = props;

  const currentProductAmount: number = amountProductInCart(cart, product.id);

  return (
    <div className={style.product}>
      <Button
        size='large'
        skin='icon'
        onClick={() => removeProduct(userId, product.id)}
        className={style.productRemoveButton}
      >
        <RemoveIcon />
      </Button>
      <Link
        to={toProduct}
        className={style.productLink}
      >
        <div className={style.productImageContainer}>
          <img
            className={style.productImage}
            src={product.image[0]}
            alt={product.name}
          />
        </div>
      </Link>
      <div className={style.productInfo}>
        <h4 className={style.productTitle}>
          <Link
            to={toProduct}
            className={style.productLink}
          >
            {product.name}
          </Link>
        </h4>
        <div className={style.productPrice}>
          <QuantityInput
            onBlur={(value: number) => {
              if (value !== currentProductAmount) {
                changeAmount(userId, product.id, product.amount, value);
              }
            }}
            value={currentProductAmount}
            max={product.amount}
          />
          <h4>
            {productPrice} ₴
          </h4>
        </div>
      </div>
    </div>
  );
};
