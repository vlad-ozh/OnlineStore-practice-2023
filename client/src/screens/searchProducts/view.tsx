import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Header,
  Layout,
  Footer,
  Breadcrumbs,
  ShowProducts,
  Loader,
  NoData,
} from '../../components';
import { AppDispatch, RootState } from '../../model/store/store';
import { controller } from './controller';

import style from './style.module.scss';

const PureSearchProducts: React.FC<Props> = (props) => {
  const { data } = useParams();

  const {
    getProducts,
    getBreadcrumbsPaths,
    loading,
    products,
    user,
    userDataLoaded,
  } = props;

  React.useEffect(() => {
    getProducts();
  }, [data, getProducts]);

  const { t } = useTranslation(['products']);

  const isProducts = Boolean(products.length);

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={getBreadcrumbsPaths()}/>}
    >
      <div className={style.screen}>
        {loading && <Loader />}
        {userDataLoaded && user.isAuth && !loading &&
          (isProducts ?
            <ShowProducts
              products={products}
              user={user}
            />
            :
            <NoData text={t('noProducts')} />
          )
        }
      </div>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
  products: state.productsApi.products,
  loading: state.productsApi.loading,
  user: state.userApi.user,
  userDataLoaded: state.userApi.userDataLoaded,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    getBreadcrumbsPaths: ctrl.getBreadcrumbsPaths,
    getProducts: ctrl.getProducts,
  };
};

const connector = connect(() => mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const SearchProducts = connector(PureSearchProducts);
