import React from 'react';
import { Link } from 'react-router-dom';
import { BuyButton, SelectButton } from '..';
import { useTranslation } from 'react-i18next';

import style from './style.module.scss';

interface IProps {
  name: string;
  image: string;
  price: string;
  toProduct: string;
  onSelect: () => void;
  onRemoveSelected: () => void;
  isSelect: boolean;
  onCart: () => void;
  isCart: boolean;
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
    toProduct,
    onSelect,
    onRemoveSelected,
    isSelect,
    onCart,
    isCart,
    isUser,
    amount,
    rating,
  } = props;

  return (
    <div className={style.card}>
      <Link to={toProduct} className={style.cardLink}>
        <div className={style.cardImageContainer}>
          <img className={style.cardImage} src={image} alt={name}/>
        </div>
      </Link>
      <div className={style.cardInfo}>
        <h4 className={style.cardTitle}>
          <Link to={toProduct} className={style.cardLink}>
            {name}
          </Link>
        </h4>
        <div className={style.cardMain}>
          {t('rating')}: {rating}
          <SelectButton
            onSelect={onSelect}
            onRemoveSelected={onRemoveSelected}
            isSelect={isSelect}
            isUser={isUser}
          />
        </div>
        <div className={style.cardBuy}>
          <h4>{price} ₴</h4>
          <BuyButton
            amount={amount}
            isCart={isCart}
            isUser={isUser}
            onCart={onCart}
            withText={false}
          />
        </div>
      </div>
    </div>
  );
};
