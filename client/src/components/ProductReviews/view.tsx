import React from 'react';
import { IReview } from '../../model/types/IProducts';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ReviewForm, ShowReviews } from '../';
import { navigationApi } from '../../model/apis';

import style from './style.module.scss';

interface IProps {
  userId: string;
  isAuth: boolean;
  productId: string;
  reviews: IReview[];
}

export const ProductReviews: React.FC<IProps> = React.memo(({
  userId,
  productId,
  isAuth,
  reviews,
}) => {
  const { t } = useTranslation(['products']);

  return (
    <div className={style.reviews}>
      <h3 className={style.reviewsTitle}>
        {t('reviews')} {reviews.length}
      </h3>

      {!isAuth ?
        <div className={style.reviewsNoUser}>
          {t('login')}
          <Link
            to={navigationApi.toAccountLogin()}
            className={style.reviewsNoUserLink}
          >
            {t('loginLink')}
          </Link>
        </div>
        :
        <ReviewForm
          userId={userId}
          productId={productId}
        />
      }

      <ShowReviews reviews={reviews} />
    </div>
  );
});
