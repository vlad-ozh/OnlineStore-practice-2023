import React from 'react';
import { Button, ChangeNameForm } from '..';
import { useTranslation } from 'react-i18next';

import style from './style.module.scss';
import { useAppDispatch } from '../../hooks';
import { userApi } from '../../model/apis';

interface IProps {
  userId: string;
  userName: string;
}

export const AccountInfoContent: React.FC<IProps> = ({ userId, userName }) => {
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
      <ChangeNameForm userId={userId} userName={userName} />
      <hr />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <hr />
      <Button
        size='medium'
        skin='text'
        onClick={() => deleteAcc(userId)}
        className={style.containerDelete}
      >
        {t('deleteAcc')}
      </Button>
    </div>
  );
};
