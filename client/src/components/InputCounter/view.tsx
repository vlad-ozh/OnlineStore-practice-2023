import React, { useCallback } from 'react';

import style from './style.module.scss';

interface IInputProps {
  value: number;
  onBlur: (value: number) => void;
  maxValue: number;
}

export const InputCounter: React.FC<IInputProps> = ({
  value,
  onBlur,
  maxValue,
}) => {
  const [localValue, setLocalValue] = React.useState(value);

  const onBlurLocal = useCallback(() => {
    onBlur(localValue);
  }, [localValue, onBlur]);

  return (
    <input
      type='number'
      value={localValue}
      min='1'
      max={maxValue}
      step='1'
      onKeyDown={(event) => event.key === '-' && event.preventDefault()}
      onChange={(event) => setLocalValue(+event.target.value)}
      onBlur={onBlurLocal}
      className={style.input}
    />
  );
};
