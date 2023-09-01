import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '..';
import { useTranslation } from 'react-i18next';
import { IUser } from '../../model/types/IUser';
import classNames from 'classnames';
import {
  ListIcon,
  LogoutIcon,
  PersonIcon,
} from '../../assets/images/svg-images';

import style from './style.module.scss';

interface IProps {
  user: IUser;
  toAccountInfo: string;
  toAccountOrders: string;
  onLogout: () => void;
}

export const AccountContent: React.FC<IProps> = (props) => {
  const { t } = useTranslation(['account']);

  const {
    user,
    toAccountInfo,
    toAccountOrders,
    onLogout,
  } = props;

  return (
    <div className={style.account}>
      <h2 className={style.accountTitle}>
        {t('hello', { name: user.name })}
      </h2>
      <p className={classNames(style.accountActivationMsg, {
        [style.accountNoActivationMsg]: user.isActivated,
      })}>
        {t('needActivateAcc')}
      </p>
      <div className={style.accountBox}>
        <ul className={style.accountList}>
          <li className={style.accountListItem}>
            <Link to={toAccountInfo} className={style.accountListItemLink}>
              <PersonIcon />
              {t('personalInfo')}
            </Link>
          </li>
          <li className={style.accountListItem}>
            <Link to={toAccountOrders} className={style.accountListItemLink}>
              <ListIcon />
              {t('myOrders')}
            </Link>
          </li>
          <li className={style.accountListItem}>
            <Button
              skin='text'
              size='medium'
              onClick={onLogout}
              className={style.accountListItemButton}
            >
              <LogoutIcon />
              {t('logout')}
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};
