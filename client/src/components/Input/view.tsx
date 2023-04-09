import React, { useCallback } from 'react';
import classnames from 'classnames';

import style from './style.module.scss';

interface IInputProps {
  type: string;
  name: string;
  // eslint-disable-next-line no-unused-vars
  onBlur: (value: string) => void;
  placeholder: string;
  required: boolean;
  className: string;
}

export const Input: React.FC<IInputProps> = ({
  type,
  name,
  onBlur,
  placeholder,
  required,
  className,
}) => {
  const [localValue, setLocalValue] = React.useState('');

  const onBlurLocal = useCallback(() => {
    onBlur(localValue);
  }, [localValue, onBlur]);

  return (
    <input
      type={type}
      name={name}
      onChange={(event) => setLocalValue(event.target.value)}
      onBlur={onBlurLocal}
      placeholder={placeholder}
      required={required}
      className={classnames(style.input, className)}
    />
  );
};
