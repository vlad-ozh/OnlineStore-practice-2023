import React from 'react';
import { HeaderContent } from '..';
import { useAppSelector } from '../../hooks';
import { navigationApi } from '../../model/apis';

export const Header: React.FC = () => {
  const {
    cart,
    isAuth,
    selectedProducts,
  } = useAppSelector((state) => state.userApi.user);

  const onAccount = (isAuth: boolean) => {
    return isAuth ? navigationApi.toAccount()
      : navigationApi.toAccountLogin();
  };

  const onSelected = (isAuth: boolean) => {
    return isAuth ? navigationApi.toSelectedProducts()
      : navigationApi.toAccountLogin();
  };

  const onCart = (isAuth: boolean) => {
    return isAuth ? navigationApi.toAccountCart()
      : navigationApi.toAccountLogin();
  };

  const isSelectedProducts: boolean = Boolean(selectedProducts?.length);
  const isCartProducts: boolean = Boolean(cart?.length);

  const totalSelectedProducts: number = selectedProducts?.length;
  const totalProductsInCart: number = cart?.length;

  return (
    <>
      <HeaderContent
        onHome={navigationApi.toHome()}
        onProducts={navigationApi.toProductsCategories()}
        onAccount={onAccount}
        onCart={onCart}
        isAuth={isAuth}
        onSelected={onSelected}
        isSelectedProducts={isSelectedProducts}
        isCartProducts={isCartProducts}
        totalSelectedProducts={totalSelectedProducts}
        totalProductsInCart={totalProductsInCart}
      />
    </>
  );
};
