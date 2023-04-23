import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Header, Layout, Footer, Breadcrumbs } from '../../components';
import { AppDispatch, RootState } from '../../model/store/store';
import { controller } from './controller';

import style from './style.module.scss';

const PureHome: React.FC<Props> = (props) => {
  const {
    getBreadcrumbsPaths,
  } = props;

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={getBreadcrumbsPaths}/>}
    >
      <div className={style.text}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore omnis eligendi obcaecati nesciunt ex laborum magnam doloremque consectetur, tenetur corrupti voluptatem, aspernatur quidem ullam repellendus? Magnam exercitationem quis quam ipsam.
        Ipsum pariatur hic dignissimos eos, perspiciatis distinctio nesciunt deserunt aliquid possimus repellat excepturi placeat accusantium animi quia similique, quae veritatis cumque id deleniti enim. Culpa blanditiis commodi officia magni modi?
        Perferendis quasi corrupti eligendi est earum deleniti nemo debitis laborum inventore perspiciatis esse sit ad nisi, cupiditate molestiae placeat ratione non, minima a eveniet ducimus doloremque. Voluptas pariatur adipisci quis?
        Quibusdam tenetur culpa dignissimos, officiis omnis repellat rerum fuga qui. Modi nulla ipsa necessitatibus beatae alias, exercitationem odio! Doloribus iste sed sapiente cum, in nihil! Exercitationem recusandae molestiae nam quisquam!
        Pariatur aspernatur veritatis, facilis excepturi eius atque. Iusto incidunt tenetur reiciendis quam dolor voluptatibus nihil autem ex eligendi, dolores odio? Dolores similique odio iusto ad aut enim aliquam, sit beatae.
      </div>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    getBreadcrumbsPaths: ctrl.getBreadcrumbsPaths(),
  };
};

const connector = connect(mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const Home = connector(PureHome);
