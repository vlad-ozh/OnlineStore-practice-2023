import React from 'react';
import { Breadcrumb } from '../Breadcrumb';

import style from './style.module.scss';

interface IBreadcrumb {
  path: string;
  name: {
    title: string;
    settings?: object;
  };
};
interface IBreadcrumbs {
  paths: IBreadcrumb[];
};

export const Breadcrumbs: React.FC<IBreadcrumbs> = ({ paths }) => {
  return (
    <div>
      <ul className={style.breadcrumbs}>
        {paths.map((path, index) => (
          <li key={index} className={style.breadcrumb}>
            <Breadcrumb
              path={path.path}
              name={path.name}
              isLast={index === paths.length - 1}
            />

            {index < paths.length - 1 && <span className={style.slash}>/</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};
