import React from 'react';
import { Button } from '..';
import { CartIcon, DoneIcon } from '../../assets/images/svg-images';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { navigationApi } from '../../model/apis';
import classNames from 'classnames';

import style from './style.module.scss';

interface IProps {
  onCart: () => void;
  isCart: boolean;
  isUser: boolean;
  amount: boolean;
  withText: boolean;
}

export const BuyButton: React.FC<IProps> = ({
  onCart,
  isCart,
  isUser,
  amount,
  withText,
}) => {
  const { t } = useTranslation(['products']);

  return (
    <>
      {!isCart && isUser && (<Button
        size='medium'
        skin='text'
        onClick={onCart}
        disabled={!amount}
        className={classNames(style.cart, {
          [style.cartNoActive]: !amount,
        })}
      >
        <CartIcon /> {withText && t('buy')}
      </Button>)}

      {isCart && (<Link
        to={navigationApi.toAccountCart()}
        className={style.cartLink}
      >
        <DoneIcon /> {withText && t('inCart')}
      </Link>)}

      {!isUser && (<Link
        to={navigationApi.toAccountLogin()}
        className={classNames(style.cartLink, {
          [style.cartNoActive]: !amount,
        })}
      >
        <CartIcon /> {withText && t('buy')}
      </Link>)}
    </>
  );
};
