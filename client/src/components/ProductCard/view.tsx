import React from 'react';

import style from './style.module.scss';
import { Button } from '../Button';
import { FavoriteIcon } from '../../assets/images/svg-images';
import { CartIcon } from '../../assets/images/svg-images';
import { Link } from 'react-router-dom';

interface IProps {
  name: string;
  image: string;
  price: number;
  productLink: string;
};


export const ProductCard: React.FC<IProps> = (props) => {
  const { name, image, price, productLink } = props;

  return (
    <div className={style.card}>
      <Link to={productLink} className={style.cardLink}>
        <img className={style.cardImage} src={image} alt='ProductImage'/>
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
            onClick={() => console.log('first')}
            className={style.cardSelect}
          >
            <FavoriteIcon />
          </Button>
        </div>
        <div className={style.cardBuy}>
          <h4>{price} ₴</h4>
          <Button
            size='medium'
            skin='icon'
            onClick={() => console.log('first')}
            className={style.cardCart}
          >
            <CartIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
