import React from 'react';
import { useAppTheme } from '../../hooks';
import { Button } from '../Button';

import { DarkModeIcon, LightModeIcon } from '../../assets/images/header-images';

import style from './style.module.scss';

export const SwitchButtonTheme = () => {
  const { theme, setTheme } = useAppTheme();

  return (
    <div>
      {
        theme === 'light' ?
          <Button
            skin='icon'
            size='medium'
            onClick={() => setTheme('dark')}
            className={style.button}
          >
            <LightModeIcon />
          </Button>
          :
          <Button
            skin="icon"
            size="medium"
            onClick={() => setTheme('light')}
            className={style.button}
          >
            <DarkModeIcon />
          </Button>
      }
    </div>
  );
};
