import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {
  Header,
  Layout,
  Footer,
  Breadcrumbs,
  Loader,
  Button,
} from '../../components';
import { AppDispatch, RootState } from '../../model/store/store';
import { useTranslation } from 'react-i18next';
import { controller } from './controller';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Navigation } from 'swiper';
import {
  CartIcon,
  DoneIcon,
  FavoriteIcon,
} from '../../assets/images/svg-images';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/free-mode';

import style from './style.module.scss';

const PureOpenProduct: React.FC<Props> = (props) => {
  const { t } = useTranslation(['products']);
  const [review, setReview] = React.useState<{
    text: string;
    rating: number;
  }>({text: '', rating: 0});

  const {
    product,
    user,
    getProduct,
    loading,
    getBreadcrumbsPaths,
    createReview,
    loginLink,
  } = props;


  React.useEffect(() => {
    getProduct();
  }, [getProduct]);

  const renderSwiper = () => {
    return (
      <>
        <Swiper
          loop={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          spaceBetween={10}
          modules={[FreeMode, Navigation, Pagination]}
          className={style.swiper}
        >
          {product.image.map((image, index) => {
            return (
              <SwiperSlide key={index} className={style.swiperSlide}>
                <img
                  src={image}
                  alt={product.name}
                  className={style.swiperImage}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>);
  };

  const renderProductMain = () => {
    const {
      isSelect,
      onRemoveSelected,
      onSelect,
      isCart,
      onCart,
      linkToCart,
      totalRating,
    } = props;

    const {
      id: userId,
      selectedProducts,
      isAuth,
      cart,
    } = props.user;

    return (
      <>
        <h2 className={style.productTitle}>
          {product.name}
        </h2>
        <div className={style.productMain}>
          <div className={style.productMainImages}>

            {renderSwiper()}

          </div>
          <div className={style.productMainInfo}>
            <div className={style.productMainInfoInner}>
              <div className={style.productMainInfoRating}>
                {t('rating')}: {totalRating(product.reviews)}
              </div>
              <div className={style.productMainInfoAvailable}>
                {product.amount ? t('available') : t('notAvailable')}

                <Button
                  size='medium'
                  skin='icon'
                  onClick={() => onSelect(userId, product.id)}
                  className={classNames(style.select, {
                    [style.noShow]:
                    isSelect(product.id, selectedProducts) || !isAuth,
                  })}
                >
                  <FavoriteIcon />
                </Button>
                <Button
                  size='medium'
                  skin='icon'
                  onClick={() => onRemoveSelected(userId, product.id)}
                  className={classNames(style.select, {
                    [style.noShow]: !isSelect(product.id, selectedProducts),
                    [style.selectOn]: isSelect(product.id, selectedProducts),
                  })}
                >
                  <FavoriteIcon />
                </Button>
                <Link
                  to={loginLink}
                  className={classNames(style.selectLink, {
                    [style.noShow]: isAuth,
                  })}
                >
                  <FavoriteIcon />
                </Link>
              </div>
              <div className={style.productMainInfoBuy}>
                <h3 className={style.productMainInfoPrice}>
                  {product.price.toLocaleString()} ₴
                </h3>
                <Button
                  size='medium'
                  skin='text'
                  onClick={() => onCart(userId, product.id)}
                  disabled={!product.amount}
                  className={classNames(style.cart, {
                    [style.noShow]: isCart(product.id, cart) || !isAuth,
                    [style.cartNoActive]: !product.amount,
                  })}
                >
                  <CartIcon /> {t('buy')}
                </Button>
                <Link
                  to={linkToCart}
                  className={classNames(style.cartLink, {
                    [style.noShow]: !isCart(product.id, cart),
                  })}
                >
                  <DoneIcon /> {t('inCart')}
                </Link>
                <Link
                  to={loginLink}
                  className={classNames(style.cartLink, {
                    [style.noShow]: isAuth,
                  })}
                >
                  <CartIcon /> {t('buy')}
                </Link>
              </div>
              <div className={style.productMainInfoDescription}>
                <h3 className={style.productMainInfoDescTitle}>
                  {t('description')}
                </h3>
                <p>{t(product.description)}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderProductSpecs = () => {
    const {
      connection,
      screen,
      cpu,
      memory,
      camera,
      os,
      dimensions,
      // battery,
      // frame,
      // interfacesAndConnections,
      // wirelessTechnologies,
    } = product.characteristics;

    return (
      <div className={style.productSpecs}>
        <h3 className={style.productSpecsTitle}>
          {t('specs')}
        </h3>
        {connection && <table>
          <thead>
            {connection.numOfSimCards && <tr>
              <td className={style.productSpecsHead}>{t('connection')}</td>
            </tr>}
          </thead>
          <tbody className={style.productSpecsBody}>
            {connection.numOfSimCards && <tr>
              <td className={style.productSpecsCell}>
                {t('numOfSims')}
              </td>
              <td className={style.productSpecsCell}>
                {connection.numOfSimCards}
              </td>
            </tr>}
            {Boolean(connection.simCardsFormat?.length) && <tr>
              <td className={style.productSpecsCell}>
                {t('simFormat')}
              </td>
              <td className={style.productSpecsCell}>
                {connection?.simCardsFormat?.map((el: string) => el + ' ')}
              </td>
            </tr>}
            {Boolean(connection.communicationStandards?.length) && <tr>
              <td className={style.productSpecsCell}>
                {t('standarts')}
              </td>
              <td className={style.productSpecsCell}>
                {connection?.communicationStandards?.map(
                  (el: string) => el + ' '
                )}
              </td>
            </tr>}
          </tbody>
        </table>}

        {screen && <table>
          <thead>
            <tr>
              <td className={style.productSpecsHead}>{t('screen')}</td>
            </tr>
          </thead>
          <tbody className={style.productSpecsBody}>
            {screen.diagonal && <tr>
              <td className={style.productSpecsCell}>
                {t('diagonal')}
              </td>
              <td className={style.productSpecsCell}>
                {screen.diagonal}
              </td>
            </tr>}
            {screen.resolution && <tr>
              <td className={style.productSpecsCell}>
                {t('resolution')}
              </td>
              <td className={style.productSpecsCell}>
                {screen.resolution}
              </td>
            </tr>}
            {screen.refreshRate && <tr>
              <td className={style.productSpecsCell}>
                {t('refreshRate')}
              </td>
              <td className={style.productSpecsCell}>
                {screen.refreshRate}
              </td>
            </tr>}
            {screen.pixelDensity && <tr>
              <td className={style.productSpecsCell}>
                {t('pixelDensity')}
              </td>
              <td className={style.productSpecsCell}>
                {screen.pixelDensity} ppi
              </td>
            </tr>}
            {screen.type && <tr>
              <td className={style.productSpecsCell}>
                {t('screenType')}
              </td>
              <td className={style.productSpecsCell}>
                {screen.type}
              </td>
            </tr>}
          </tbody>
        </table>}

        {cpu && <table>
          <thead>
            <tr>
              <td className={style.productSpecsHead}>{t('processor')}</td>
            </tr>
          </thead>
          <tbody className={style.productSpecsBody}>
            {cpu.name && <tr>
              <td className={style.productSpecsCell}>
                {t('processor')}
              </td>
              <td className={style.productSpecsCell}>
                {cpu.name}
              </td>
            </tr>}
            {cpu.coresNum && <tr>
              <td className={style.productSpecsCell}>
                {t('numOfCores')}
              </td>
              <td className={style.productSpecsCell}>
                {cpu.coresNum}
              </td>
            </tr>}
            {cpu.gpu && <tr>
              <td className={style.productSpecsCell}>
                {t('gpu')}
              </td>
              <td className={style.productSpecsCell}>
                {cpu.gpu}
              </td>
            </tr>}
            {cpu.videoMemory && <tr>
              <td className={style.productSpecsCell}>
                {t('videoMemory')}
              </td>
              <td className={style.productSpecsCell}>
                {cpu.videoMemory}
              </td>
            </tr>}
          </tbody>
        </table>}

        {memory && <table>
          <thead>
            <tr>
              <td className={style.productSpecsHead}>{t('memory')}</td>
            </tr>
          </thead>
          <tbody className={style.productSpecsBody}>
            {memory.internalMemory && <tr>
              <td className={style.productSpecsCell}>
                {t('internalMemory')}
              </td>
              <td className={style.productSpecsCell}>
                {memory.internalMemory}
              </td>
            </tr>}
            {memory.ram && <tr>
              <td className={style.productSpecsCell}>
                {t('ram')}
              </td>
              <td className={style.productSpecsCell}>
                {memory.ram}
              </td>
            </tr>}
            {memory.type && <tr>
              <td className={style.productSpecsCell}>
                {t('typeMemory')}
              </td>
              <td className={style.productSpecsCell}>
                {memory.type}
              </td>
            </tr>}
          </tbody>
        </table>}

        {camera && <table>
          <thead>
            <tr>
              <td className={style.productSpecsHead}>{t('camera')}</td>
            </tr>
          </thead>
          <tbody className={style.productSpecsBody}>
            {camera.camera && <tr>
              <td className={style.productSpecsCell}>
                {t('camera')}
              </td>
              <td className={style.productSpecsCell}>
                {camera.camera}
              </td>
            </tr>}
            {camera.videoRecording && <tr>
              <td className={style.productSpecsCell}>
                {t('video')}
              </td>
              <td className={style.productSpecsCell}>
                {camera.videoRecording}
              </td>
            </tr>}
            {camera.frontCamera && <tr>
              <td className={style.productSpecsCell}>
                {t('frontCamera')}
              </td>
              <td className={style.productSpecsCell}>
                {camera.frontCamera}
              </td>
            </tr>}
            {camera.opticalStabilization && <tr>
              <td className={style.productSpecsCell}>
                {t('opticalStab')}
              </td>
              <td className={style.productSpecsCell}>
                {t(camera.opticalStabilization)}
              </td>
            </tr>}
          </tbody>
        </table>}

        {os && <table>
          <thead>
            <tr>
              <td className={style.productSpecsHead}>{t('os')}</td>
            </tr>
          </thead>
          <tbody className={style.productSpecsBody}>
            <tr>
              <td className={style.productSpecsCell}>
                {t('os')}
              </td>
              <td className={style.productSpecsCell}>
                {os}
              </td>
            </tr>
          </tbody>
        </table>}

        {dimensions && <table>
          <thead>
            <tr>
              <td className={style.productSpecsHead}>{t('dimensions')}</td>
            </tr>
          </thead>
          <tbody className={style.productSpecsBody}>
            {dimensions.dimensions && <tr>
              <td className={style.productSpecsCell}>
                {t('dimensions')}
              </td>
              <td className={style.productSpecsCell}>
                {dimensions.dimensions}
              </td>
            </tr>}
            {dimensions.weight && <tr>
              <td className={style.productSpecsCell}>
                {t('weight')}
              </td>
              <td className={style.productSpecsCell}>
                {dimensions.weight}
              </td>
            </tr>}
          </tbody>
        </table>}
      </div>
    );
  };

  const renderReviews = () => {
    return (
      <div className={style.reviews}>
        <h3 className={style.reviewsTitle}>
          {t('reviews')} {product.reviews.length}
        </h3>

        {!user.isAuth && <div className={style.reviewsNoUser}>
          {t('login')}
          <Link to={loginLink} className={style.reviewsNoUserLink}>
            {t('loginLink')}
          </Link>
        </div>}
        {user.isAuth && <div className={style.reviewsCreate}>
          <textarea
            name="review"
            placeholder={`${t('textareaPlaceholder')}`}
            onChange={(event) => setReview({
              ...review,
              text: event.target.value,
            })}
            className={style.reviewsTextarea}
          />
          <div className={style.reviewsCreateAndRating}>
            <div className={style.reviewsRating}>
              <label htmlFor='rating-select' className={style.reviewsLabel}>
                {t('rating')}:
              </label>

              <select
                id='rating-select'
                onChange={(event) => setReview({
                  ...review,
                  rating: parseInt(event.target.value),
                })}
                className={style.reviewsSelect}
              >
                <option value={0}>{t('chooseRating')}</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>

            <Button
              size='medium'
              skin='text'
              onClick={() => {
                createReview(user.id, product.id, review.text, review.rating);
                setReview({...review, rating: 0});
              }}
              className={style.reviewsCreateButton}
            >
              {t('create')}
            </Button>
          </div>
        </div>}

        <div className={style.reviewsShow}>
          <ul className={style.reviewsList}>
            {product.reviews.map(review => {
              return(
                <li key={review.id} className={style.reviewsItem}>
                  <div className={style.reviewsItemInfo}>
                    <div>
                      <div className={style.reviewsItemInfoName}>
                        {review.userName}
                      </div>
                      <div className={style.reviewsItemInfoRating}>
                        {t('rating')}: {review.rating}
                      </div>
                    </div>
                    <div className={style.reviewsItemInfoDate}>
                      {review.date}
                    </div>
                  </div>
                  <div className={style.reviewsItemText}>
                    {review.text}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  const renderNoData = () => {
    return (
      <h3 className={style.noProduct}>
        {t('noProduct')}
      </h3>
    );
  };

  const isProduct = Boolean(product.id);

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={getBreadcrumbsPaths(product.name)} />}
    >
      <div className={style.screen}>
        {loading && <Loader />}
        {!loading && isProduct && renderProductMain()}
        {!loading && isProduct && renderProductSpecs()}
        {!loading && isProduct && renderReviews()}
        {!loading && !isProduct && renderNoData()}
      </div>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
  product: state.productsApi.product,
  user: state.userApi.user,
  loading: state.productsApi.loading,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    getProduct: ctrl.getProduct,
    getBreadcrumbsPaths: ctrl.getBreadcrumbsPaths,
    onSelect: ctrl.onSelect,
    onRemoveSelected: ctrl.onRemoveSelected,
    isSelect: ctrl.isSelect,
    onCart: ctrl.onCart,
    isCart: ctrl.isCart,
    linkToCart: ctrl.getLinkToCart(),
    loginLink: ctrl.getLoginLink(),
    createReview: ctrl.createReview,
    totalRating: ctrl.getRating,
  };
};

const connector = connect(mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const OpenProduct = connector(PureOpenProduct);
