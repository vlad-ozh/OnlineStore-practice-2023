import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '..';

import style from './style.module.scss';

interface IProps {
  email: string;
  onBack: () => void;
}

export const ForgotPasswordFormSent: React.FC<IProps> = ({
  email,
  onBack,
}) => {
  React.useEffect(() => {
    return onBack;
  }, [onBack]);

  const { t } = useTranslation(['authorization']);

  return (
    <div className={style.container}>
      <div className={style.form}>
        <h2 className={style.formTitle}>
          {t('resetTitle')}
        </h2>
        <h3 className={style.formEmail}>
          {email}
        </h3>
        <p className={style.formParagraph}>
          {t('resetMsgSent')}
        </p>
        <Button
          skin='text'
          size='medium'
          onClick={onBack}
          className={style.formButton}
        >
          {t('back')}
        </Button>
      </div>
    </div>
  );
};
