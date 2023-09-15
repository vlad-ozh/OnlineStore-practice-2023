import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormError } from '../FormError';
import Select from 'react-select';

import style from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { IReviewForm } from '../../model/types/IProducts';

interface IProps {
  control: Control<IReviewForm, any>;
}
interface ISelectOption {
  value: number;
  label: string;
};

export const SelectRatingWithLabel: React.FC<IProps> = React.memo(({
  control,
}) => {
  const { t } = useTranslation(['products']);

  const selectOptions: ISelectOption[] = [
    { value: 1, label: '1'},
    { value: 2, label: '2'},
    { value: 3, label: '3'},
    { value: 4, label: '4'},
    { value: 5, label: '5'},
  ];

  const getSelectValue = (value: number) =>
    value ? selectOptions.find(option => option.value === value) : '';

  return (
    <fieldset className={style.fieldset}>
      <div className={style.fieldsetLabel}>
        {t('rating')}:
      </div>

      <Controller
        control={control}
        name='rating'
        rules={{ required: 'requiredError' }}
        render={({ field: { value, onChange }, fieldState: {error}}) => (
          <div>
            <Select
              options={selectOptions}
              isSearchable={false}
              placeholder={t('chooseRating')}
              value={getSelectValue(value)}
              onChange={
                (newValue) => onChange((newValue as ISelectOption).value)
              }
              theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                  ...theme.colors,
                  primary: '#e00027',
                  primary25: 'var(--select-bg-color-choice)',
                  neutral0: 'var(--input-background-color)',
                  neutral50: 'var(--input-text-color)',
                  neutral80: 'var(--input-text-color)',
                },
              })}
              className={style.fieldsetSelect}
            />
            {error?.message &&
              <FormError error={error.message} className={style.fieldsetError}/>
            }
          </div>
        )}
      />
    </fieldset>
  );
});
