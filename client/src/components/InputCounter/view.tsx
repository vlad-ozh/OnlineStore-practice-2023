import React, { useCallback } from 'react';
import classNames from 'classnames';

import style from './style.module.scss';

interface IProps {
  value: number;
  onBlur: (value: number) => void;
  max: number;
  className?: string;
}

export const QuantityInput: React.FC<IProps> = ({
  value,
  onBlur,
  max,
  className,
}) => {
  const [localValue, setLocalValue] = React.useState(value);

  const onBlurLocal = useCallback(() => {
    onBlur(localValue);
  }, [localValue, onBlur]);

  const signs: string[] = [',', '.', '+', '-', 'e'];

  return (
    <input
      type='number'
      value={localValue}
      step={1}
      min={1}
      max={max}
      onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
        signs.includes(event.key) && event.preventDefault()
      }
      onChange={(event) => setLocalValue(+event.target.value)}
      onBlur={onBlurLocal}
      className={classNames(style.input, className)}
    />
  );
};
