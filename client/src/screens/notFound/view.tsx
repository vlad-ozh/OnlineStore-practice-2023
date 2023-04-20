import React from 'react';
import { useTranslation } from 'react-i18next';
import { Footer, Header, Layout } from '../../components';

import style from './style.module.scss';

export const NotFound = () => {
  const { t } = useTranslation(['header']);

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
    >
      <div className={style.screen}>
        {t('pageNotFound')}
      </div>
    </Layout>
  );
};
