import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { navigationApi } from '../../model/apis';
import { Input, SubmitIcon } from '..';
import { ISearch } from '../../model/types/IProducts';
import { SearchIcon } from '../../assets/images/svg-images';

import style from './style.module.scss';

export const SearchForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm<ISearch>();

  const onSubmit: SubmitHandler<ISearch> = data => {
    const searchData: string = data.search.trim();

    navigate(navigationApi.toSearchProducts(searchData));
  };

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
