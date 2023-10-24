import React from 'react';
import { Button } from '../Button';
import { FavoriteIcon } from '../../assets/images/svg-images';
import { Link } from 'react-router-dom';
import { navigationApi } from '../../model/apis';
import classNames from 'classnames';

import style from './style.module.scss';

interface IProps {
  onSelect: () => void;
  onRemoveSelected: () => void;
  isSelect: boolean;
  isUser: boolean;
}

export const SelectButton: React.FC<IProps> = ({
  onSelect,
  onRemoveSelected,
  isSelect,
  isUser,
}) => {
  return (
    <>
      {isUser ?
        (
          <Button
            size='medium'
            skin='icon'
            onClick={isSelect ? onRemoveSelected : onSelect}
            className={classNames(style.select, {
              [style.onSelect]: isSelect,
            })}
          >
            <FavoriteIcon />
          </Button>
        )
        :
        (
          <Link
            to={navigationApi.toAccountLogin()}
            className={style.selectLink}
          >
            <FavoriteIcon />
          </Link>
        )
      }
    </>
  );
};
