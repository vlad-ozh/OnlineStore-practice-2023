import React from 'react';
import classnames from 'classnames';

import style from './style.module.scss';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string,
  skin?: 'zero-style' | 'primary' | 'secondary' | 'icon' | 'text';
  font?: 'nunito' | 'noto';
  size?:'small' | 'medium' | 'large' | 'xLarge';
}

export const Button: React.FC<IButtonProps> = ({
  skin,
  font,
  size,
  className,
  children,
  onClick,
  ...props
}) => {
  const skinClassName = {
    [style.zeroStyle]: skin === 'zero-style',
    [style.primary]: skin === 'primary',
    [style.icon]: skin === 'icon',
    [style.text]: skin === 'text',
  };
  const fontClassName = {
    [style.noto]: font === 'noto',
    [style.nunito]: font === 'nunito',
  };
  const sizeClassName = {
    [style.small]: size === 'small',
    [style.medium]: size === 'medium',
    [style.large]: size === 'large',
    [style.xLarge]: size === 'xLarge',
  };

  return (
    <button
      onClick={onClick}
      className={classnames(
        className,
        style.button,
        skinClassName,
        fontClassName,
        sizeClassName,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
