import React from 'react';
import axios from 'axios';
import './App.css';

function App() {

  return (
    <div className="App">
      <button
        onClick={async () =>
          await axios
            .get('http://localhost:3100/createCollection')
            .then((res) => console.log(res))
            .catch(err => console.log('err...',err))}
      >
        createCollection
      </button>
      <button
        onClick={async () =>
          await axios
            .get('http://localhost:3100/addData')
            .then((res) => console.log(res))
            .catch(err => console.log('err...',err))}
      >
        button request
      </button>
      <button
        onClick={async () =>
          await axios
            .get('http://localhost:3100/findData')
            .then((res) => console.log(res.data))
            .catch(err => console.log('err...',err))}
      >
        button request2
      </button>
    </div>
  );
}

export default App;
