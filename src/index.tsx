import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.min.css';
import App from './App';
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap';

import Repository from './repository';

declare global {
    type Guid = string;

    interface Window {
        repository: Repository;
    }
}

(() => {
  const rootElement: HTMLElement | null = document.getElementById('root');

  window.repository = new Repository('./data/');

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>, rootElement
  );
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
