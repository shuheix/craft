import ReactDOM from 'react-dom';
import './index.css';
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import Lists from 'components/list/Lists';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Lists />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
