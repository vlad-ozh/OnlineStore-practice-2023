import React from 'react';
import { useTranslation } from 'react-i18next';
import { IReview } from '../../model/types/IProducts';

import style from './style.module.scss';

interface IProps {
  reviews: IReview[];
}

export const ShowReviews: React.FC<IProps> = ({ reviews }) => {
  const { t } = useTranslation(['products']);

  return (
    <div className={style.reviewsShow}>
      <ul className={style.reviewsList}>
        {reviews.map(review => {
          return(
            <li key={review.id} className={style.reviewsItem}>
              <div className={style.reviewsItemInfo}>
                <div>
                  <div className={style.reviewsItemInfoName}>
                    {review.userName}
                  </div>
                  <div className={style.reviewsItemInfoRating}>
                    {t('rating')}: {review.rating}
                  </div>
                </div>
                <div className={style.reviewsItemInfoDate}>
                  {review.date}
                </div>
              </div>
              <div className={style.reviewsItemText}>
                {review.text}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
