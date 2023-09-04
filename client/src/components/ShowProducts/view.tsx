import React from 'react';
import { CommonProducts, ProductCard } from '..';
import { IUser } from '../../model/types/IUser';
import { ICommonProductsLogic, IProduct } from '../../model/types/IProducts';

import style from './style.module.scss';

interface IProps {
  products: IProduct[];
  user: IUser;
}

export const ShowProducts: React.FC<IProps> = React.memo((props) => {
  const { products, user } = props;

  return (
    <CommonProducts>
      {(commonLogic: ICommonProductsLogic) => (
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
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </CommonProducts>
  );
});
