import React, { useCallback } from 'react';
import classnames from 'classnames';

import style from './style.module.scss';

interface IInputProps {
  value: string;
  type: 'email' | 'search' | 'text' | 'tel' | 'password' | 'number';
  name: string;
  // eslint-disable-next-line no-unused-vars
  onBlur: (value: string) => void;
  placeholder: string;
  required: boolean;
  className: string;
  id?: string;
}

export const Input: React.FC<IInputProps> = ({
  value,
  type,
  name,
  onBlur,
  placeholder,
  required,
  className,
  id,
}) => {
  const [localValue, setLocalValue] = React.useState(value);

  const onBlurLocal = useCallback(() => {
    onBlur(localValue);
  }, [localValue, onBlur]);

  return (
    <input
      value={localValue}
      type={type}
      name={name}
      id={id}
      onChange={(event) => setLocalValue(event.target.value)}
      onBlur={onBlurLocal}
      placeholder={placeholder}
      required={required}
      className={classnames(style.input, className)}
    />
  );
};
