import React from 'react';
import { IReviewForm } from '../../model/types/IProducts';
import { productsApi } from '../../model/apis';
import { useAppDispatch } from '../../hooks';
import {
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  SelectRatingWithLabel,
  Submit,
  Textarea,
} from '..';

import style from './style.module.scss';

interface IProps {
  userId: string;
  productId: string;
}

export const ReviewForm: React.FC<IProps> = ({
  productId,
  userId,
}) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation(['products']);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IReviewForm>({
    mode: 'onChange',
  });

  const onSubmitWithParams = (
    additionalParams: {userId: string, productId: string}
  ): SubmitHandler<IReviewForm> => {
    return (data) => {
      const { userId, productId } = additionalParams;

      dispatch(productsApi.createReview({
        userId,
        productId,
        text: data.text,
        rating: data.rating,
      }));
    };
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitWithParams({ userId, productId }))}
      className={style.reviewsCreate}
    >
      <Textarea
        placeholder={t('textareaPlaceholder')}
        register={register('text', { required: 'requiredError' })}
        error={errors.text?.message}
      />
      <div className={style.reviewsCreateAndRating}>
        <SelectRatingWithLabel control={control} />

        <Submit
          text={t('create')}
          className={style.reviewsSubmit}
        />
      </div>
    </form>
  );
};
