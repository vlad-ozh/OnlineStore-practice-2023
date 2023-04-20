import React from 'react';
import { useAppTheme } from '../../hooks';
import { Button } from '../Button';

import { DarkModeIcon, LightModeIcon } from '../../assets/images/svg-images';

import style from './style.module.scss';

export const SwitchButtonTheme = () => {
  const { theme, setTheme } = useAppTheme();

  return (
    <div>
      {
        theme === 'dark' ?
          <Button
            skin='icon'
            size='medium'
            onClick={() => setTheme('light')}
            className={style.button}
          >
            <LightModeIcon />
          </Button>
          :
          <Button
            skin="icon"
            size="medium"
            onClick={() => setTheme('dark')}
            className={style.button}
          >
            <DarkModeIcon />
          </Button>
      }
    </div>
  );
};
