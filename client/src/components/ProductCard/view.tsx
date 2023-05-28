import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { useTranslation } from 'react-i18next';
import {
  FavoriteIcon,
  CartIcon,
  DoneIcon,
} from '../../assets/images/svg-images';
import classNames from 'classnames';

import style from './style.module.scss';

interface IProps {
  name: string;
  image: string;
  price: string;
  productLink: string;
  onSelect: () => void;
  onRemoveSelected: () => void;
  isSelect: boolean;
  onCart: () => void;
  linkToCart: string;
  isCart: boolean;
  loginLink: string;
  isUser: boolean;
  amount: boolean;
  rating: number;
};

export const ProductCard: React.FC<IProps> = (props) => {
  const { t } = useTranslation(['products']);
  const {
    name,
    image,
    price,
    productLink,
    onSelect,
    onRemoveSelected,
    isSelect,
    onCart,
    linkToCart,
    isCart,
    loginLink,
    isUser,
    amount,
    rating,
  } = props;

  return (
    <div className={style.card}>
      <Link to={productLink} className={style.cardLink}>
        <div className={style.cardImageContainer}>
          <img className={style.cardImage} src={image} alt={name}/>
        </div>
      </Link>
      <div className={style.cardInfo}>
        <h4 className={style.cardTitle}>
          <Link to={productLink} className={style.cardLink}>
            {name}
          </Link>
        </h4>
        <div className={style.cardMain}>
          {t('rating')}: {rating}
          <Button
            size='medium'
            skin='icon'
            onClick={onSelect}
            className={classNames(style.cardSelect, {
              [style.cardNoShow]: isSelect || !isUser,
            })}
          >
            <FavoriteIcon />
          </Button>
          <Button
            size='medium'
            skin='icon'
            onClick={onRemoveSelected}
            className={classNames(style.cardSelect, {
              [style.cardNoShow]: !isSelect,
              [style.cardOnSelect]: isSelect,
            })}
          >
            <FavoriteIcon />
          </Button>
          <Link
            to={loginLink}
            className={classNames(style.cardSelectLink, {
              [style.cardNoShow]: isUser,
            })}
          >
            <FavoriteIcon />
          </Link>
        </div>
        <div className={style.cardBuy}>
          <h4>{price} ₴</h4>
          <Button
            size='medium'
            skin='icon'
            onClick={onCart}
            disabled={!amount}
            className={classNames(style.cardCart, {
              [style.cardNoShow]: isCart || !isUser,
              [style.cardCartNoActive]: !amount,
            })}
          >
            <CartIcon />
          </Button>
          <Link
            to={linkToCart}
            className={classNames(style.cardCartLink, {
              [style.cardNoShow]: !isCart,
            })}
          >
            <DoneIcon />
          </Link>
          <Link
            to={loginLink}
            className={classNames(style.cardCartLink, {
              [style.cardNoShow]: isUser,
            })}
          >
            <CartIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};
