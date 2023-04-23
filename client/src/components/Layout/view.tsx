import style from './style.module.scss';

interface ILayoutProps {
  children?: React.ReactNode;
  topBar: React.ReactNode;
  bottomBar: React.ReactNode;
  breadcrumbs?: React.ReactNode;
}

export const Layout = (props: ILayoutProps) => {
  const { topBar, bottomBar, breadcrumbs, children } = props;

  return (
    <div className={style.layout}>
      {topBar && <header className={style.layoutTop}>{topBar}</header>}
      <main className={style.layoutCenter}>
        {breadcrumbs && <div className={style.breadcrumbs}>{breadcrumbs}</div>}
        <div className={style.layoutContent}>
          {children}
        </div>
      </main>
      {bottomBar && <footer className={style.layoutBottom}>{bottomBar}</footer>}
    </div>
  );
};
