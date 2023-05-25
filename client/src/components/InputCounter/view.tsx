import React, { useCallback } from 'react';

import style from './style.module.scss';

interface IInputProps {
  value: number;
  onBlur: (value: number) => void;
}

export const InputCounter: React.FC<IInputProps> = ({
  value,
  onBlur,
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
      max='200'
      step='1'
      onKeyDown={(event) => event.key === '-' && event.preventDefault()}
      onChange={(event) => setLocalValue(+event.target.value)}
      onBlur={onBlurLocal}
      className={style.input}
    />
  );
};
