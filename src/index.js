import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './main.css';

var mountNode = document.getElementById('app');
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  mountNode
);
