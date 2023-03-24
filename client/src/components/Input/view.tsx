import React, { useCallback } from 'react';
import classnames from 'classnames';

import style from './style.module.scss';

interface IInputProps {
  className?: string;
  value: string;
  onBlur?: (value: string) => void;
  placeholder: string;
}

export const Input: React.FC<IInputProps> = ({
  value,
  onBlur,
  className,
  placeholder,
}) => {
  const [localValue, setLocalValue] = React.useState(value || '');

  // const onBlurLocal = useCallback(() => {
  //   onBlur(localValue);
  // }, [localValue, onBlur]);

  return (
    <input
      type="text"
      value={localValue}
      placeholder={placeholder}
      onChange={(event) => setLocalValue(event.target.value)}
      // onBlur={onBlurLocal}
      className={classnames(style.input, className)}
    />
  );
};
