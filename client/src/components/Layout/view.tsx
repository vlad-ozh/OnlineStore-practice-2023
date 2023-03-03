import style from './style.module.scss';

interface ILayoutProps {
  children?: React.ReactNode;
  topBar?: React.ReactNode;
  bottomBar?: React.ReactNode;
}

export const Layout = (props: ILayoutProps) => {
  const { topBar, bottomBar, children } = props;
  return (
    <div className={style.layout}>
      {topBar && <div className={style.layoutTop}>{topBar}</div>}
      <div className={style.layoutCenter}>
        <div className={style.layoutContent}>
          {children}
        </div>
      </div>
      {bottomBar && <div className={style.layoutBottom}>{bottomBar}</div>}
    </div>
  );
};
