import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
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
};

export const ProductCard: React.FC<IProps> = (props) => {
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
          <Button
            size='medium'
            skin='icon'
            onClick={onSelect}
            className={classNames(style.cardSelect, {
              [style.cardNoSelect]: isSelect || !isUser,
            })}
          >
            <FavoriteIcon />
          </Button>
          <Button
            size='medium'
            skin='icon'
            onClick={onRemoveSelected}
            className={classNames(style.cardSelect, {
              [style.cardNoSelect]: !isSelect,
              [style.cardOnSelect]: isSelect,
            })}
          >
            <FavoriteIcon />
          </Button>
          <Link
            to={loginLink}
            className={classNames(style.cardSelectLink, {
              [style.cardNoSelect]: isUser,
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
            className={classNames(style.cardCart, {
              [style.cardNoCart]: isCart || !isUser,
            })}
          >
            <CartIcon />
          </Button>
          <Link
            to={linkToCart}
            className={classNames(style.cardCartLink, {
              [style.cardNoCart]: !isCart,
            })}
          >
            <DoneIcon />
          </Link>
          <Link
            to={loginLink}
            className={classNames(style.cardCartLink, {
              [style.cardNoCart]: isUser,
            })}
          >
            <CartIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};
