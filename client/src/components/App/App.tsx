import React from 'react';
import axios from 'axios';
import style from './style.module.scss';

export const App = () => {
  return (
    <div className={style.app}>
      <button
        onClick={async () =>
          await axios
            .get('http://localhost:3100/users/add')
            .then((res) => console.log(res))
            .catch(err => console.log('err...', err))}
      >
        button add
      </button>
      <button
        onClick={async () =>
          await axios
            .get('http://localhost:3100/users/find')
            .then((res) => console.log(res.data))
            .catch(err => console.log('err...', err))}
      >
        button find data
      </button>
    </div>
  );
};

