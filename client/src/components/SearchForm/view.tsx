import React from 'react';
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { Input, SubmitIcon } from '..';
import { ISearch } from '../../model/types/IProducts';
import { SearchIcon } from '../../assets/images/svg-images';

import style from './style.module.scss';

interface IProps {
  register: UseFormRegister<ISearch>;
  handleSubmit: UseFormHandleSubmit<ISearch, undefined>;
  onSubmit: SubmitHandler<ISearch>;
}

export const SearchForm: React.FC<IProps> = ({
  register,
  handleSubmit,
  onSubmit,
}) => {

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='search'
          placeholder='searchPlaceholder'
          type='text'
          autoComplete='on'
          register={register('search', {
            required: true,
          })}
          className={style.formInput}
        />

        <SubmitIcon
          icon={<SearchIcon />}
          className={style.formSubmit}
        />
      </form>
    </div>
  );
};
