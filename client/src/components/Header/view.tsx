import React from 'react';
import { HeaderContent } from '..';
import { useAppSelector } from '../../hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISearch } from '../../model/types/IProducts';
import { navigationApi } from '../../model/apis';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const {
    cart,
    isAuth,
    selectedProducts,
  } = useAppSelector((state) => state.userApi.user);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm<ISearch>();

  const onSubmit: SubmitHandler<ISearch> = data => {
    const searchData: string = data.search.trim();

    navigate(navigationApi.toSearchProducts(searchData));
  };

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
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
    </>
  );
};
