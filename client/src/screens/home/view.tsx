import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppDispatch, RootState } from '../../model/store/store';
import { controller } from './controller';

const PureHome: React.FC<Props> = (props) => {
  const { getTotalUsers } = props;

  return (
    <>
      <button
        onClick={() => getTotalUsers()}
      >
        button add
      </button>
    </>
  );
};

const mapState = (state: RootState) => ({
  users: state.userReducer.users,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    getTotalUsers: ctrl.getAllUsers,
  };
};

const connector = connect(mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const Home = connector(PureHome);
