import React from 'react';
import { Button, ChangeNameForm, ChangePasswordForm } from '..';
import { useTranslation } from 'react-i18next';

import style from './style.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { userApi } from '../../model/apis';

export const AccountInfoContent: React.FC = () => {
  const { user } = useAppSelector((state) => state.userApi);
  const dispatch = useAppDispatch();

  const { t } = useTranslation(['account']);

  const deleteAcc = (userId: string) => {
    const result = window.confirm(`${t('deleteAccConfirm')}`);

    result && dispatch(userApi.deleteAcc({userId}));
  };

  return (
    <div className={style.container}>
      <h2 className={style.containerTitle}>
        {t('personalInfo')}
      </h2>
      <ChangeNameForm />
      <hr />
      <ChangePasswordForm />
      <hr />

      <Button
        size='medium'
        skin='text'
        onClick={() => deleteAcc(user.id)}
        className={style.containerDelete}
      >
        {t('deleteAcc')}
      </Button>
    </div>
  );
};
