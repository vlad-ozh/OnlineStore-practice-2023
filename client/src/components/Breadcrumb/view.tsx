import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import style from './style.module.scss';

interface IBreadcrumb {
  path: string;
  name: {
    title: string;
    settings?: object;
  };
  isLast: boolean;
};

export const Breadcrumb: React.FC<IBreadcrumb> = ({ path, name, isLast }) => {
  const { t } = useTranslation(['breadcrumbs']);

  const renderName = () => {
    return (
      <>
        {name.settings ? t(name.title, name.settings) : t(name.title)}
      </>
    );
  };

  return (
    <div className={style.breadcrumb}>
      {isLast ? (
        <span>{renderName()}</span>
      ) : (
        <Link to={path} className={style.link}>{renderName()}</Link>
      )}
    </div>
  );
};
