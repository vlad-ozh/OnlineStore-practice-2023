import React from 'react';

import style from './style.module.scss';
import { Button } from '../Button';
import { FavoriteIcon } from '../../assets/images/svg-images';
import { CartIcon } from '../../assets/images/svg-images';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

interface IProps {
  name: string;
  image: string;
  price: number;
  productLink: string;
  onSelect: () => void;
  onCart: () => void;
  isSelect?: boolean;
};

export const ProductCard: React.FC<IProps> = (props) => {
  const {
    name,
    image,
    price,
    productLink,
    onSelect,
    onCart,
    isSelect,
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
              [style.cardOnSelect]: isSelect,
            })}
          >
            <FavoriteIcon />
          </Button>
        </div>
        <div className={style.cardBuy}>
          <h4>{price} ₴</h4>
          <Button
            size='medium'
            skin='icon'
            onClick={onCart}
            className={style.cardCart}
          >
            <CartIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
