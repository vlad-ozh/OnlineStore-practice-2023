import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { userApi } from '../../model/apis';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IUserName } from '../../model/types/IUser';
import {
  Button,
  InputWithLabel,
  Submit,
} from '..';

import style from './style.module.scss';

export const ChangeNameForm: React.FC = () => {
  const {
    user: { id: userId, name: userName },
  } = useAppSelector((state) => state.userApi);
  const dispatch = useAppDispatch();

  const { t } = useTranslation(['account']);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm<IUserName>({ mode: 'onChange' });

  const newName = watch('name', userName);

  const onCancel = () => {
    setValue('name', userName);
    clearErrors();
  };

  const onSubmit: SubmitHandler<IUserName> = (data) => {
    dispatch(userApi.changeUserName({userId, userName: data.name}));
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.formNameField}>
        <InputWithLabel
          label='nameLabel'
          name='name'
          placeholder='namePlaceholder'
          type='text'
          autoComplete='on'
          register={register('name', {
            required: 'requiredError',
            value: newName,
          })}
          error={errors.name?.message}
        />
      </div>

      {userName !== newName && <div className={style.formActions}>
        <Button
          skin='text'
          size='medium'
          onClick={onCancel}
          className={style.formButton}
        >
          {t('cancelSubmit')}
        </Button>

        <Submit
          text={t('saveSubmit')}
          className={style.formSubmit}
        />
      </div>}

    </form>
  );
};
