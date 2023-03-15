import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
// import { Link, NavLink } from 'react-router-dom';
import { AppDispatch, RootState } from '../../model/store/store';
import { controller } from './controller';

const PureHome: React.FC<Props> = (props) => {
  const { getTotalUsers, getTotalProducts } = props;

  return (
    <>
      {/* <NavLink
        to="/messages"
        className={({ isActive, isPending }) =>
          isPending ? 'pending' : isActive ? 'active' : ''
        }
      >
        Messages
      </NavLink> */}
      <button
        onClick={() => getTotalUsers()}
        style={{'margin':' 30px 0'}}
      >
        button getTotalUsers
      </button>
      <button
        onClick={() => getTotalProducts()}
      >
        button getTotalProducts
      </button>
      {/* <Link to={getTotalProducts('235')} >button getTotalProducts</Link> */}
    </>
  );
};

const mapState = (state: RootState) => ({
  users: state.usersReducer.users,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    getTotalUsers: ctrl.getAllUsers,
    getTotalProducts: ctrl.getAllProducts,
  };
};

const connector = connect(mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const Home = connector(PureHome);
