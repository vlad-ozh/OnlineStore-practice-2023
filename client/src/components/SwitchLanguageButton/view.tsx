import React from 'react';
import i18n from '../../i18n';
import { Button } from '../Button';

import style from './style.module.scss';

export const SwitchButtonLanguage = () => {
  return (
    <div>
      {
        i18n.language === 'en' ?
          <Button
            skin='icon'
            size='medium'
            onClick={() => i18n.changeLanguage('ua')}
            className={style.button}
          >
            UA
          </Button>
          :
          <Button
            skin="icon"
            size="medium"
            onClick={() => i18n.changeLanguage('en')}
            className={style.button}
          >
            EN
          </Button>
      }
    </div>
  );
};
